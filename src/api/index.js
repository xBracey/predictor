import "dotenv/config";
import cors from "cors";
import express from "express";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import path from "path";
import fs from "fs";
import bodyParser from "body-parser"; // import passport and passport-jwt modules
import passport from "passport";
import passportJWT from "passport-jwt"; // ExtractJwt to help extract the token

import models, { sequelize } from "./models";
import routes from "./routes";
import seeds from "./seeds";
import { getUser } from "./routes/user";
import App from "../App";

const app = express();
const force = process.env.FORCE === "true";

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

console.log(force);

app.use(passport.initialize());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/user", routes.user);

app.get("/*", (req, res) => {
  const context = {};
  const app = ReactDOMServer.renderToString(
    <StaticRouter location={req.url} context={context}>
      <App />
    </StaticRouter>
  );

  const indexFile = path.resolve("./build/index.html");
  fs.readFile(indexFile, "utf8", (err, data) => {
    if (err) {
      console.error("Something went wrong:", err);
      return res.status(500).send("Oops, better luck next time!");
    }

    return res.send(
      data.replace('<div id="root"></div>', `<div id="root">${app}</div>`)
    );
  });
});

sequelize.sync({ force }).then(() => {
  if (force) {
    seeds();
  }

  app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}!`);
  });
});
