import { Router } from "express";
import bcrypt from "bcrypt";
import models, { sequelize } from "../models";
import { createPredictions } from "../seeds/group_prediction";
import { sendMail } from "../../lib/email";
import crypto from "crypto";
import jwt from "jwt-simple";
import { SECRET } from "../passport";

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

export const getUserFromEmail = async email => {
  return await models.User.findOne({
    where: {
      email
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

  user = await getUserFromEmail(email);

  if (user) {
    return res.status(403).send({ error: "Email already taken" });
  }
  const passwordHash = await bcrypt.hash(password, saltRounds);
  const verification_token = crypto.randomBytes(20).toString("hex");
  const verification_expiry = Date.now() + 24 * 60 * 60 * 5 * 1000;

  user = {
    username,
    password: passwordHash,
    email,
    name,
    verification_token,
    verification_expiry
  };

  const host = req.get("host");

  await models.User.create(user);

  await createPredictions(username);

  sendMail({
    from: "hello@footybee.com",
    to: email,
    subject: "Email Verification",
    text: `Verify your email here ${req.protocol}://${host}/verify?token=${verification_token}`
  });

  return res.json({
    success: [
      "Your account has been created succesfully.",
      "To be able to login you must first verify your email within 5 days or your account will be deleted."
    ]
  });
});

// POST /user/login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  let user = await getUser(username);
  if (!user) {
    user = await getUserFromEmail(username);

    if (!user) {
      return res
        .status(401)
        .send({ error: "Username/Email or password is incorrect" });
    }
  }

  const result = await bcrypt.compare(password, user.password);
  if (result) {
    const token = jwt.encode(
      { username: user.username, date: Date.now() },
      SECRET
    );

    res.cookie("token", token, {
      httpOnly: true,
      overwrite: true
    });
    res.send({
      token
    });
  } else {
    return res
      .status(401)
      .send({ error: "Username/Email or password is incorrect" });
  }
});

// POST /user/email-verify
router.post("/email-verify", async (req, res) => {
  const { token } = req.body;

  const user = await models.User.findOne({
    where: {
      verification_token: token
    }
  });

  if (!user) {
    return res.status(403).send({
      error:
        "Token is not valid or has expired. This means your account has been deleted and you need to re-register and verify your email within 5 days."
    });
  }

  await models.User.update(
    { verification_token: null, verification_expiry: null, verified: true },
    {
      where: {
        username: user.username
      }
    }
  );

  return res.json({ success: "Your email has been successfully verified!" });
});

// POST /user/forgot-password
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  const forgot_password_token = crypto.randomBytes(20).toString("hex");
  const forgot_password_expiry = Date.now() + 24 * 60 * 60 * 1 * 1000;
  const host = req.get("host");

  await models.User.update(
    { forgot_password_token, forgot_password_expiry },
    {
      where: {
        email
      }
    }
  );

  sendMail({
    from: "hello@footybee.com",
    to: email,
    subject: "Email Verification",
    text: `Reset your password here ${req.protocol}://${host}/reset-password?token=${forgot_password_token}`
  });

  return res.json({
    success: "Forgot password email has been sent successfully"
  });
});

// POST /user/reset-password
router.post("/reset-password", async (req, res) => {
  const { token, password } = req.body;

  const user = await models.User.findOne({
    where: {
      forgot_password_token: token
    }
  });

  if (!user) {
    return res.status(403).send({
      error: [
        "Token is not valid or has expired.",
        "Please resend the forgot password email from the login page to reset your password."
      ]
    });
  }

  const passwordHash = await bcrypt.hash(password, saltRounds);

  await models.User.update(
    {
      forgot_password_token: null,
      forgot_password_expiry: null,
      password: passwordHash
    },
    {
      where: {
        forgot_password_token: token
      }
    }
  );

  return res.json({ success: "Password has been reset successfully!" });
});

export default router;
