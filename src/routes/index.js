import { Router } from "express";
import passport from "passport";
const api = Router();
const apiAuthExceptions = [
  "/user/login",
  "/user/register",
  "user/email-verify",
  "user/password-verify",
  "user/reset-password",
  "user/forgot-password"
];

api.use(function(req, res, next) {
  passport.authenticate("bearer", { session: false }, function(
    error,
    user,
    info
  ) {
    if ((error || !user) && !apiAuthExceptions.includes(req.url)) {
      return res.status(401).send({ error: "Unauthorised" });
    }

    req.user = user;
    return next();
  })(req, res, next);
});

import user from "./user";
import pages from "./pages";
import groups from "./groups";
import players from "./players";
import teams from "./teams";
import match from "./match";
import leagues from "./leagues";
import predictions from "./predictions";

api.use("/user", user);
api.use("/groups", groups);
api.use("/players", players);
api.use("/teams", teams);
api.use("/match", match);
api.use("/leagues", leagues);
api.use("/predictions", predictions);

export default {
  api,
  pages
};
