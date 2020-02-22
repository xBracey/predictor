import express, { Router } from "express";
import path from "path";
import next from "next";
import cookieParser from "cookie-parser";
import { SECRET } from "../passport";
import jwt from "jwt-simple";

const router = Router();
const outDirectoy = __dirname + "/../../out/";

const nextApp = next({ dev: process.env.ENV === "development" });
const handle = nextApp.getRequestHandler();

const pages = [
  "/index",
  "/register",
  "/admin",
  "/admin/groups",
  "/admin/groups/add",
  "/admin/matches",
  "/admin/matches/edit",
  "/admin/players",
  "/admin/players/add",
  "/admin/players/edit",
  "/admin/teams",
  "/admin/teams/add",
  "/admin/teams/edit"
];

const userPages = ["/buzz", "/leagues", "/results", "/predictions"];

nextApp.prepare().then(() => {
  // Serve static files from the React app
  router.use(express.static(path.join(outDirectoy)));
  router.use(cookieParser());

  router.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  userPages.forEach(page => {
    router.use(page, (req, res, next) => {
      try {
        const { username, date } = jwt.decode(req.cookies.token, SECRET);
        const now = Date.now();

        const tokenDate = date + 24 * 60 * 60 * 14 * 1000;

        if (username && tokenDate > now) {
          req.user = username;
          next(null, username);
          return;
        }
        res.redirect("/");
      } catch (error) {
        res.redirect("/");
      }
    });

    router.get(page, (req, res) => {
      console.log(req.user);
      nextApp.render(req, res, page);
    });
  });

  pages.forEach(page => {
    router.get(page, (req, res) => {
      nextApp.render(req, res, page);
    });
  });

  router.get("/league/:id", (req, res) => {
    if (req.user) {
      nextApp.render(req, res, "/league", { id: req.params.id });
    } else {
      res.redirect("/");
    }
  });

  router.get("*", (req, res) => {
    return handle(req, res);
  });
});

export default router;
