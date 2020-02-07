const groupAddPoints = (match, groupObject) => {
  const { homeGoals, homeTeamName, awayGoals, awayTeamName } = match;

  if ((!homeGoals && homeGoals !== 0) || (!awayGoals && awayGoals !== 0)) {
    return groupObject;
  }

  groupObject[homeTeamName].goalsFor += homeGoals;
  groupObject[awayTeamName].goalsFor += awayGoals;
  groupObject[homeTeamName].goalsAgainst += awayGoals;
  groupObject[awayTeamName].goalsAgainst += homeGoals;
  groupObject[homeTeamName].goalDifference += homeGoals - awayGoals;
  groupObject[awayTeamName].goalDifference += awayGoals - homeGoals;

  if (homeGoals > awayGoals) {
    groupObject[homeTeamName].points += 3;
    groupObject[homeTeamName].wins += 1;
  } else if (homeGoals < awayGoals) {
    groupObject[awayTeamName].points += 3;
    groupObject[awayTeamName].wins += 1;
  } else {
    groupObject[homeTeamName].points += 1;
    groupObject[awayTeamName].points += 1;
  }

  return groupObject;
};

const addExtraPoints = (groupSamePoints, groupMatches) => {
  const groupNames = Object.keys(groupSamePoints);
  let groups = Object.values(groupSamePoints);

  if (groupNames.length === 1) {
    return groupSamePoints;
  }

  if (groupNames.length === 2) {
    const decidingMatch = groupMatches.find(
      match =>
        groupNames.includes(match.homeTeamName) &&
        groupNames.includes(match.awayTeamName)
    );

    const { homeGoals, homeTeamName, awayGoals, awayTeamName } = decidingMatch;

    if (homeGoals > awayGoals) {
      groupSamePoints[homeTeamName].extraPoints += 1;
    } else if (homeGoals < awayGoals) {
      groupSamePoints[awayTeamName].extraPoints += 1;
    } else {
      if (
        groupSamePoints[homeTeamName].goalDifference >
        groupSamePoints[awayTeamName].goalDifference
      ) {
        groupSamePoints[homeTeamName].extraPoints += 1;
      } else if (
        groupSamePoints[homeTeamName].goalDifference <
        groupSamePoints[awayTeamName].goalDifference
      ) {
        groupSamePoints[awayTeamName].extraPoints += 1;
      } else {
        if (
          groupSamePoints[homeTeamName].goalsFor >
          groupSamePoints[awayTeamName].goalsFor
        ) {
          groupSamePoints[homeTeamName].extraPoints += 1;
        } else if (
          groupSamePoints[homeTeamName].goalsFor <
          groupSamePoints[awayTeamName].goalsFor
        ) {
          groupSamePoints[awayTeamName].extraPoints += 1;
        } else {
          if (
            groupSamePoints[homeTeamName].wins >
            groupSamePoints[awayTeamName].wins
          ) {
            groupSamePoints[homeTeamName].extraPoints += 1;
          } else if (
            groupSamePoints[homeTeamName].wins <
            groupSamePoints[awayTeamName].wins
          ) {
            groupSamePoints[awayTeamName].extraPoints += 1;
          } else {
            groupSamePoints[homeTeamName].tied = true;
            groupSamePoints[awayTeamName].tied = true;
          }
        }
      }
    }
  }

  // All draws, sort by goals for
  if (groupNames.length === 4) {
    groups = groups.sort((a, b) => {
      if (a.goalsFor === b.goalsFor) {
        a.tied = true;
        b.tied = true;
      }
      return b.goalsFor - a.goalsFor;
    });

    let extraPoints = 4;
    let lastTeam = null;

    groups.forEach(groupTeam => {
      if (!lastTeam || lastTeam.goalsFor !== groupTeam.goalsFor) {
        extraPoints -= 1;
      }
      lastTeam = groupTeam;
      groupTeam.extraPoints = extraPoints;

      groupSamePoints[groupTeam.name] = groupTeam;
    });
  }

  if (groupNames.length === 3) {
    const relevantMatches = groupMatches.filter(
      match =>
        groupNames.includes(match.homeTeamName) &&
        groupNames.includes(match.awayTeamName)
    );

    let newGroupObject = {};

    groupNames.forEach(name => {
      newGroupObject[name] = {
        name,
        points: 0,
        goalsFor: 0,
        goalsAgainst: 0,
        goalDifference: 0,
        wins: 0,
        extraPoints: 0,
        tied: false
      };
    });

    relevantMatches.forEach(match => {
      newGroupObject = groupAddPoints(match, newGroupObject);
    });

    groups = Object.values(newGroupObject).sort((a, b) => {
      if (a.points === b.points) {
        if (a.goalDifference === b.goalDifference) {
          if (a.goalsFor === b.goalsFor) {
            a.tied = true;
            b.tied = true;
          }
          return b.goalsFor - a.goalsFor;
        }
        return (b.goalDifference - a.goalDifference) * 100;
      }
      return (b.points - a.points) * 10000;
    });

    if (groups.every(team => team.tied)) {
      groups = Object.values(groupSamePoints);

      groups = groups.sort((a, b) => {
        if (a.goalDifference === b.goalDifference) {
          if (a.goalsFor === b.goalsFor) {
            if (a.wins === b.wins) {
              a.tied = true;
              b.tied = true;
            }
            return b.wins - a.wins;
          }
          return (b.goalsFor - a.goalsFor) * 100;
        }
        return (b.goalDifference - a.goalDifference) * 10000;
      });
    } else if (groups.some(team => team.tied)) {
      let subGroup = groups.filter(team => team.tied);
      //use 2 method
      const decidingMatch = groupMatches.find(
        match =>
          subGroup.includes(match.homeTeamName) &&
          subGroup.includes(match.awayTeamName)
      );
    } else {
      for (let index = 0; index < groups.length; index++) {
        groups[index] = groupSamePoints[groups[index].name];
      }
    }

    let extraPoints = 3;
    groups.forEach(groupTeam => {
      extraPoints -= 1;
      groupTeam.extraPoints = extraPoints;
      groupSamePoints[groupTeam.name] = groupTeam;
    });
  }

  return groupSamePoints;
};

export const groupStandings = (groupTeams, groupMatches) => {
  let groupObject = {};
  let groupSamePoints = {};

  groupTeams.forEach(teamName => {
    let team = {};
    team.name = teamName;
    team.points = 0;
    team.goalsFor = 0;
    team.goalsAgainst = 0;
    team.goalDifference = 0;
    team.wins = 0;
    team.extraPoints = 0;
    team.tied = false;
    groupObject[teamName] = { ...team };
  });

  groupTeams = [];

  groupMatches.forEach(match => {
    groupObject = groupAddPoints(match, groupObject);
  });

  Object.values(groupObject).forEach(team => {
    groupSamePoints[team.points]
      ? (groupSamePoints[team.points][team.name] = team)
      : (groupSamePoints[team.points] = { [team.name]: team });
  });

  Object.values(groupSamePoints).forEach(samePoints => {
    groupTeams = [
      ...groupTeams,
      ...Object.values(addExtraPoints(samePoints, groupMatches))
    ];
  });

  groupTeams.sort((a, b) =>
    b.points - a.points !== 0
      ? (b.points - a.points) * 100
      : b.extraPoints - a.extraPoints
  );

  return groupTeams;
};
