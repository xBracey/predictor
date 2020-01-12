import models, { sequelize } from "../models";

const rules = [
  {
    name: "Group Match - Correct Score",
    isScore: true,
    isGroup: false,
    isKnockout: false,
    isFinal: false
  },
  {
    name: "Group Match - Correct Score Difference",
    isScore: true,
    isGroup: false,
    isKnockout: false,
    isFinal: false
  },
  {
    name: "Group Match - Result",
    isScore: true,
    isGroup: false,
    isKnockout: false,
    isFinal: false
  },
  {
    name: "Group - Fully Correct Group",
    isScore: false,
    isGroup: true,
    isKnockout: false,
    isFinal: false
  },
  {
    name: "Group(Single Team) - Correct Place",
    isScore: false,
    isGroup: true,
    isKnockout: false,
    isFinal: false
  },
  {
    name: "Group(Single Team) - Qualified or not",
    isScore: false,
    isGroup: true,
    isKnockout: false,
    isFinal: false
  },
  {
    name: "Knockout Match - Correct Score",
    isScore: false,
    isGroup: false,
    isKnockout: true,
    isFinal: false
  },
  {
    name: "Knockout Match - Correct Score Difference",
    isScore: false,
    isGroup: false,
    isKnockout: true,
    isFinal: false
  },
  {
    name: "Knockout Match - Correct Result",
    isScore: false,
    isGroup: false,
    isKnockout: true,
    isFinal: false
  },
  {
    name: "Post Tournament - Euro 2020 Winner",
    isScore: false,
    isGroup: false,
    isKnockout: false,
    isFinal: true
  },
  {
    name: "Post Tournament - Golden Ball",
    isScore: false,
    isGroup: false,
    isKnockout: false,
    isFinal: true
  },
  {
    name: "Post Tournament - Golden Boot",
    isScore: false,
    isGroup: false,
    isKnockout: false,
    isFinal: true
  },
  {
    name: "Post Tournament - Golden Glove",
    isScore: false,
    isGroup: false,
    isKnockout: false,
    isFinal: true
  },
  {
    name: "Post Tournament - Young Player of the Tournament",
    isScore: false,
    isGroup: false,
    isKnockout: false,
    isFinal: true
  },
  {
    name: "Post Tournament - Silver Boot",
    isScore: false,
    isGroup: false,
    isKnockout: false,
    isFinal: true
  },
  {
    name: "Post Tournament - Bronze Boot",
    isScore: false,
    isGroup: false,
    isKnockout: false,
    isFinal: true
  }
];

const rule = async () => {
  await models.Rule.bulkCreate(rules);
};

export default rule;
