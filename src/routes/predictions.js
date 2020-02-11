import { Router } from "express";
import models, { sequelize } from "../models";

const router = Router();

const addPredictions = async (predictions, username) => {
  predictions.forEach(prediction => (prediction.userUsername = username));

  return await models.Group_Prediction.bulkCreate(predictions, {
    updateOnDuplicate: ["homeGoals", "awayGoals"]
  });
};

const getGroupPredictions = async username => {
  const user = await models.User.findOne({
    where: {
      username
    },
    include: [{ model: models.Group_Match }]
  });

  const predictions = [];

  user.group_matches.forEach(match => {
    const prediction = {
      ...JSON.parse(JSON.stringify(match.group_prediction)),
      groupNumber: match.groupNumber,
      homeTeamName: match.homeTeamName,
      awayTeamName: match.awayTeamName,
      id: match.id
    };
    predictions.push(prediction);
  });

  return predictions;
};

router.get("/group", function(req, res) {
  if (req.user) {
    getGroupPredictions(req.user.username).then(returnedPredictions => {
      return res.json(returnedPredictions);
    });
  } else {
    return res.status(401).json({ error: "Unauthorised" });
  }
});

router.post("/group", function(req, res) {
  const { predictions } = req.body;

  if (req.user && predictions) {
    addPredictions(predictions, req.user.username).then(returnedPredictions => {
      return res.json(returnedPredictions);
    });
  } else if (!predictions) {
    return res.status(400).json({ error: "Wrong Data" });
  } else {
    return res.status(401).json({ error: "Unauthorised" });
  }
});

export default router;
