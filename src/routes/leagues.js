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
  const leagueCheck = await models.User_League.findAll({
    where: { userUsername: username, leagueLeagueName: leagueName }
  });

  if (leagueCheck.length) {
    return false;
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

  return newLeague;
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
    ).then(league => {
      return league
        ? res.json(league)
        : res
            .status(400)
            .send({ error: "User already is a part of this league!" });
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

router.get("/standings/:leagueName", async function(req, res) {
  const { leagueName } = req.params;

  if (req.user && leagueName) {
    const leaguesArray = await getLeagueUsersRules(leagueName);
    const userLeagues = JSON.parse(JSON.stringify(leaguesArray));
    const usernames = userLeagues.users.map(user => user.username);

    if (!usernames.includes(req.user.username)) {
      return res.status(401).json({ error: "Unauthorised" });
    }

    const leagueRulesGroupMatch = leaguesArray.rules.filter(
      rule => rule.isScore
    );

    let userPredictions = [];
    let points = 0;
    let username = null;

    const usernamePoints = {};

    for (let index = 0; index < usernames.length; index++) {
      username = usernames[index];
      points = 0;
      userPredictions = await getUserPredictions(username);

      points = calculateGroupMatchScores(
        leagueRulesGroupMatch,
        userPredictions.group_matches,
        points
      );

      usernamePoints[username] = points;
    }

    return res.json(usernamePoints);
  } else {
    return res.status(401).json({ error: "Unauthorised" });
  }
});

export default router;
