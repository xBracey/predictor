import { Router } from "express";
import models, { sequelize } from "../models";

const router = Router();

const addPredictions = async predictions => {
  return await models.Group_Prediction.bulkCreate(predictions, {
    updateOnDuplicate: ["homeGoals", "awayGoals"]
  });
};

router.post("/group", function(req, res) {
  const { predictions } = req.body;

  if (req.user && predictions) {
    addPredictions(predictions).then(returnedPredictions => {
      return res.json(returnedPredictions);
    });
  } else if (!predictions) {
    return res.status(400).json({ error: "Wrong Data" });
  } else {
    return res.status(401).json({ error: "Unauthorised" });
  }
});

export default router;
