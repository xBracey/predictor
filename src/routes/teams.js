import { Router } from "express";
import models, { sequelize } from "../models";

const router = Router();

const createTeam = async ({ name, groupNumber }) => {
  return await models.Team.create({ name, groupNumber });
};

const getAllTeams = async () => {
  return await models.Team.findAll();
};

const getTeam = async name => {
  return await models.Team.findOne({
    where: {
      name
    }
  });
};

const updateTeam = async (name, groupNumber) => {
  return await models.Team.update(
    { name, groupNumber },
    {
      where: {
        name
      }
    }
  );
};

const deleteTeam = async name => {
  return await models.Team.destroy({
    where: {
      name
    }
  });
};

router.get("/", function(req, res) {
  if (req.user) {
    getAllTeams().then(teams => {
      return res.json(teams);
    });
  } else {
    return res.status(401).send("Unauthorised");
  }
});

router.get("/:name", function(req, res) {
  if (req.user && req.params.name) {
    getTeam(req.params.name).then(team => {
      return res.json(team);
    });
  } else if (!req.params.name) {
    return res.status(400).send("Wrong Data");
  } else {
    return res.status(401).send("Unauthorised");
  }
});

router.post("/", function(req, res) {
  if (req.user && req.user.admin && req.body.name && req.body.groupNumber) {
    createTeam(req.body.name, req.body.groupNumber).then(team => {
      return res.json(team);
    });
  } else if (!req.body.name || !req.body.groupNumber) {
    return res.status(400).send("Wrong Data");
  } else {
    return res.status(401).send("Unauthorised");
  }
});

router.put("/", function(req, res) {
  if (req.user && req.user.admin && req.body.name && req.body.groupNumber) {
    updateTeam(req.body.name, req.body.groupNumber).then(team => {
      return res.json(team);
    });
  } else if (!req.body.name || !req.body.teamName) {
    return res.status(400).send("Wrong Data");
  } else {
    return res.status(401).send("Unauthorised");
  }
});

router.delete("/:name", function(req, res) {
  if (req.user && req.user.admin && req.params.name) {
    deleteTeam(req.params.name).then(team => {
      return res.json(team);
    });
  } else if (!req.body.name) {
    return res.status(400).send("Wrong Data");
  } else {
    return res.status(401).send("Unauthorised");
  }
});

export default router;
