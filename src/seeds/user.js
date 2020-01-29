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
  },
  {
    username: "JBrace",
    password: "$2b$10$KM8VTwT5uuQe.GCHs1P69.S4L304uxJOo8ODG90fbDETM4IgB5vAO",
    email: "james.h.brace@gmail.com",
    name: "James Brace",
    verified: true,
    admin: true
  }
];

const user = async () => {
  await models.User.bulkCreate(users);
};

export default user;
