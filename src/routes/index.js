import { Router } from "express";
const api = Router();

import user from "./user";
import pages from "./pages";
import group from "./group";
import players from "./players";
import teams from "./teams";
import admin from "./admin";

api.use("/user", user);
api.use("/groups", group);
api.use("/players", players);
api.use("/teams", teams);

export default {
  api,
  pages,
  admin
};
