import models, { sequelize } from "../models";
import moment from "moment";

const group_match = async () => {
  const teamsArray = await models.Team.findAll();

  const teams = JSON.parse(JSON.stringify(teamsArray));
  const group_matches = [];

  for (let i = 0; i < teams.length; i++) {
    let matching_teams = teams
      .slice(i + 1)
      .filter(team => teams[i].groupNumber === team.groupNumber);

    for (let j = 0; j < matching_teams.length; j++) {
      group_matches.push({
        groupNumber: teams[i].groupNumber,
        homeTeamName: teams[i].name,
        awayTeamName: matching_teams[j].name,
        date: moment().add(Math.floor(Math.random() * 8), "days"),
        homeGoals: Math.floor(Math.random() * 4),
        awayGoals: Math.floor(Math.random() * 4)
      });
    }
  }

  return models.Group_Match.bulkCreate(group_matches);
};

export default group_match;
