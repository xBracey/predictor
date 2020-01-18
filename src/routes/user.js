import { Router } from "express";
import bcrypt from "bcrypt";
import models, { sequelize } from "../models";
import passport from "passport";

const router = Router();
const saltRounds = 10;

const createUser = async ({ username, password, email, name }) => {
  return await models.User.create({ username, password, email, name });
};

const getAllUsers = async () => {
  return await models.User.findAll();
};

export const getUser = async username => {
  return await models.User.findOne({
    where: {
      username
    }
  });
};

export const getUserByEmail = async email => {
  return await models.User.findOne({
    where: {
      email
    }
  });
};

export const getUsersLeagues = async username => {
  return await models.User.findOne({
    where: {
      username
    },
    include: [{ model: models.League }]
  });
};

export const changeUserName = async (username, name) => {
  return await models.User.update(
    { name },
    {
      where: {
        username
      }
    }
  );
};

router.get("/leagues", function(req, res) {
  if (req.user) {
    getUsersLeagues(req.user.username).then(userLeagues => {
      return res.json(userLeagues.leagues);
    });
  } else {
    return res.status(401).json({ error: "Unauthorised" });
  }
});

router.get("/me", function(req, res) {
  if (req.user) {
    getUser(req.user.username).then(user => {
      return res.json(user);
    });
  } else {
    return res.status(401).json({ error: "Unauthorised" });
  }
});

router.get("/", function(req, res) {
  if (req.user && req.user.admin) {
    getAllUsers().then(user => {
      return res.json(user);
    });
  } else {
    return res.status(401).json({ error: "Unauthorised" });
  }
});

router.put("/", function(req, res) {
  if (req.user && req.body.name) {
    changeUserName(req.user.username, req.body.name).then(user => {
      return res.json(user);
    });
  } else if (!req.body.name) {
    return res.status(400).json({ error: "Wrong Data" });
  } else {
    return res.status(401).json({ error: "Unauthorised" });
  }
});

router.post("/register", (req, res) => {
  const { username, password, email, name } = req.body;

  getUser(username)
    .then(user => {
      if (user) {
        throw "Username already taken";
      }
      return getUserByEmail(email);
    })
    .then(user => {
      if (user) {
        throw "Email already taken";
      }
      return bcrypt.hash(password, saltRounds);
    })
    .then(hash => {
      const user = { username, password: hash, email, name };
      return createUser(user);
    })
    .then(user => {
      return res.json(user);
    })
    .catch(error => res.status(403).send(error));
});

router.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/" }),
  function(req, res, next) {
    res.redirect("/buzz");
  }
);

export default router;
