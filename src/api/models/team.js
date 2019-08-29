const team = (sequelize, DataTypes) => {
  const Team = sequelize.define("team", {
    name: {
      type: DataTypes.STRING,
      primaryKey: true
    }
  });

  Team.associate = models => {
    Team.belongsTo(models.Group);
    Team.hasMany(models.Player);
  };

  return Team;
};

export default team;
