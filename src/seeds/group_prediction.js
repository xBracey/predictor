import models, { sequelize } from "../models";

const group_predictions = async () => {
  const matchArray = await models.Group_Match.findAll();

  const matches = JSON.parse(JSON.stringify(matchArray));
  const group_predictions_array = [];

  for (let i = 0; i < matches.length; i++) {
    group_predictions_array.push({
      groupMatchId: matches[i].id,
      userUsername: "xBracey",
      homeGoals: Math.floor(Math.random() * 4),
      awayGoals: Math.floor(Math.random() * 4)
    });
  }

  return models.Group_Prediction.bulkCreate(group_predictions_array);
};

export default group_predictions;
