import { Router } from "express";
const api = Router();

import user from "./user";
import pages from "./pages";
import group from "./group";
import players from "./players";
import teams from "./teams";
import match from "./match";
import leagues from "./leagues";

api.use("/user", user);
api.use("/groups", group);
api.use("/players", players);
api.use("/teams", teams);
api.use("/match", match);
api.use("/leagues", leagues);

export default {
  api,
  pages
};
