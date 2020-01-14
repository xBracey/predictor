import models, { sequelize } from "../models";

const leagues = [
  {
    leagueName: "brace",
    password: "1234",
    displayName: "Brace's Predictor"
  }
];

const league = async () => {
  await models.League.bulkCreate(leagues);
};

export default league;
