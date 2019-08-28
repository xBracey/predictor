import Sequelize from "sequelize";

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    dialect: "postgres",
    host: process.env.DATABASE_HOST
  }
);

const models = {
  Group: sequelize.import("./group"),
  Player: sequelize.import("./player"),
  Team: sequelize.import("./team"),
  League: sequelize.import("./league"),
  Group_Match: sequelize.import("./group_match"),
  Knockout_Match: sequelize.import("./knockout_match"),
  User: sequelize.import("./user"),
  Group_Match_Scorer: sequelize.import("./group_match_scorer"),
  Knockout_Match_Scorer: sequelize.import("./knockout_match_scorer"),
  Group_Prediction: sequelize.import("./group_prediction"),
  Knockout_Prediction: sequelize.import("./knockout_prediction"),
  User_League: sequelize.import("./user_league")
};

Object.keys(models).forEach(key => {
  if ("associate" in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };

export default models;
