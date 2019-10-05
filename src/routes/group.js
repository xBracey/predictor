import { Router } from "express";
import models, { sequelize } from "../models";

const router = Router();

const createGroup = async ({ number }) => {
  return await models.Group.create({ number });
};

const getAllGroups = async () => {
  return await models.Group.findAll();
};

const deleteGroup = async number => {
  return await models.Group.destroy({
    where: {
      number
    }
  });
};

router.get("/", function(req, res) {
  if (req.user) {
    getAllGroups().then(groups => {
      return res.json(groups);
    });
  } else {
    return res.status(401).send("Unauthorised");
  }
});

router.post("/", function(req, res) {
  if (req.user && req.user.admin && req.body.number) {
    createGroup(req.body.number).then(group => {
      return res.json(group);
    });
  } else if (!req.body.number) {
    return res.status(400).send("Wrong Data");
  } else {
    return res.status(401).send("Unauthorised");
  }
});

router.delete("/", function(req, res) {
  if (req.user && req.user.admin && req.body.number) {
    deleteGroup(req.body.number).then(group => {
      return res.json(group);
    });
  } else if (!req.body.number) {
    return res.status(400).send("Wrong Data");
  } else {
    return res.status(401).send("Unauthorised");
  }
});

export default router;