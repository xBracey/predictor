import models, { sequelize } from "../models";

export const teams = [
  {
    name: "Austria",
    groupNumber: "A"
  },
  {
    name: "Belgium",
    groupNumber: "A"
  },
  {
    name: "Croatia",
    groupNumber: "A"
  },
  {
    name: "Czech Republic",
    groupNumber: "A"
  },
  {
    name: "Denmark",
    groupNumber: "A"
  },
  {
    name: "England",
    groupNumber: "A"
  },
  {
    name: "Finland",
    groupNumber: "A"
  },
  {
    name: "France",
    groupNumber: "A"
  },
  {
    name: "Germany",
    groupNumber: "A"
  },
  {
    name: "Italy",
    groupNumber: "A"
  },
  {
    name: "Netherlands",
    groupNumber: "A"
  },
  {
    name: "Poland",
    groupNumber: "A"
  },
  {
    name: "Portugal",
    groupNumber: "A"
  },
  {
    name: "Russia",
    groupNumber: "A"
  },
  {
    name: "Spain",
    groupNumber: "A"
  },
  {
    name: "Sweden",
    groupNumber: "A"
  },
  {
    name: "Switzerland",
    groupNumber: "A"
  },
  {
    name: "Turkey",
    groupNumber: "A"
  },
  {
    name: "Ukraine",
    groupNumber: "A"
  },
  {
    name: "Wales",
    groupNumber: "A"
  }
];

const team = async () => {
  await models.Team.bulkCreate(teams);
};

export default team;
