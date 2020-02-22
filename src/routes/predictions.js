import { Router } from "express";
import models, { sequelize } from "../models";

const router = Router();

// Helper Functions

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

// Routes

// GET /predictions/group
router.get("/group", async (req, res) => {
  const returnedPredictions = await getGroupPredictions(req.user);

  return res.json(returnedPredictions);
});

// POST /predictions/group
router.post("/group", async (req, res) => {
  const { predictions } = req.body;

  if (predictions) {
    predictions.forEach(prediction => (prediction.userUsername = req.user));

    const returnedPredictions = await models.Group_Prediction.bulkCreate(
      predictions,
      {
        updateOnDuplicate: ["homeGoals", "awayGoals"]
      }
    );

    return res.json(returnedPredictions);
  } else if (!predictions) {
    return res.status(400).json({ error: "Wrong Data" });
  }
});

export default router;
