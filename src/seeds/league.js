import models, { sequelize } from "../models";

const leagues = [
  {
    name: "Brace's Predictor"
  }
];

const league = async () => {
  await models.League.bulkCreate(leagues);
};

export default league;
