import bodyParser from "body-parser"; // import passport and passport-jwt modules
import passport from "passport";
import bcrypt from "bcrypt";
import { Strategy } from "passport-local";
import session from "express-session";

import { getUser } from "./routes/user";

export function passportConfiguration(app) {
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

  return app;
}
