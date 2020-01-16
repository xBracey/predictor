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

export default router;
