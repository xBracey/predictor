import { Router } from "express";
import models, { sequelize } from "../models";

const router = Router();

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

router.get("/group", function(req, res) {
  if (req.user) {
    getAllMatches(models.Group_Match).then(matches => {
      return res.json(matches);
    });
  } else {
    return res.status(401).json({ error: "Unauthorised" });
  }
});

router.get("/knockout", function(req, res) {
  if (req.user) {
    getAllMatches(models.Knockout_Match).then(matches => {
      return res.json(matches);
    });
  } else {
    return res.status(401).json({ error: "Unauthorised" });
  }
});

router.get("/group/:id", function(req, res) {
  if (req.user && req.params.id) {
    getMatch(models.Group_Match, req.params.id).then(match => {
      return res.json(match);
    });
  } else if (!req.params.id) {
    return res.status(400).json({ error: "Wrong Data" });
  } else {
    return res.status(401).json({ error: "Unauthorised" });
  }
});

router.get("/knockout/:id", function(req, res) {
  if (req.user && req.params.id) {
    getMatch(models.Knockout_Match, req.params.id).then(match => {
      return res.json(match);
    });
  } else if (!req.params.id) {
    return res.status(400).json({ error: "Wrong Data" });
  } else {
    return res.status(401).json({ error: "Unauthorised" });
  }
});

router.post("/group", function(req, res) {
  const {
    homeGoals,
    awayGoals,
    date,
    groupNumber,
    homeTeamName,
    awayTeamName
  } = req.body;

  if (
    req.user &&
    req.user.admin &&
    date &&
    groupNumber &&
    homeTeamName &&
    awayTeamName
  ) {
    createMatch(
      models.Group_Match,
      homeGoals,
      awayGoals,
      date,
      groupNumber,
      homeTeamName,
      awayTeamName
    ).then(match => {
      return res.json(match);
    });
  } else if (!date || !groupNumber || !homeTeamName || !awayTeamName) {
    return res.status(400).json({ error: "Wrong Data" });
  } else {
    return res.status(401).json({ error: "Unauthorised" });
  }
});

router.post("/knockout", function(req, res) {
  const {
    homeGoals,
    awayGoals,
    date,
    homeTeamName,
    awayTeamName,
    homeWin
  } = req.body;

  if (req.user && req.user.admin && date && homeTeamName && awayTeamName) {
    createMatch(
      models.Knockout_Match,
      homeGoals,
      awayGoals,
      homeWin,
      date,
      homeTeamName,
      awayTeamName
    ).then(match => {
      return res.json(match);
    });
  } else if (!date || !homeTeamName || !awayTeamName) {
    return res.status(400).json({ error: "Wrong Data" });
  } else {
    return res.status(401).json({ error: "Unauthorised" });
  }
});

router.put("/group", function(req, res) {
  const {
    id,
    homeGoals,
    awayGoals,
    date,
    groupNumber,
    homeTeamName,
    awayTeamName
  } = req.body;

  if (
    req.user &&
    req.user.admin &&
    id !== null &&
    date &&
    groupNumber &&
    homeTeamName &&
    awayTeamName
  ) {
    updateMatch(
      models.Group_Match,
      id,
      homeGoals,
      awayGoals,
      date,
      groupNumber,
      homeTeamName,
      awayTeamName
    ).then(match => {
      return res.json(match);
    });
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

router.put("/knockout", function(req, res) {
  const {
    id,
    homeGoals,
    awayGoals,
    date,
    groupNumber,
    homeTeamName,
    awayTeamName
  } = req.body;

  if (
    req.user &&
    req.user.admin &&
    id !== null &&
    date &&
    groupNumber &&
    homeTeamName &&
    awayTeamName
  ) {
    updateMatch(
      models.Knockout_Match,
      id,
      homeGoals,
      awayGoals,
      date,
      groupNumber,
      homeTeamName,
      awayTeamName
    ).then(match => {
      return res.json(match);
    });
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

router.delete("/group/:id", function(req, res) {
  if (req.user && req.user.admin && req.params.id) {
    deleteMatch(models.Group_Match, req.params.id).then(match => {
      return res.json(match);
    });
  } else if (!req.params.id) {
    return res.status(400).json({ error: "Wrong Data" });
  } else {
    return res.status(401).json({ error: "Unauthorised" });
  }
});

router.delete("/knockout/:id", function(req, res) {
  if (req.user && req.user.admin && req.params.id) {
    deleteMatch(models.Knockout_Match, req.params.id).then(match => {
      return res.json(match);
    });
  } else if (!req.params.id) {
    return res.status(400).json({ error: "Wrong Data" });
  } else {
    return res.status(401).json({ error: "Unauthorised" });
  }
});

export default router;
