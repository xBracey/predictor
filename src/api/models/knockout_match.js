const knockout_match = (sequelize, DataTypes) => {
  const Knockout_Match = sequelize.define("knockout_match", {
    home_goals: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    away_goals: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  Knockout_Match.associate = models => {
    Knockout_Match.belongsTo(models.Team, { as: "home_team_id" });
    Knockout_Match.belongsTo(models.Team, { as: "away_team_id" });
    Knockout_Match.belongsToMany(models.Player, {
      through: models.Knockout_Match_Scorer
    });
    Knockout_Match.belongsToMany(models.User, {
      through: models.Knockout_Prediction
    });
  };

  return Knockout_Match;
};

export default knockout_match;
