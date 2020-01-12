const rule = (sequelize, DataTypes) => {
  const Rule = sequelize.define("rule", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isScore: {
      type: DataTypes.BOOLEAN
    },
    isGroup: {
      type: DataTypes.BOOLEAN
    },
    isKnockout: {
      type: DataTypes.BOOLEAN
    },
    isFinal: {
      type: DataTypes.BOOLEAN
    }
  });

  Rule.associate = models => {
    Rule.belongsToMany(models.User, { through: models.Rule_Prediction });
    Rule.belongsToMany(models.League, { through: models.League_Rule });
  };

  return Rule;
};

export default rule;
