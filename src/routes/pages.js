import express, { Router } from "express";
import path from "path";
import next from "next";
import cookieParser from "cookie-parser";
import { SECRET } from "../passport";
import jwt from "jwt-simple";
import { checkAdmin } from "./user";

const router = Router();
const outDirectoy = __dirname + "/../../out/";

const nextApp = next({ dev: process.env.ENV === "development" });
const handle = nextApp.getRequestHandler();

const pages = ["/login", "/register", "/forgot-password"];

const userPages = ["/leagues", "/results", "/predictions"];

const adminPages = [
  "/",
  "/groups",
  "/groups/add",
  "/players",
  "/players/add",
  "/players/edit",
  "/teams",
  "/teams/add",
  "/teams/edit",
  "/matches",
  "/matches/add",
  "/matches/edit"
];

const authentication = (req, res, next) => {
  try {
    const { username, date } = jwt.decode(req.cookies.token, SECRET);
    const now = Date.now();

    const tokenDate = date + 24 * 60 * 60 * 14 * 1000;

    if (username && tokenDate > now) {
      req.user = username;
      next(null, username);
      return;
    }
    res.redirect("/login");
  } catch (error) {
    res.redirect("/login");
  }
};

nextApp.prepare().then(() => {
  // Serve static files from the React app
  router.use(express.static(path.join(outDirectoy)));
  router.use(cookieParser());

  router.get("/logout", function(req, res) {
    res.cookie("token", null, {
      httpOnly: true,
      overwrite: true
    });
    req.logout();
    res.redirect("/login");
  });

  router.use("/", (req, res, next) => {
    if (req.url === "/") {
      authentication(req, res, next);
    } else {
      next();
    }
  });

  router.get("/", (req, res) => {
    nextApp.render(req, res, "/buzz");
  });

  userPages.forEach(page => {
    router.use(page, authentication);

    router.get(page, (req, res) => {
      nextApp.render(req, res, page);
    });
  });

  pages.forEach(page => {
    router.get(page, (req, res) => {
      nextApp.render(req, res, page);
    });
  });

  router.use("/league/:id", authentication);

  router.get("/league/:id", (req, res) => {
    nextApp.render(req, res, "/league", { id: req.params.id });
  });

  router.use("/admin", authentication);

  router.use("/admin", async (req, res, next) => {
    const admin = await checkAdmin(req.user);

    if (admin) {
      next(null, req.user);
    } else {
      res.redirect("/");
    }
  });

  adminPages.forEach(page => {
    router.get(`/admin${page}`, (req, res) => {
      nextApp.render(req, res, `/admin${page}`);
    });
  });

  router.get("/reset-password", (req, res) => {
    nextApp.render(req, res, "/reset-password", { token: req.query.token });
  });

  router.get("/verify", (req, res) => {
    nextApp.render(req, res, "/verify", { token: req.query.token });
  });

  router.get("*", (req, res) => {
    return handle(req, res);
  });
});

export default router;
