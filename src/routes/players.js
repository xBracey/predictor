import { Router } from "express";
import models, { sequelize } from "../models";

const router = Router();

const createPlayer = async (name, teamName) => {
  return await models.Player.create({ name, teamName });
};

const getAllPlayers = async () => {
  return await models.Player.findAll();
};

const getPlayer = async name => {
  return await models.Player.findOne({
    where: {
      name
    }
  });
};

const updatePlayer = async (name, teamName) => {
  return await models.Player.update(
    { name, teamName },
    {
      where: {
        name
      }
    }
  );
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
    return res.status(401).json({ error: "Unauthorised" });
  }
});

router.get("/:name", function(req, res) {
  if (req.user && req.params.name) {
    getPlayer(req.params.name).then(player => {
      return res.json(player);
    });
  } else if (!req.params.name) {
    return res.status(400).json({ error: "Wrong Data" });
  } else {
    return res.status(401).json({ error: "Unauthorised" });
  }
});

router.post("/", function(req, res) {
  if (req.user && req.user.admin && req.body.name && req.body.teamName) {
    createPlayer(req.body.name, req.body.teamName).then(player => {
      return res.json(player);
    });
  } else if (!req.body.name || !req.body.teamName) {
    return res.status(400).json({ error: "Wrong Data" });
  } else {
    return res.status(401).json({ error: "Unauthorised" });
  }
});

router.put("/", function(req, res) {
  if (req.user && req.user.admin && req.body.name && req.body.teamName) {
    updatePlayer(req.body.name, req.body.teamName).then(player => {
      return res.json(player);
    });
  } else if (!req.body.name || !req.body.teamName) {
    return res.status(400).json({ error: "Wrong Data" });
  } else {
    return res.status(401).json({ error: "Unauthorised" });
  }
});

router.delete("/:name", function(req, res) {
  if (req.user && req.user.admin && req.params.name) {
    deletePlayer(req.params.name).then(player => {
      return res.json(player);
    });
  } else if (!req.params.name) {
    return res.status(400).json({ error: "Wrong Data" });
  } else {
    return res.status(401).json({ error: "Unauthorised" });
  }
});

export default router;
