import Sequelize from "sequelize";
import user from "./user";
import group from "./group";
import team from "./team";
import group_match from "./group_match";
import league from "./league";
import user_league from "./user_league";
import player from "./player";
import knockout_match from "./knockout_match";
import group_match_scorer from "./group_match_scorer";
import knockout_match_scorer from "./knockout_match_scorer";
import group_prediction from "./group_prediction";
import knockout_prediction from "./knockout_prediction";

const sequelize =
  process.env.NODE_ENV === "development"
    ? new Sequelize(
        process.env.DATABASE,
        process.env.DATABASE_USER,
        process.env.DATABASE_PASSWORD,
        {
          dialect: "postgres"
        }
      )
    : new Sequelize(process.env.DATABASE_URL, {
        dialect: "postgres",
        protocol: "postgres"
      });

const models = {
  Group: group,
  Player: player,
  Team: team,
  League: league,
  Group_Match: group_match,
  Knockout_Match: knockout_match,
  User: user,
  Group_Match_Scorer: group_match_scorer,
  Knockout_Match_Scorer: knockout_match_scorer,
  Group_Prediction: group_prediction,
  Knockout_Prediction: knockout_prediction,
  User_League: user_league
};

Object.keys(models).forEach(key => {
  if ("associate" in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };

export default models;
