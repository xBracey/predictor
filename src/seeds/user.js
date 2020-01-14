import models, { sequelize } from "../models";

const users = [
  {
    username: "xBracey",
    password: "$2b$10$9Z.cV.rYcefrux//LpzfIuGK38r.UaQBXzbt.rD0WDuPWRmgzMwu2",
    email: "tommy-brace-22@hotmail.com",
    name: "Thomas Brace",
    verified: true,
    admin: true
  },
  {
    username: "xBracey2",
    password: "$2b$10$9Z.cV.rYcefrux//LpzfIuGK38r.UaQBXzbt.rD0WDuPWRmgzMwu2",
    email: "tommybrace@hotmail.co.uk",
    name: "Thomas Brace",
    verified: true,
    admin: true
  }
];

const user = async () => {
  await models.User.bulkCreate(users);
};

export default user;
