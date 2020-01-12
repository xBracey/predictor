import models, { sequelize } from "../models";

const leagues = [
  {
    code: "90059",
    name: "Brace's Predictor"
  }
];

const league = async () => {
  await models.League.bulkCreate(leagues);
};

export default league;
