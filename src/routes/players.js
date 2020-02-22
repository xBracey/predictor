import { Router } from "express";
import models, { sequelize } from "../models";
import { checkAdmin } from "./user";

const router = Router();

// Routes

// GET /players
router.get("/", async (req, res) => {
  const players = await models.Player.findAll();
  return res.json(players);
});

// GET /players/:name
router.get("/:name", async (req, res) => {
  const { name } = req.params;
  if (name) {
    const player = await models.Player.findOne({
      where: {
        name
      }
    });

    return res.json(player);
  } else if (!name) {
    return res.status(400).json({ error: "Wrong Data" });
  }
});

// POST /players
router.post("/", async (req, res) => {
  const admin = await checkAdmin(req.user);
  const { name, teamName } = req.body;

  if (admin && name && teamName) {
    const team = await models.Team.findOne({
      where: {
        name: teamName
      }
    });

    if (!team) {
      return res.status(400).json({ error: "Team does not exist" });
    }

    const player = await models.Player.create({ name, teamName });
    return res.json(player);
  } else if (!name || !teamName) {
    return res.status(400).json({ error: "Wrong Data" });
  } else {
    return res.status(401).json({ error: "Unauthorised" });
  }
});

// PUT /players
router.put("/", async (req, res) => {
  const admin = await checkAdmin(req.user);
  const { id, name, teamName } = req.body;

  if (admin && id !== null && name && teamName) {
    const team = await models.Team.findOne({
      where: {
        name: teamName
      }
    });

    if (!team) {
      return res.status(400).json({ error: "Team does not exist" });
    }

    const player = await models.Player.update(
      { name, teamName },
      {
        where: {
          id
        }
      }
    );

    return res.json(player);
  } else if (!name || !teamName || id === null) {
    return res.status(400).json({ error: "Wrong Data" });
  } else {
    return res.status(401).json({ error: "Unauthorised" });
  }
});

// DELETE /players
router.delete("/:id", async (req, res) => {
  const admin = await checkAdmin(req.user);
  const { id } = req.params;

  if (admin && id !== null) {
    const player = await models.Player.destroy({
      where: {
        id
      }
    });

    return res.json(player);
  } else if (id === null) {
    return res.status(400).json({ error: "Wrong Data" });
  } else {
    return res.status(401).json({ error: "Unauthorised" });
  }
});

export default router;
