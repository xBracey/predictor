import models, { sequelize } from "../models";

const groups = [
  {
    number: "A"
  },
  {
    number: "B"
  },
  {
    number: "C"
  },
  {
    number: "D"
  },
  {
    number: "E"
  },
  {
    number: "F"
  }
];

const group = async () => {
  await models.Group.bulkCreate(groups);
};

export default group;
