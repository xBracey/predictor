import { Router } from "express";
import models, { sequelize } from "../models";

const router = Router();

const addLeague = async (username, leagueName, displayName, password) => {
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
      return res.json(league);
    });
  } else if (
    !req.body.leagueName ||
    !req.body.displayName ||
    !req.body.password
  ) {
    return res.status(400).send("Wrong Data");
  } else {
    return res.status(401).send("Unauthorised");
  }
});

router.post("/add", function(req, res) {
  if (req.user && req.body.leagueName && req.body.password) {
    addExistingLeague(
      req.user.username,
      req.body.leagueName,
      req.body.password
    ).then(league => {
      return res.json(league);
    });
  } else if (!req.body.leagueName || !req.body.password) {
    return res.status(400).send("Wrong Data");
  } else {
    return res.status(401).send("Unauthorised");
  }
});

export default router;
