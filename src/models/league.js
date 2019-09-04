const league = (sequelize, DataTypes) => {
  const League = sequelize.define("league", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  League.associate = models => {
    League.belongsToMany(models.User, { through: models.User_League });
  };

  return League;
};

export default league;
