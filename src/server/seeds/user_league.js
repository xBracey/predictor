import models, { sequelize } from "../models";

// const user_leagues = [
//   {
//     userUsername: "xBracey",
//     leagueId: "1",
//     admin: true
//   }
// ];

const user_leagues = [];

const user_league = async () => {
  await models.User_League.bulkCreate(user_leagues);
};

export default user_league;
