const knockout_prediction = (sequelize, DataTypes) => {
  const Knockout_Prediction = sequelize.define("knockout_prediction", {
    home_goals: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    away_goals: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  return Knockout_Prediction;
};

export default knockout_prediction;
