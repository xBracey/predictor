import bodyParser from "body-parser"; // import passport and passport-jwt modules
import passport from "passport";
import bcrypt from "bcrypt";
import { Strategy } from "passport-local";
import { Strategy as BearerStrategy } from "passport-http-bearer";

import { getUser } from "./routes/user";

import jwt from "jwt-simple";
export const SECRET = "pooliecrazy22";

export function passportConfiguration(app) {
  app.use(passport.initialize());

  passport.use(
    new Strategy(async function(username, password, next) {
      const user = await getUser(username);
      if (!user) {
        return next(null, false);
      }

      const result = await bcrypt.compare(password, user.password);
      if (result) {
        return next(null, jwt.encode({ username, date: Date.now() }, SECRET));
      } else {
        return next(null, false);
      }
    })
  );

  passport.use(
    new BearerStrategy((token, next) => {
      try {
        const { username, date } = jwt.decode(token, SECRET);
        const now = Date.now();

        const tokenDate = date + 24 * 60 * 60 * 14 * 1000;

        if (username && tokenDate > now) {
          next(null, username);
          return;
        }
        next("Unauthenticated", false);
      } catch (error) {
        next("Unauthenticated", false);
      }
    })
  );

  return app;
}
