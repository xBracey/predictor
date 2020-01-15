const knockout_match = (sequelize, DataTypes) => {
  const Knockout_Match = sequelize.define("knockout_match", {
    homeGoals: {
      type: DataTypes.INTEGER
    },
    awayGoals: {
      type: DataTypes.INTEGER
    },
    date: {
      type: DataTypes.DATE
    },
    homeWin: {
      type: DataTypes.BOOLEAN
    }
  });

  Knockout_Match.associate = models => {
    Knockout_Match.belongsTo(models.Team, { as: "homeTeam" });
    Knockout_Match.belongsTo(models.Team, { as: "awayTeam" });
    Knockout_Match.belongsToMany(models.User, {
      through: models.Knockout_Prediction
    });
  };

  return Knockout_Match;
};

export default knockout_match;
