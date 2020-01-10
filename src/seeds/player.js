import models, { sequelize } from "../models";

const players = [
  {
    name: "Harry Kane",
    teamName: "England"
  },
  {
    name: "Kylian Mbappe",
    teamName: "France"
  },
  {
    name: "Toni Kroos",
    teamName: "Germany"
  },
  {
    name: "Romelu Lukaku",
    teamName: "Belgium"
  },
  {
    name: "Memphis Depay",
    teamName: "Netherlands"
  },
  {
    name: "Cristiano Ronaldo",
    teamName: "Portugal"
  }
];

const player = async () => {
  await models.Player.bulkCreate(players);
};

export default player;
