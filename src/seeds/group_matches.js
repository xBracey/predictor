import models, { sequelize } from "../models";

const group_match = async () => {
  await models.Team.findAll().then(async teamsArray => {
    const teams = JSON.parse(JSON.stringify(teamsArray));
    const group_matches = [];

    for (let i = 0; i < teams.length; i++) {
      let matching_teams = teams
        .slice(i + 1)
        .filter(team => teams[i].groupNumber === team.groupNumber);

      for (let j = 0; j < matching_teams.length; j++) {
        group_matches.push({
          groupNumber: teams[i].groupNumber,
          homeTeamId: teams[i].id,
          awayTeamId: matching_teams[j].id
        });
      }
    }

    await models.Group_Match.bulkCreate(group_matches);
  });
};

export default group_match;
