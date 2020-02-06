const group_prediction = (sequelize, DataTypes) => {
  const Group_Prediction = sequelize.define("group_prediction", {
    homeGoals: {
      type: DataTypes.INTEGER
    },
    awayGoals: {
      type: DataTypes.INTEGER
    }
  });

  return Group_Prediction;
};

export default group_prediction;
