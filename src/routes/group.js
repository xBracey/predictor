import { Router } from "express";
import models, { sequelize } from "../models";

const router = Router();

const createGroup = async number => {
  return await models.Group.create({ number });
};

const getAllGroups = async () => {
  return await models.Group.findAll();
};

const deleteGroup = async number => {
  return await models.Group.destroy({
    where: {
      number
    }
  });
};

const getGroupMatches = async number => {
  const matches = await models.Group_Match.findAll({
    where: { groupNumber: number }
  });
  return JSON.parse(JSON.stringify(matches));
};

const getGroupTeams = async number => {
  const teams = await models.Team.findAll({ where: { groupNumber: number } });
  return JSON.parse(JSON.stringify(teams));
};

router.get("/", function(req, res) {
  if (req.user) {
    getAllGroups().then(groups => {
      return res.json(groups);
    });
  } else {
    return res.status(401).json({ error: "Unauthorised" });
  }
});

router.post("/", function(req, res) {
  if (req.user && req.user.admin && req.body.number) {
    createGroup(req.body.number).then(group => {
      return res.json(group);
    });
  } else if (!req.body.number) {
    return res.status(400).json({ error: "Wrong Data" });
  } else {
    return res.status(401).json({ error: "Unauthorised" });
  }
});

router.delete("/:number", function(req, res) {
  if (req.user && req.user.admin && req.params.number) {
    deleteGroup(req.params.number).then(group => {
      return res.json(group);
    });
  } else if (!req.body.number) {
    return res.status(400).json({ error: "Wrong Data" });
  } else {
    return res.status(401).json({ error: "Unauthorised" });
  }
});

export default router;
