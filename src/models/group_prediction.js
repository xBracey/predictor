const group_prediction = (sequelize, DataTypes) => {
  const Group_Prediction = sequelize.define("group_prediction", {
    homeGoals: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    awayGoals: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  return Group_Prediction;
};

export default group_prediction;
