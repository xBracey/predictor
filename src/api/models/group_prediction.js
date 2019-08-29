const group_prediction = (sequelize, DataTypes) => {
  const Group_Prediction = sequelize.define("group_prediction", {
    home_goals: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    away_goals: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  return Group_Prediction;
};

export default group_prediction;
