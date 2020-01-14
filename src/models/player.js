const player = (sequelize, DataTypes) => {
  const Player = sequelize.define("player", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Player.associate = models => {
    Player.belongsTo(models.Team);
  };

  return Player;
};

export default player;
