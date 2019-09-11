import "dotenv/config";
import cors from "cors";
import express from "express";
import path from "path";
import bcrypt from "bcrypt";
import { Strategy } from "passport-local";
import session from "express-session";

import models, { sequelize } from "./models";
import routes from "./routes";
import seeds from "./seeds";
import { getUser } from "./routes/user";

const app = express();
const force = process.env.FORCE === "true";

import bodyParser from "body-parser"; // import passport and passport-jwt modules
import passport from "passport";

passport.use(
  new Strategy(async function(username, password, next) {
    const user = await getUser(username);
    if (!user) {
      return next(null, false);
    }

    const result = await bcrypt.compare(password, user.password);
    if (result) {
      return next(null, user);
    } else {
      return next(null, false);
    }
  })
);

passport.serializeUser(function(user, next) {
  next(null, user.username);
});

passport.deserializeUser(async function(username, next) {
  const user = await getUser(username);
  if (!user) {
    return next(null, false);
  } else {
    return next(null, user);
  }
});

app.use(session({ secret: "pooliecrazy22" }));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/user", routes.user);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "/../out")));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/../out/index.html"));
});

app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname + "/../out/register.html"));
});

app.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
});

app.get("/buzz", (req, res) => {
  if (req.user) {
    res.sendFile(path.join(__dirname + "/../out/buzz.html"));
  } else {
    res.redirect("/");
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/../out/404.html"));
});

sequelize.sync({ force }).then(() => {
  if (force) {
    seeds();
  }

  app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}!`);
  });
});
