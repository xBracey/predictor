import { Router } from "express";
import models, { sequelize } from "../models";
import {
  defaultRules,
  getLeagueStandings,
  getLeagueInfo
} from "../../lib/leagues";

const router = Router();

// Helper Functions

const getLeagues = async username => {
  return await models.User.findOne({
    where: {
      username
    },
    include: [{ model: models.League }]
  });
};

// Routes

// POST /leagues/create
router.post("/create", async (req, res) => {
  const { leagueName, displayName, password } = req.body;

  if (leagueName && displayName && password) {
    const leagueCheck = await models.League.findAll({
      where: { leagueName }
    });

    if (leagueCheck.length) {
      return res.status(400).send("League already exists!");
    }

    const newLeague = await models.League.create({
      leagueName,
      displayName,
      password
    });

    await models.User_League.create({
      userUsername: req.user,
      leagueLeagueName: leagueName,
      admin: true
    });

    const leagueRules = [...defaultRules];
    leagueRules.forEach(leagueRule => {
      leagueRule.leagueLeagueName = leagueName;
    });

    await models.League_Rule.bulkCreate(leagueRules);

    return res.json(newLeague);
  } else if (!leagueName || !displayName || !rpassword) {
    return res.status(400).json({ error: "Wrong Data" });
  }
});

// POST /leagues/add
router.post("/add", async (req, res) => {
  const { leagueName, password } = req.body;

  if (leagueName && password) {
    const leagueUserCheck = await models.User_League.findAll({
      where: { userUsername: req.user, leagueLeagueName: leagueName }
    });

    const leagueCheck = await models.League.findAll({
      where: { leagueName, password }
    });

    if (leagueUserCheck.length) {
      return res
        .status(400)
        .send({ error: "User already is a part of this league!" });
    }

    if (!leagueCheck.length) {
      return res
        .status(400)
        .send({ error: "League name or password is incorrect" });
    }

    const newLeague = await models.League.findOne({
      where: {
        leagueName,
        password
      }
    });

    await models.User_League.create({
      userUsername: req.user,
      leagueLeagueName: leagueName
    });

    return res.json(newLeague);
  } else if (!leagueName || !password) {
    return res.status(400).json({ error: "Wrong Data" });
  }
});

// GET /leagues/standings/:leagueName
router.get("/standings/:leagueName", async (req, res) => {
  const { leagueName } = req.params;

  const leagueStandings = await getLeagueStandings(req, leagueName);

  const { error, status, usernamePoints } = leagueStandings;

  return status === 200
    ? res.status(status).json(usernamePoints)
    : res.status(status).json({ error });
});

// GET /leagues/info/:leagueName
router.get("/info/:leagueName", async (req, res) => {
  const { leagueName } = req.params;

  const leagueInfo = await getLeagueInfo(req, leagueName);

  const { error, status, info } = leagueInfo;

  return status === 200
    ? res.status(status).json(info)
    : res.status(status).json({ error });
});

// GET /leagues
router.get("/", async (req, res) => {
  const userLeagues = await getLeagues(req.user);
  const leagues = JSON.parse(JSON.stringify(userLeagues.leagues));
  const leaguesInfoStandings = [];
  let leagueInfoStanding = {};
  let league = {};
  let standings = [];

  for (let index = 0; index < leagues.length; index++) {
    league = leagues[index];

    standings = await getLeagueStandings(req, league.leagueName);
    leagueInfoStanding.standings = standings.usernamePoints;

    leagueInfoStanding.info = await getLeagueInfo(req, league.leagueName);
    leaguesInfoStandings.push({ ...leagueInfoStanding });
    leagueInfoStanding = {};
  }

  return res.json(leaguesInfoStandings);
});

// POST /leagues/add/rule
router.post("/add/rule", async (req, res) => {
  const { ruleId, leagueName, points } = req.body;

  if (ruleId && leagueName && points) {
    const leagueCheck = await models.League.findAll({
      where: { leagueName }
    });

    const ruleCheck = await models.Rule.findAll({
      where: { id: ruleId }
    });

    const leagueRuleCheck = await models.League_Rule.findAll({
      where: { ruleId, leagueLeagueName: leagueName }
    });

    if (!leagueCheck.length || !ruleCheck.length) {
      res.status(400).send({ error: "Rule or League does not exist" });
    }

    const league = leagueRuleCheck.length
      ? await models.League_Rule.update(
          {
            points
          },
          {
            where: {
              ruleId,
              leagueLeagueName: leagueName
            }
          }
        )
      : await models.League_Rule.create({
          ruleId,
          leagueLeagueName: leagueName,
          points
        });

    return res.json(league);
  } else if (!leagueName || !ruleId || !points) {
    return res.status(400).json({ error: "Wrong Data" });
  }
});

export default router;
