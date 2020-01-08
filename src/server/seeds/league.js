import models, { sequelize } from "../models";

const leagues = [];

const league = async () => {
  await models.League.bulkCreate(leagues);
};

export default league;
