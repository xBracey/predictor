import { Router } from "express";
import models, { sequelize } from "../models";
import { checkAdmin } from "./user";

const router = Router();

// Routes

// GET /teams
router.get("/", async (req, res) => {
  const teams = await models.Team.findAll();
  return res.json(teams);
});

// GET /teams/:name
router.get("/:name", async (req, res) => {
  const { name } = req.params;

  if (name) {
    const team = await models.Team.findOne({
      where: {
        name
      }
    });
    return res.json(team);
  } else if (!name) {
    return res.status(400).json({ error: "Wrong Data" });
  }
});

// POST /teams
router.post("/", async (req, res) => {
  const { name, groupNumber } = req.body;
  const admin = await checkAdmin(req.user);

  if (admin && name && groupNumber) {
    const team = await models.Team.findOne({
      where: {
        name
      }
    });

    if (team) {
      return res.status(400).json({ error: "Team already exists" });
    }

    const newTeam = await models.Team.create({ name, groupNumber });
    return res.json(newTeam);
  } else if (!name || !groupNumber) {
    return res.status(400).json({ error: "Wrong Data" });
  } else {
    return res.status(401).json({ error: "Unauthorised" });
  }
});

// PUT /teams
router.put("/", async (req, res) => {
  const { name, groupNumber } = req.body;
  const admin = await checkAdmin(req.user);

  if (admin && name && groupNumber) {
    const team = await models.Team.findOne({
      where: {
        name
      }
    });

    if (!team) {
      return res.status(400).json({ error: "Team does not exist" });
    }

    const newTeam = await models.Team.update(
      { name, groupNumber },
      {
        where: {
          name
        }
      }
    );
    return res.json(newTeam);
  } else if (!name || !groupNumber) {
    return res.status(400).json({ error: "Wrong Data" });
  } else {
    return res.status(401).json({ error: "Unauthorised" });
  }
});

// DELETE /teams
router.delete("/:name", async (req, res) => {
  const { name } = req.params;
  const admin = await checkAdmin(req.user);

  if (admin && name) {
    const team = await models.Team.findOne({
      where: {
        name
      }
    });

    if (!team) {
      return res.status(400).json({ error: "Team does not exist" });
    }

    const deletedTeam = await models.Team.destroy({
      where: {
        name
      }
    });
    return res.json(deletedTeam);
  } else if (!name) {
    return res.status(400).json({ error: "Wrong Data" });
  } else {
    return res.status(401).json({ error: "Unauthorised" });
  }
});

export default router;
