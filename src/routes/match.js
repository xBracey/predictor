import { Router } from "express";
import models, { sequelize } from "../models";
import moment from "moment";
import { checkAdmin } from "./user";

const router = Router();

// Helper Functions

const createMatch = async (
  model,
  homeGoals,
  awayGoals,
  date,
  groupNumber,
  homeTeamName,
  awayTeamName
) => {
  return await model.create({
    homeGoals,
    awayGoals,
    date,
    groupNumber,
    homeTeamName,
    awayTeamName
  });
};

const getAllMatches = async model => {
  return await model.findAll();
};

const getMatch = async (model, id) => {
  return await model.findOne({
    where: {
      id
    }
  });
};

const updateMatch = async (
  model,
  id,
  homeGoals,
  awayGoals,
  date,
  groupNumber,
  homeTeamName,
  awayTeamName
) => {
  return await model.update(
    { homeGoals, awayGoals, date, groupNumber, homeTeamName, awayTeamName },
    {
      where: {
        id
      }
    }
  );
};

const deleteMatch = async (model, id) => {
  return await model.destroy({
    where: {
      id
    }
  });
};

// GET /match/today
router.get("/today", async (req, res) => {
  const groupMatches = await getAllMatches(models.Group_Match);
  const knockoutMatches = await getAllMatches(models.Knockout_Match);
  const todayMatches = [...groupMatches, ...knockoutMatches].filter(match =>
    moment(match.date).isSame(moment(), "day")
  );
  return res.json(todayMatches);
});

// GET /match/group
router.get("/group", async (req, res) => {
  const matches = await getAllMatches(models.Group_Match);
  return res.json(matches);
});

// GET /match/knockout
router.get("/knockout", async (req, res) => {
  const matches = await getAllMatches(models.Knockout_Match);
  return res.json(matches);
});

// GET /match/group/:id
router.get("/group/:id", async (req, res) => {
  if (req.params.id) {
    const match = await getMatch(models.Group_Match, req.params.id);
    return res.json(match);
  } else if (!req.params.id) {
    return res.status(400).json({ error: "Wrong Data" });
  }
});

// GET /match/knockout/:id
router.get("/knockout/:id", async (req, res) => {
  if (req.params.id) {
    const match = await getMatch(models.Knockout_Match, req.params.id);
    return res.json(match);
  } else if (!req.params.id) {
    return res.status(400).json({ error: "Wrong Data" });
  }
});

// POST /match/group
router.post("/group", async (req, res) => {
  const {
    homeGoals,
    awayGoals,
    date,
    groupNumber,
    homeTeamName,
    awayTeamName
  } = req.body;

  const admin = await checkAdmin(req.user);

  if (admin && date && groupNumber && homeTeamName && awayTeamName) {
    const match = await createMatch(
      models.Group_Match,
      homeGoals,
      awayGoals,
      date,
      groupNumber,
      homeTeamName,
      awayTeamName
    );

    return res.json(match);
  } else if (!date || !groupNumber || !homeTeamName || !awayTeamName) {
    return res.status(400).json({ error: "Wrong Data" });
  }
});

// POST /match/knockout
router.post("/knockout", async (req, res) => {
  const {
    homeGoals,
    awayGoals,
    date,
    groupNumber,
    homeTeamName,
    awayTeamName
  } = req.body;

  const admin = await checkAdmin(req.user);

  if (admin && date && groupNumber && homeTeamName && awayTeamName) {
    const match = await createMatch(
      models.Knockout_Match,
      homeGoals,
      awayGoals,
      date,
      groupNumber,
      homeTeamName,
      awayTeamName
    );

    return res.json(match);
  } else if (!date || !groupNumber || !homeTeamName || !awayTeamName) {
    return res.status(400).json({ error: "Wrong Data" });
  }
});

// PUT /match/group
router.put("/group", async (req, res) => {
  const {
    id,
    homeGoals,
    awayGoals,
    date,
    groupNumber,
    homeTeamName,
    awayTeamName
  } = req.body;

  const admin = await checkAdmin(req.user);

  if (
    admin &&
    id !== null &&
    date &&
    groupNumber &&
    homeTeamName &&
    awayTeamName
  ) {
    const match = await updateMatch(
      models.Group_Match,
      id,
      homeGoals,
      awayGoals,
      date,
      groupNumber,
      homeTeamName,
      awayTeamName
    );
    return res.json(match);
  } else if (
    id === null ||
    !date ||
    !groupNumber ||
    !homeTeamName ||
    !awayTeamName
  ) {
    return res.status(400).json({ error: "Wrong Data" });
  } else {
    return res.status(401).json({ error: "Unauthorised" });
  }
});

// PUT /match/knockout
router.put("/knockout", async (req, res) => {
  const {
    id,
    homeGoals,
    awayGoals,
    date,
    groupNumber,
    homeTeamName,
    awayTeamName
  } = req.body;

  const admin = await checkAdmin(req.user);

  if (
    admin &&
    id !== null &&
    date &&
    groupNumber &&
    homeTeamName &&
    awayTeamName
  ) {
    const match = await updateMatch(
      models.Knockout_Match,
      id,
      homeGoals,
      awayGoals,
      date,
      groupNumber,
      homeTeamName,
      awayTeamName
    );
    return res.json(match);
  } else if (
    id === null ||
    !date ||
    !groupNumber ||
    !homeTeamName ||
    !awayTeamName
  ) {
    return res.status(400).json({ error: "Wrong Data" });
  } else {
    return res.status(401).json({ error: "Unauthorised" });
  }
});

// DELETE /match/group/:id
router.delete("/group/:id", async (req, res) => {
  const admin = await checkAdmin(req.user);

  if (admin && req.params.id !== null) {
    const match = await deleteMatch(models.Group_Match, req.params.id);
    return res.json(match);
  } else if (!req.params.id === null) {
    return res.status(400).json({ error: "Wrong Data" });
  } else {
    return res.status(401).json({ error: "Unauthorised" });
  }
});

// DELETE /match/knockout/:id
router.delete("/knockout/:id", async (req, res) => {
  const admin = await checkAdmin(req.user);

  if (admin && req.params.id !== null) {
    const match = await deleteMatch(models.Knockout_Match, req.params.id);
    return res.json(match);
  } else if (!req.params.id === null) {
    return res.status(400).json({ error: "Wrong Data" });
  } else {
    return res.status(401).json({ error: "Unauthorised" });
  }
});

export default router;
