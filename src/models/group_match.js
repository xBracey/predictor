const group_match = (sequelize, DataTypes) => {
  const Group_Match = sequelize.define("group_match", {
    homeGoals: {
      type: DataTypes.INTEGER
    },
    awayGoals: {
      type: DataTypes.INTEGER
    }
  });

  Group_Match.associate = models => {
    Group_Match.belongsTo(models.Group);
    Group_Match.belongsTo(models.Team, { as: "homeTeam" });
    Group_Match.belongsTo(models.Team, { as: "awayTeam" });
    Group_Match.belongsToMany(models.Player, {
      through: models.Group_Match_Scorer
    });
    Group_Match.belongsToMany(models.User, {
      through: models.Group_Prediction
    });
  };

  return Group_Match;
};

export default group_match;
