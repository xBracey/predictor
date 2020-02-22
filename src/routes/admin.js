import express, { Router } from "express";
import path from "path";
import { checkAdmin } from "./user";

const router = Router();
const outDirectoy = __dirname + "/../../out/admin/";

router.use("/*", (req, res, next) => {
  const admin = await checkAdmin();
  if (admin) {
    next();
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

router.get("/groups/add", (req, res) => {
  res.sendFile(path.join(outDirectoy + "groups/add.html"));
});

router.get("/players", (req, res) => {
  res.sendFile(path.join(outDirectoy + "players.html"));
});

router.get("/players/add", (req, res) => {
  res.sendFile(path.join(outDirectoy + "players/add.html"));
});

router.get("/players/edit", (req, res) => {
  res.sendFile(path.join(outDirectoy + "players/edit.html"));
});

router.get("/teams", (req, res) => {
  res.sendFile(path.join(outDirectoy + "teams.html"));
});

router.get("/teams/add", (req, res) => {
  res.sendFile(path.join(outDirectoy + "teams/add.html"));
});

router.get("/teams/edit", (req, res) => {
  res.sendFile(path.join(outDirectoy + "teams/edit.html"));
});

router.get("/matches", (req, res) => {
  res.sendFile(path.join(outDirectoy + "matches.html"));
});

router.get("/matches/add", (req, res) => {
  res.sendFile(path.join(outDirectoy + "matches/add.html"));
});

router.get("/matches/edit", (req, res) => {
  res.sendFile(path.join(outDirectoy + "matches/edit.html"));
});

export default router;
