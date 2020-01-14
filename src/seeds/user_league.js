import models, { sequelize } from "../models";

const user_leagues = [
  {
    userUsername: "xBracey",
    leagueLeagueName: "brace",
    admin: true
  }
];

const user_league = async () => {
  await models.User_League.bulkCreate(user_leagues);
};

export default user_league;
