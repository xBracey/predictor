import express, { Router } from "express";
import path from "path";

const router = Router();
const outDirectoy = __dirname + "/../../out/admin/";

router.use("/*", (req, res, next) => {
  if (req.user && req.user.admin) {
    next();
  } else if (!req.user) {
    return res.redirect("/");
  } else {
    return res.redirect("/buzz");
  }
});

router.get("/", (req, res) => {
  res.sendFile(path.join(outDirectoy + "../admin.html"));
});

router.get("/groups", (req, res) => {
  res.sendFile(path.join(outDirectoy + "groups.html"));
});

router.get("/groups/edit", (req, res) => {
  res.sendFile(path.join(outDirectoy + "groups/edit.html"));
});

router.get("/players", (req, res) => {
  res.sendFile(path.join(outDirectoy + "players.html"));
});

router.get("/players/edit", (req, res) => {
  res.sendFile(path.join(outDirectoy + "players/edit.html"));
});

router.get("/teams", (req, res) => {
  res.sendFile(path.join(outDirectoy + "teams.html"));
});

router.get("/teams/edit", (req, res) => {
  res.sendFile(path.join(outDirectoy + "teams/edit.html"));
});

export default router;
