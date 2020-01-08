import express, { Router } from "express";
import path from "path";

const router = Router();
const outDirectoy = __dirname + "/../../out/";

// Serve static files from the React app
router.use(express.static(path.join(outDirectoy)));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
router.get("/", (req, res) => {
  res.sendFile(path.join(outDirectoy + "index.html"));
});

router.get("/register", (req, res) => {
  res.sendFile(path.join(outDirectoy + "register.html"));
});

router.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
});

router.get("/buzz", (req, res) => {
  if (req.user) {
    res.sendFile(path.join(outDirectoy + "buzz.html"));
  } else {
    res.redirect("/");
  }
});

router.get("*", (req, res) => {
  res.sendFile(path.join(outDirectoy + "404.html"));
});

export default router;
