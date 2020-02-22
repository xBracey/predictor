import models, { sequelize } from "../src/models";

export const defaultRules = [
  {
    ruleId: 1,
    points: 40
  },
  {
    ruleId: 2,
    points: 20
  },
  {
    ruleId: 3,
    points: 10
  }
];

export const calculateGroupMatchScores = (
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

export const getLeagueStandings = async (req, leagueName) => {
  const leagueCheck = await models.League.findAll({
    where: { leagueName }
  });

  if (!leagueCheck.length) {
    return { status: 401, error: "League does not exist" };
  }

  if (!leagueName) {
    return { status: 401, error: "Wrong Data" };
  }

  const leaguesArray = await models.League.findOne({
    where: {
      leagueName
    },
    include: [{ model: models.User }, { model: models.Rule }]
  });

  const userLeagues = JSON.parse(JSON.stringify(leaguesArray));
  const usernames = userLeagues.users.map(user => user.username);

  if (!usernames.includes(req.user)) {
    return { status: 401, error: "Unauthorised" };
  }

  const leagueRulesGroupMatch = leaguesArray.rules.filter(rule => rule.isScore);

  let userPredictions = [];
  let points = 0;
  let username = null;

  let usernamePoints = [];

  for (let index = 0; index < usernames.length; index++) {
    username = usernames[index];
    points = 0;
    userPredictions = await models.User.findOne({
      where: {
        username
      },
      include: [{ model: models.Group_Match }]
    });

    points = calculateGroupMatchScores(
      leagueRulesGroupMatch,
      userPredictions.group_matches,
      points
    );

    usernamePoints.push({
      username,
      points,
      isUser: req.user === username
    });
  }

  usernamePoints = usernamePoints.sort((a, b) => b.points - a.points);

  return { status: 200, usernamePoints };
};

export const getLeagueInfo = async (req, leagueName) => {
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

  const usernames = league.users.map(user => user.username);

  if (!usernames.includes(req.user)) {
    return { status: 401, error: "Unauthorised" };
  }

  let userIsAdmin = false;

  league = JSON.parse(JSON.stringify(league));

  league.users.forEach(user => {
    if (user.user_league.admin && user.username === req.user) {
      userIsAdmin = true;
    }
  });

  return {
    status: 200,
    info: {
      leagueName: league.leagueName,
      displayName: league.displayName,
      userIsAdmin
    }
  };
};
