import models, { sequelize } from "../models";

const league_rules = [
  {
    ruleId: 1,
    leagueLeagueName: "brace",
    points: 40
  },
  {
    ruleId: 2,
    leagueLeagueName: "brace",
    points: 20
  },
  {
    ruleId: 3,
    leagueLeagueName: "brace",
    points: 10
  }
];

const league_rule = async () => {
  await models.League_Rule.bulkCreate(league_rules);
};

export default league_rule;
