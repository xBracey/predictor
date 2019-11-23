import { Router } from "express";
import models, { sequelize } from "../models";

const router = Router();

const createMatch = async (
  model,
  homeGoals,
  awayGoals,
  date,
  groupNumber,
  homeTeamName,
  awayTeamName
) => {
  const router = Router();

  return await model.create({
    homeGoals,
    awayGoals,
    date,
    groupNumber,
    homeTeamName,
    awayTeamName
  });
};

const getAllMatches = async model => {
  return await model.findAll();
};

const getMatch = async (model, id) => {
  return await model.findOne({
    where: {
      id
    }
  });
};

const updateMatch = async (
  model,
  id,
  homeGoals,
  awayGoals,
  date,
  groupNumber,
  homeTeamName,
  awayTeamName
) => {
  return await model.update(
    { homeGoals, awayGoals, date, groupNumber, homeTeamName, awayTeamName },
    {
      where: {
        id
      }
    }
  );
};

const deleteMatch = async (model, id) => {
  return await model.destroy({
    where: {
      id
    }
  });
};

router.get("/group", function(req, res) {
  if (req.user) {
    getAllMatches(models.Group_Match).then(matches => {
      return res.json(matches);
    });
  } else {
    return res.status(401).send("Unauthorised");
  }
});

router.get("/knockout", function(req, res) {
  if (req.user) {
    getAllMatches(models.Knockout_Match).then(matches => {
      return res.json(matches);
    });
  } else {
    return res.status(401).send("Unauthorised");
  }
});

router.get("/group/:id", function(req, res) {
  if (req.user && req.params.id) {
    getMatch(models.Group_Match, req.params.id).then(match => {
      return res.json(match);
    });
  } else if (!req.params.id) {
    return res.status(400).send("Wrong Data");
  } else {
    return res.status(401).send("Unauthorised");
  }
});

router.get("/knockout/:id", function(req, res) {
  if (req.user && req.params.id) {
    getMatch(models.Knockout_Match, req.params.id).then(match => {
      return res.json(match);
    });
  } else if (!req.params.id) {
    return res.status(400).send("Wrong Data");
  } else {
    return res.status(401).send("Unauthorised");
  }
});

router.post("/group", function(req, res) {
  const {
    homeGoals,
    awayGoals,
    date,
    groupNumber,
    homeTeamName,
    awayTeamName
  } = req.body;

  if (
    req.user &&
    req.user.admin &&
    date &&
    groupNumber &&
    homeTeamName &&
    awayTeamName
  ) {
    createMatch(
      models.Group_Match,
      homeGoals,
      awayGoals,
      date,
      groupNumber,
      homeTeamName,
      awayTeamName
    ).then(match => {
      return res.json(match);
    });
  } else if (!date || !groupNumber || !homeTeamName || !awayTeamName) {
    return res.status(400).send("Wrong Data");
  } else {
    return res.status(401).send("Unauthorised");
  }
});

router.post("/knockout", function(req, res) {
  const {
    homeGoals,
    awayGoals,
    date,
    groupNumber,
    homeTeamName,
    awayTeamName
  } = req.body;

  if (
    req.user &&
    req.user.admin &&
    date &&
    groupNumber &&
    homeTeamName &&
    awayTeamName
  ) {
    createMatch(
      models.Knockout_Match,
      homeGoals,
      awayGoals,
      date,
      groupNumber,
      homeTeamName,
      awayTeamName
    ).then(match => {
      return res.json(match);
    });
  } else if (!date || !groupNumber || !homeTeamName || !awayTeamName) {
    return res.status(400).send("Wrong Data");
  } else {
    return res.status(401).send("Unauthorised");
  }
});

router.put("/group", function(req, res) {
  const {
    id,
    homeGoals,
    awayGoals,
    date,
    groupNumber,
    homeTeamName,
    awayTeamName
  } = req.body;

  if (
    req.user &&
    req.user.admin &&
    id !== null &&
    date &&
    groupNumber &&
    homeTeamName &&
    awayTeamName
  ) {
    updateMatch(
      models.Group_Match,
      id,
      homeGoals,
      awayGoals,
      date,
      groupNumber,
      homeTeamName,
      awayTeamName
    ).then(match => {
      return res.json(match);
    });
  } else if (
    id === null ||
    !date ||
    !groupNumber ||
    !homeTeamName ||
    !awayTeamName
  ) {
    return res.status(400).send("Wrong Data");
  } else {
    return res.status(401).send("Unauthorised");
  }
});

router.put("/knockout", function(req, res) {
  const {
    id,
    homeGoals,
    awayGoals,
    date,
    groupNumber,
    homeTeamName,
    awayTeamName
  } = req.body;

  if (
    req.user &&
    req.user.admin &&
    id !== null &&
    date &&
    groupNumber &&
    homeTeamName &&
    awayTeamName
  ) {
    updateMatch(
      models.Knockout_Match,
      id,
      homeGoals,
      awayGoals,
      date,
      groupNumber,
      homeTeamName,
      awayTeamName
    ).then(match => {
      return res.json(match);
    });
  } else if (
    id === null ||
    !date ||
    !groupNumber ||
    !homeTeamName ||
    !awayTeamName
  ) {
    return res.status(400).send("Wrong Data");
  } else {
    return res.status(401).send("Unauthorised");
  }
});

router.delete("/group/:id", function(req, res) {
  if (req.user && req.user.admin && req.params.id) {
    deleteMatch(models.Group_Match, req.params.id).then(match => {
      return res.json(match);
    });
  } else if (!req.params.id) {
    return res.status(400).send("Wrong Data");
  } else {
    return res.status(401).send("Unauthorised");
  }
});

router.delete("/knockout/:id", function(req, res) {
  if (req.user && req.user.admin && req.params.id) {
    deleteMatch(models.Knockout_Match, req.params.id).then(match => {
      return res.json(match);
    });
  } else if (!req.params.id) {
    return res.status(400).send("Wrong Data");
  } else {
    return res.status(401).send("Unauthorised");
  }
});

// Create group Matches

router.post("/group/create", function(req, res) {
  if (req.user && req.user.admin) {
    getAllMatches(models.Group_Match).then(matches => {
      if (matches.length) {
        return res
          .status(400)
          .json({ error: "Matches have already been generated" });
      } else {
        models.Team.findAll().then(teamsArray => {
          // if (teamsArray.length !== 24) {
          //   return res.status(400).json({
          //     error: `Incorrect number of teams, there are ${
          //       teamsArray.length
          //     } teams when there should be 24`
          //   });
          // }

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
                date: Date.now()
              });
            }
          }

          models.Group_Match.bulkCreate(group_matches);
          return res.json({ code: 200 });
        });
      }
    });
  } else {
    return res.status(401).send("Unauthorised");
  }
});

export default router;
