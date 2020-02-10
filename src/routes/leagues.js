import { Router } from "express";
import models, { sequelize } from "../models";

const router = Router();

const addLeague = async (username, leagueName, displayName, password) => {
  const leagueCheck = await models.League.findAll({
    where: { leagueName }
  });

  if (leagueCheck.length) {
    return false;
  }

  const newLeague = await models.League.create({
    leagueName,
    displayName,
    password
  });

  await models.User_League.create({
    userUsername: username,
    leagueLeagueName: leagueName,
    admin: true
  });

  return newLeague;
};

const addExistingLeague = async (username, leagueName, password) => {
  const leagueUserCheck = await models.User_League.findAll({
    where: { userUsername: username, leagueLeagueName: leagueName }
  });

  const leagueCheck = await models.League.findAll({
    where: { leagueName, password }
  });

  if (leagueUserCheck.length) {
    return { error: "User already is a part of this league!" };
  }

  if (!leagueCheck.length) {
    return { error: "League name or password is incorrect" };
  }

  const newLeague = await models.League.findOne({
    where: {
      leagueName,
      password
    }
  });

  await models.User_League.create({
    userUsername: username,
    leagueLeagueName: leagueName
  });

  return { newLeague, error: null };
};

const addRuleToLeague = async (ruleId, leagueLeagueName, points) => {
  const leagueCheck = await models.League.findAll({
    where: { leagueName: leagueLeagueName }
  });

  const ruleCheck = await models.Rule.findAll({
    where: { id: ruleId }
  });

  const leagueRuleCheck = await models.League_Rule.findAll({
    where: { ruleId, leagueLeagueName }
  });

  if (!leagueCheck.length || !ruleCheck.length) {
    return false;
  }

  if (leagueRuleCheck.length) {
    return await models.League_Rule.update(
      {
        points
      },
      {
        where: {
          ruleId,
          leagueLeagueName
        }
      }
    );
  }

  return await models.League_Rule.create({
    ruleId,
    leagueLeagueName,
    points
  });
};

const getLeagueUsersRules = async leagueName => {
  return await models.League.findOne({
    where: {
      leagueName
    },
    include: [{ model: models.User }, { model: models.Rule }]
  });
};

const getUserPredictions = async username => {
  return await models.User.findOne({
    where: {
      username
    },
    include: [{ model: models.Group_Match }]
  });
};

router.post("/create", function(req, res) {
  if (
    req.user &&
    req.body.leagueName &&
    req.body.displayName &&
    req.body.password
  ) {
    addLeague(
      req.user.username,
      req.body.leagueName,
      req.body.displayName,
      req.body.password
    ).then(league => {
      return league
        ? res.json(league)
        : res.status(400).send("League already exists!");
    });
  } else if (
    !req.body.leagueName ||
    !req.body.displayName ||
    !req.body.password
  ) {
    return res.status(400).json({ error: "Wrong Data" });
  } else {
    return res.status(401).json({ error: "Unauthorised" });
  }
});

router.post("/add", function(req, res) {
  if (req.user && req.body.leagueName && req.body.password) {
    addExistingLeague(
      req.user.username,
      req.body.leagueName,
      req.body.password
    ).then(({ newLeague, error }) => {
      return newLeague ? res.json(newLeague) : res.status(400).send({ error });
    });
  } else if (!req.body.leagueName || !req.body.password) {
    return res.status(400).json({ error: "Wrong Data" });
  } else {
    return res.status(401).json({ error: "Unauthorised" });
  }
});

router.post("/add/rule", function(req, res) {
  const { ruleId, leagueName, points } = req.body;

  if (req.user && ruleId && leagueName && points) {
    addRuleToLeague(ruleId, leagueName, points).then(league => {
      return league
        ? res.json(league)
        : res.status(400).send({ error: "Rule or League does not exist" });
    });
  } else if (!leagueName || !ruleId || !points) {
    return res.status(400).json({ error: "Wrong Data" });
  } else {
    return res.status(401).json({ error: "Unauthorised" });
  }
});

const calculateGroupMatchScores = (
  leagueRulesGroupMatch,
  predictions,
  points
) => {
  let resultHomeGoals = 0;
  let resultAwayGoals = 0;
  let predictionHomeGoals = 0;
  let predictionAwayGoals = 0;

  predictions.forEach(prediction => {
    resultHomeGoals = prediction.homeGoals;
    resultAwayGoals = prediction.awayGoals;
    predictionHomeGoals = prediction.group_prediction.homeGoals;
    predictionAwayGoals = prediction.group_prediction.awayGoals;

    if (
      resultHomeGoals === predictionHomeGoals &&
      resultAwayGoals === predictionAwayGoals
    ) {
      points = points + leagueRulesGroupMatch[0].league_rule.points;
    } else if (
      resultHomeGoals - resultAwayGoals ===
      predictionHomeGoals - predictionAwayGoals
    ) {
      points = points + leagueRulesGroupMatch[1].league_rule.points;
    } else if (
      (resultHomeGoals > resultAwayGoals &&
        predictionHomeGoals > predictionAwayGoals) ||
      (resultHomeGoals < resultAwayGoals &&
        predictionHomeGoals < predictionAwayGoals)
    ) {
      points = points + leagueRulesGroupMatch[2].league_rule.points;
    }
  });
  return points;
};

const getLeagueStandings = async (req, leagueName) => {
  const leagueCheck = await models.League.findAll({
    where: { leagueName }
  });

  if (!leagueCheck.length) {
    return { status: 401, error: "League does not exist" };
  }

  if (req.user && leagueName) {
    const leaguesArray = await getLeagueUsersRules(leagueName);
    const userLeagues = JSON.parse(JSON.stringify(leaguesArray));
    const usernames = userLeagues.users.map(user => user.username);

    if (!usernames.includes(req.user.username)) {
      return { status: 401, error: "Unauthorised" };
    }

    const leagueRulesGroupMatch = leaguesArray.rules.filter(
      rule => rule.isScore
    );

    let userPredictions = [];
    let points = 0;
    let username = null;

    let usernamePoints = [];

    for (let index = 0; index < usernames.length; index++) {
      username = usernames[index];
      points = 0;
      userPredictions = await getUserPredictions(username);

      points = calculateGroupMatchScores(
        leagueRulesGroupMatch,
        userPredictions.group_matches,
        points
      );

      usernamePoints.push({
        username,
        points,
        isUser: req.user.username === username
      });
    }

    usernamePoints = usernamePoints.sort((a, b) => b.points - a.points);

    return { status: 200, usernamePoints };
  } else {
    return { status: 401, error: "Unauthorised" };
  }
};

router.get("/standings/:leagueName", async function(req, res) {
  const { leagueName } = req.params;

  const leagueStandings = await getLeagueStandings(req, leagueName);

  return res
    .status(leagueStandings.status)
    .json(leagueStandings.usernamePoints);
});

const getLeagueInfo = async (req, leagueName) => {
  let league = await models.League.findOne({
    where: { leagueName },
    include: [{ model: models.User }]
  });

  if (!league) {
    return {
      status: 401,
      error: "League does not exist"
    };
  }

  let userIsAdmin = false;

  league = JSON.parse(JSON.stringify(league));

  league.users.forEach(user => {
    if (user.user_league.admin && user.username === req.user.username) {
      userIsAdmin = true;
    }
  });

  return {
    status: 200,
    leagueName: league.leagueName,
    displayName: league.displayName,
    userIsAdmin
  };
};

router.get("/info/:leagueName", async function(req, res) {
  const { leagueName } = req.params;

  const leagueInfo = await getLeagueInfo(req, leagueName);

  return res.status(leagueInfo.status).json(leagueInfo);
});

const getLeagues = async username => {
  return await models.User.findOne({
    where: {
      username
    },
    include: [{ model: models.League }]
  });
};

router.get("/", async function(req, res) {
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorised" });
  }

  const userLeagues = await getLeagues(req.user.username);
  const leagues = JSON.parse(JSON.stringify(userLeagues.leagues));
  const leaguesInfoStandings = [];
  let leagueInfoStanding = {};
  let league = {};
  let standings = [];

  for (let index = 0; index < leagues.length; index++) {
    league = leagues[index];

    standings = await getLeagueStandings(req, league.leagueName);
    leagueInfoStanding.standings = standings.usernamePoints;

    leagueInfoStanding.info = await getLeagueInfo(req, league.leagueName);
    leaguesInfoStandings.push({ ...leagueInfoStanding });
    leagueInfoStanding = {};
  }

  return res.json(leaguesInfoStandings);
});

export default router;
