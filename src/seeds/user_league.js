import models, { sequelize } from "../models";

const user_leagues = [
  {
    userUsername: "xBracey",
    leagueLeagueName: "brace",
    admin: true
  },
  {
    userUsername: "xBracey2",
    leagueLeagueName: "brace",
    admin: false
  },
  {
    userUsername: "xBracey3",
    leagueLeagueName: "brace",
    admin: false
  },
  {
    userUsername: "xBracey4",
    leagueLeagueName: "brace",
    admin: false
  },
  {
    userUsername: "xBracey5",
    leagueLeagueName: "brace",
    admin: false
  },
  {
    userUsername: "xBracey6",
    leagueLeagueName: "brace",
    admin: false
  },
  {
    userUsername: "xBracey7",
    leagueLeagueName: "brace",
    admin: false
  },
  {
    userUsername: "xBracey8",
    leagueLeagueName: "brace",
    admin: false
  },
  {
    userUsername: "xBracey9",
    leagueLeagueName: "brace",
    admin: false
  },
  {
    userUsername: "xBracey10",
    leagueLeagueName: "brace",
    admin: false
  },
  {
    userUsername: "xBracey11",
    leagueLeagueName: "brace",
    admin: false
  },
  {
    userUsername: "JBrace",
    leagueLeagueName: "brace",
    admin: true
  },
  {
    userUsername: "xBracey",
    leagueLeagueName: "brace2",
    admin: true
  },
  {
    userUsername: "xBracey2",
    leagueLeagueName: "brace2",
    admin: false
  },
  {
    userUsername: "xBracey3",
    leagueLeagueName: "brace2",
    admin: false
  },
  {
    userUsername: "xBracey4",
    leagueLeagueName: "brace2",
    admin: false
  },
  {
    userUsername: "xBracey5",
    leagueLeagueName: "brace2",
    admin: false
  },
  {
    userUsername: "xBracey6",
    leagueLeagueName: "brace2",
    admin: false
  },
  {
    userUsername: "xBracey7",
    leagueLeagueName: "brace2",
    admin: false
  },
  {
    userUsername: "xBracey8",
    leagueLeagueName: "brace2",
    admin: false
  },
  {
    userUsername: "xBracey9",
    leagueLeagueName: "brace2",
    admin: false
  },
  {
    userUsername: "xBracey10",
    leagueLeagueName: "brace2",
    admin: false
  },
  {
    userUsername: "xBracey11",
    leagueLeagueName: "brace2",
    admin: false
  },
  {
    userUsername: "JBrace",
    leagueLeagueName: "brace2",
    admin: true
  },
  {
    userUsername: "JBrace",
    leagueLeagueName: "brace3",
    admin: true
  },
  {
    userUsername: "xBracey",
    leagueLeagueName: "brace3",
    admin: true
  }
];

const user_league = async () => {
  await models.User_League.bulkCreate(user_leagues);
};

export default user_league;
