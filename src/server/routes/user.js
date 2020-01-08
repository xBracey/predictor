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

router.get("/me", function(req, res) {
  if (req.user) {
    getUser(req.user.username).then(user => {
      return res.json(user);
    });
  } else {
    return res.status(401).send("Unauthorised");
  }
});

router.get("/", function(req, res) {
  if (req.user && req.user.admin) {
    getAllUsers().then(user => {
      return res.json(user);
    });
  } else {
    return res.status(401).send("Unauthorised");
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
