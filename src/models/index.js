import Sequelize from "sequelize";

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    dialect: "mysql",
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
  Group_Prediction: sequelize.import("./group_prediction"),
  Knockout_Prediction: sequelize.import("./knockout_prediction"),
  User_League: sequelize.import("./user_league"),
  Rule: sequelize.import("./rule"),
  Rule_Prediction: sequelize.import("./rule_prediction"),
  League_Rule: sequelize.import("./league_rule")
};

Object.keys(models).forEach(key => {
  if ("associate" in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };

export default models;
