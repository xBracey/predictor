import "dotenv/config";
import cors from "cors";
import express from "express";

import { sequelize } from "./models";
import routes from "./routes";
import seeds from "./seeds";
import { passportConfiguration } from "./passport";

const app = express();
const force = process.env.FORCE === "true";

passportConfiguration(app);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/robots.txt", function(req, res, next) {
  res.type("text/plain");
  res.send(
    "User-agent: *\nDisallow: \nSitemap: https://www.footybee.com/static/sitemap.xml"
  );
});

app.use("/api", routes.api);
app.use("/", routes.pages);

sequelize.sync({ force }).then(() => {
  if (force) {
    seeds();
  }

  app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}!`);
  });
});
