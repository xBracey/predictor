import "dotenv/config";
import cors from "cors";
import express from "express";
const path = require("path");

import models, { sequelize } from "./models";
import routes from "./routes";
import seeds from "./seeds";
import { getUser } from "./routes/user";

const app = express();
const force = process.env.FORCE === "true";

import bodyParser from "body-parser"; // import passport and passport-jwt modules
import passport from "passport";
import passportJWT from "passport-jwt"; // ExtractJwt to help extract the token
let ExtractJwt = passportJWT.ExtractJwt; // JwtStrategy which is the strategy for the authentication
let JwtStrategy = passportJWT.Strategy;

export const jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = "pooliecrazy";

// lets create our strategy for web token
let strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  let user = getUser(jwt_payload.username);
  if (user) {
    next(null, user);
  } else {
    next(null, false);
  }
});

// use the strategy
passport.use(strategy);

app.use(passport.initialize());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/user", routes.user);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "/../out")));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/../out/index.html"));
});

sequelize.sync({ force }).then(() => {
  if (force) {
    seeds();
  }

  app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}!`);
  });
});
