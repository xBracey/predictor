const league = (sequelize, DataTypes) => {
  const League = sequelize.define("league", {
    leagueName: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    displayName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  League.associate = models => {
    League.belongsToMany(models.User, { through: models.User_League });
    League.belongsToMany(models.Rule, { through: models.League_Rule });
  };

  return League;
};

export default league;
