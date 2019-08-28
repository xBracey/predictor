const player = (sequelize, DataTypes) => {
  const Player = sequelize.define("player", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Player.associate = models => {
    Player.belongsTo(models.Team);
    Player.belongsToMany(models.Group_Match, {
      through: models.Group_Match_Scorer
    });
    Player.belongsToMany(models.Knockout_Match, {
      through: models.Knockout_Match_Scorer
    });
  };

  return Player;
};

export default player;
