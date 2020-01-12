const rule_prediction = (sequelize, DataTypes) => {
  const Rule_Prediction = sequelize.define("rule_prediction", {
    value: {
      type: DataTypes.INTEGER,
      defaultValue: false
    }
  });

  return Rule_Prediction;
};

export default rule_prediction;
