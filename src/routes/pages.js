import express, { Router } from "express";
import path from "path";
import next from "next";

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

const userPages = ["/buzz", "/leagues", "/results"];

nextApp.prepare().then(() => {
  // Serve static files from the React app
  router.use(express.static(path.join(outDirectoy)));

  router.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  userPages.forEach(page => {
    router.get(page, (req, res) => {
      if (req.user) {
        nextApp.render(req, res, page);
      } else {
        res.redirect("/");
      }
    });
  });

  pages.forEach(page => {
    router.get(page, (req, res) => {
      nextApp.render(req, res, page);
    });
  });

  router.get("*", (req, res) => {
    return handle(req, res);
  });
});

export default router;
