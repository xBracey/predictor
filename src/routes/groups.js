import { Router } from "express";
import models, { sequelize } from "../models";
import { checkAdmin } from "./user";

const router = Router();

// Routes

// GET /groups
router.get("/", async (req, res) => {
  const groups = await models.Group.findAll();
  return res.json(groups);
});

// POST /groups
router.post("/", async (req, res) => {
  const { number } = req.body;
  const admin = await checkAdmin(req.user);

  if (admin && number) {
    const existingGroup = await models.Group.findOne({
      where: {
        number
      }
    });

    if (existingGroup) {
      return res.status(400).json({ error: "Group already exists" });
    }

    const group = await models.Group.create({ number });

    return res.json(group);
  } else if (!number) {
    return res.status(400).json({ error: "Wrong Data" });
  } else {
    return res.status(401).json({ error: "Unauthorised" });
  }
});

// DELETE /groups
router.delete("/:number", async (req, res) => {
  const { number } = req.params;
  const admin = await checkAdmin(req.user);

  if (admin && number) {
    const group = await models.Group.destroy({
      where: {
        number
      }
    });

    return res.json(group);
  } else if (!number) {
    return res.status(400).json({ error: "Wrong Data" });
  } else {
    return res.status(401).json({ error: "Unauthorised" });
  }
});

export default router;
