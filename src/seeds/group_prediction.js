import models, { sequelize } from "../models";

export const createPredictions = async userUsername => {
  const matchArray = await models.Group_Match.findAll();

  const matches = JSON.parse(JSON.stringify(matchArray));
  const group_predictions_array = [];

  for (let i = 0; i < matches.length; i++) {
    group_predictions_array.push({
      groupMatchId: matches[i].id,
      userUsername,
      homeGoals: Math.floor(Math.random() * 5),
      awayGoals: Math.floor(Math.random() * 5)
    });
  }

  return models.Group_Prediction.bulkCreate(group_predictions_array);
};

const group_predictions = async () => {
  await createPredictions("xBracey");
  await createPredictions("xBracey2");
  await createPredictions("xBracey3");
  await createPredictions("xBracey4");
  await createPredictions("xBracey5");
  await createPredictions("xBracey6");
  await createPredictions("xBracey7");
  await createPredictions("xBracey8");
  await createPredictions("xBracey9");
  await createPredictions("xBracey10");
  await createPredictions("xBracey11");
  await createPredictions("JBrace");
};

export default group_predictions;
