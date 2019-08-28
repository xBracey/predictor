import "dotenv/config";
import cors from "cors";
import express from "express";

import models, { sequelize } from "./models";
import routes from "./routes";
import seeds from "./seeds";
import { getUser } from "./routes/user";

const app = express();
const force = false;

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

sequelize.sync({ force }).then(() => {
  if (force) {
    seeds();
  }

  app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}!`);
  });
});
