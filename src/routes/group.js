import { Router } from "express";
import models, { sequelize } from "../models";

const router = Router();

const createGroup = async number => {
  return await models.Group.create({ number });
};

const getAllGroups = async () => {
  return await models.Group.findAll();
};

const deleteGroup = async number => {
  return await models.Group.destroy({
    where: {
      number
    }
  });
};

const getGroupMatches = async number => {
  const matches = await models.Group_Match.findAll({
    where: { groupNumber: number }
  });
  return JSON.parse(JSON.stringify(matches));
};

const getGroupTeams = async number => {
  const teams = await models.Team.findAll({ where: { groupNumber: number } });
  return JSON.parse(JSON.stringify(teams));
};

router.get("/", function(req, res) {
  if (req.user) {
    getAllGroups().then(groups => {
      return res.json(groups);
    });
  } else {
    return res.status(401).json({ error: "Unauthorised" });
  }
});

router.post("/", function(req, res) {
  if (req.user && req.user.admin && req.body.number) {
    createGroup(req.body.number).then(group => {
      return res.json(group);
    });
  } else if (!req.body.number) {
    return res.status(400).json({ error: "Wrong Data" });
  } else {
    return res.status(401).json({ error: "Unauthorised" });
  }
});

router.delete("/:number", function(req, res) {
  if (req.user && req.user.admin && req.params.number) {
    deleteGroup(req.params.number).then(group => {
      return res.json(group);
    });
  } else if (!req.body.number) {
    return res.status(400).json({ error: "Wrong Data" });
  } else {
    return res.status(401).json({ error: "Unauthorised" });
  }
});

const groupAddPoints = (match, groupObject) => {
  const { homeGoals, homeTeamName, awayGoals, awayTeamName } = match;
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
        groupSamePoints[homeTeamName].goalDifference >
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
          groupSamePoints[homeTeamName].goalsFor >
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
            groupSamePoints[homeTeamName].wins >
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
      return a.goalsFor < b.goalsFor;
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

    console.log(newGroupObject);

    groups = Object.values(newGroupObject).sort((a, b) => {
      if (a.points === b.points) {
        if (a.goalDifference === b.goalDifference) {
          if (a.goalsFor === b.goalsFor) {
            a.tied = true;
            b.tied = true;
          }
          return a.goalsFor < b.goalsFor;
        }
        return a.goalDifference < b.goalDifference;
      }
      return a.goalsFor < b.goalsFor;
    });

    console.log(groups);

    if (groups.every(team => team.tied)) {
      groups = Object.values(groupSamePoints);

      groups = groups.sort((a, b) => {
        if (a.goalDifference === b.goalDifference) {
          if (a.goalsFor === b.goalsFor) {
            if (a.wins === b.wins) {
              a.tied = true;
              b.tied = true;
            }
            return a.wins < b.wins;
          }
          return a.goalsFor < b.goalsFor;
        }
        return a.goalDifference < b.goalDifference;
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

  console.log(groupSamePoints);

  return groupSamePoints;
};

router.get("/standings/:number", async function(req, res) {
  if (req.user && req.params.number) {
    const groupMatches = await getGroupMatches(req.params.number);
    let groupTeams = await getGroupTeams(req.params.number);
    let groupObject = {};
    let groupSamePoints = {};

    groupTeams.forEach(team => {
      team.points = 0;
      team.goalsFor = 0;
      team.goalsAgainst = 0;
      team.goalDifference = 0;
      team.wins = 0;
      team.extraPoints = 0;
      team.tied = false;
      groupObject[team.name] = { ...team };
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

    return res.json(groupTeams);
  } else if (!req.body.number) {
    return res.status(400).json({ error: "Wrong Data" });
  } else {
    return res.status(401).json({ error: "Unauthorised" });
  }
});

export default router;
