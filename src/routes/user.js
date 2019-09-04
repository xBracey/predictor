import { Router } from "express";
import bcrypt from "bcrypt";
import models, { sequelize } from "../models";
import jwt from "jsonwebtoken";
import { jwtOptions } from "../";
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

const hashPassword = password => {
  bcrypt.hash(password, saltRounds).then(function(hash) {
    return hash;
  });
};

router.get("/me", passport.authenticate("jwt", { session: false }), function(
  req,
  res
) {
  req.user.then(user => {
    getUser(user.username).then(user => {
      return res.json(user);
    });
  });
});

router.get("/", passport.authenticate("jwt", { session: false }), function(
  req,
  res
) {
  req.user.then(user => {
    if (user.admin) {
      getAllUsers(user.username).then(user => {
        return res.json(user);
      });
    } else {
      return res.json({});
    }
  });
});

router.post("/register", (req, res) => {
  const { username, password, email, name } = req.body;
  bcrypt.hash(password, saltRounds).then(hash => {
    const user = { username, password: hash, email, name };
    createUser(user).then(user => {
      return res.json(user);
    });
  });
});

router.post("/login", async function(req, res, next) {
  const { username, password } = req.body;
  if (username && password) {
    // we get the user with the name and save the resolved promise
    let user = await getUser(username);
    if (!user) {
      return res.status(401).json({ msg: "No such user found", user });
    }

    bcrypt.compare(password, user.password).then(function(result) {
      if (result) {
        // from now on we’ll identify the user by the id and the id is// the only personalized value that goes into our token
        let payload = { username: user.username };
        let token = jwt.sign(payload, jwtOptions.secretOrKey);
        return res.json({ msg: "ok", token: token });
      } else {
        return res.status(401).json({ msg: "Password is incorrect" });
      }
    });
  }
});

export default router;
