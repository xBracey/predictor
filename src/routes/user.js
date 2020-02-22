import { Router } from "express";
import bcrypt from "bcrypt";
import models, { sequelize } from "../models";
import passport from "passport";
import { createPredictions } from "../seeds/group_prediction";

const router = Router();
const saltRounds = 10;

// Helper Functions

export const getUser = async username => {
  return await models.User.findOne({
    where: {
      username
    }
  });
};

export const checkAdmin = async username => {
  const user = await getUser(username);
  return user.admin;
};

// Routes

// GET /user/leagues
router.get("/leagues", async (req, res) => {
  const userLeagues = await models.User.findOne({
    where: {
      username: req.user
    },
    include: [{ model: models.League }]
  });

  return res.json(userLeagues.leagues);
});

// GET /user/me
router.get("/me", async (req, res) => {
  const user = await models.User.findOne({
    where: {
      username: req.user
    },
    attributes: ["username", "name", "admin"]
  });

  return res.json(user);
});

// GET /user
router.get("/", async (req, res) => {
  const admin = await checkAdmin(req.user);

  if (admin) {
    const users = await models.User.findAll();
    return res.json(users);
  } else {
    return res.status(401).json({ error: "Unauthorised" });
  }
});

// PUT /user
router.put("/", async (req, res) => {
  const { name } = req.body;

  if (name) {
    const user = await models.User.update(
      { name },
      {
        where: {
          username: req.user
        }
      }
    );

    return res.json(user);
  } else if (!name) {
    return res.status(400).json({ error: "Wrong Data" });
  }
});

// POST /user/register
router.post("/register", async (req, res) => {
  const { username, password, email, name } = req.body;

  let user = await getUser(username);

  if (user) {
    return res.status(403).send({ error: "Username already taken" });
  }

  user = await models.User.findOne({
    where: {
      email
    }
  });

  if (user) {
    return res.status(403).send({ error: "Email already taken" });
  }
  const passwordHash = await bcrypt.hash(password, saltRounds);

  user = { username, password: passwordHash, email, name };
  await models.User.create(user);

  await createPredictions(username);

  return res.json({ username });
});

// POST /user/login
router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  (req, res) => {
    res.send({
      token: req.user
    });
  }
);

export default router;
