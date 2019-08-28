import models, { sequelize } from "../models";

export const teams = [
  {
    name: "England",
    groupNumber: "A"
  },
  {
    name: "Czech Republic",
    groupNumber: "B"
  },
  {
    name: "Ukraine",
    groupNumber: "C"
  },
  {
    name: "Portugal",
    groupNumber: "D"
  },
  {
    name: "Ireland",
    groupNumber: "E"
  },
  {
    name: "Denmark",
    groupNumber: "F"
  },
  {
    name: "Hungary",
    groupNumber: "A"
  },
  {
    name: "Croatia",
    groupNumber: "B"
  },
  {
    name: "Spain",
    groupNumber: "C"
  },
  {
    name: "Sweden",
    groupNumber: "D"
  },
  {
    name: "Poland",
    groupNumber: "E"
  },
  {
    name: "Austria",
    groupNumber: "F"
  },
  {
    name: "France",
    groupNumber: "A"
  },
  {
    name: "Turkey",
    groupNumber: "B"
  },
  {
    name: "Belgium",
    groupNumber: "C"
  },
  {
    name: "Russia",
    groupNumber: "D"
  },
  {
    name: "Italy",
    groupNumber: "E"
  },
  {
    name: "Greece",
    groupNumber: "F"
  },
  {
    name: "Wales",
    groupNumber: "A"
  },
  {
    name: "Switzerland",
    groupNumber: "B"
  },
  {
    name: "Northern Ireland",
    groupNumber: "C"
  },
  {
    name: "Serbia",
    groupNumber: "D"
  },
  {
    name: "Germany",
    groupNumber: "E"
  },
  {
    name: "Netherlands",
    groupNumber: "F"
  }
];

const team = async () => {
  await models.Team.bulkCreate(teams);
};

export default team;
