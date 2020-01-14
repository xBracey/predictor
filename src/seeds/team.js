import models, { sequelize } from "../models";

export const teams = [
  {
    name: "Turkey",
    groupNumber: "A"
  },
  {
    name: "Italy",
    groupNumber: "A"
  },
  {
    name: "Wales",
    groupNumber: "A"
  },
  {
    name: "Switzerland",
    groupNumber: "A"
  },
  {
    name: "Denmark",
    groupNumber: "B"
  },
  {
    name: "Finland",
    groupNumber: "B"
  },
  {
    name: "Belgium",
    groupNumber: "B"
  },
  {
    name: "Russia",
    groupNumber: "B"
  },
  {
    name: "Netherlands",
    groupNumber: "C"
  },
  {
    name: "Ukraine",
    groupNumber: "C"
  },
  {
    name: "Austria",
    groupNumber: "C"
  },
  {
    name: "Kosovo",
    groupNumber: "C"
  },
  {
    name: "England",
    groupNumber: "D"
  },
  {
    name: "Croatia",
    groupNumber: "D"
  },
  {
    name: "Norway",
    groupNumber: "D"
  },
  {
    name: "Czech Republic",
    groupNumber: "D"
  },
  {
    name: "Spain",
    groupNumber: "E"
  },
  {
    name: "Sweden",
    groupNumber: "E"
  },
  {
    name: "Poland",
    groupNumber: "E"
  },
  {
    name: "Republic of Ireland",
    groupNumber: "E"
  },
  {
    name: "Iceland",
    groupNumber: "F"
  },
  {
    name: "Portugal",
    groupNumber: "F"
  },
  {
    name: "France",
    groupNumber: "F"
  },
  {
    name: "Germany",
    groupNumber: "F"
  }
];

const team = async () => {
  await models.Team.bulkCreate(teams);
};

export default team;
