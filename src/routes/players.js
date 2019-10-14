import { Router } from "express";
import models, { sequelize } from "../models";

const router = Router();

const createPlayer = async ({ name, teamName }) => {
  return await models.Player.create({ name, teamName });
};

const getAllPlayers = async () => {
  return await models.Player.findAll();
};

const deletePlayer = async name => {
  return await models.Player.destroy({
    where: {
      name
    }
  });
};

router.get("/", function(req, res) {
  if (req.user) {
    getAllPlayers().then(players => {
      return res.json(players);
    });
  } else {
    return res.status(401).send("Unauthorised");
  }
});

router.post("/", function(req, res) {
  if (req.user && req.user.admin && req.body.name && req.body.teamName) {
    createPlayer(req.body.name, req.body.teamName).then(player => {
      return res.json(player);
    });
  } else if (!req.body.name || !req.body.teamName) {
    return res.status(400).send("Wrong Data");
  } else {
    return res.status(401).send("Unauthorised");
  }
});

router.delete("/:name", function(req, res) {
  if (req.user && req.user.admin && req.params.name) {
    deletePlayer(req.params.name).then(player => {
      return res.json(player);
    });
  } else if (!req.body.name) {
    return res.status(400).send("Wrong Data");
  } else {
    return res.status(401).send("Unauthorised");
  }
});

export default router;
