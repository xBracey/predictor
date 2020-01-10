import express, { Router } from "express";
import path from "path";

const router = Router();
const outDirectoy = __dirname + "/../../out/";

import nextApp from "../";

// Serve static files from the React app
router.use(express.static(path.join(outDirectoy)));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
router.get("/", (req, res) => {
  nextApp.render(req, res, "/index");
});

router.get("/register", (req, res) => {
  nextApp.render(req, res, "/register");
});

router.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
});

router.get("/buzz", (req, res) => {
  if (req.user) {
    nextApp.render(req, res, "/buzz");
  } else {
    res.redirect("/");
  }
});

router.get("*", (req, res) => {
  res.sendFile(path.join(outDirectoy + "404.html"));
});

export default router;
