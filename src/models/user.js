const user = (sequelize, DataTypes) => {
  const User = sequelize.define("user", {
    username: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING
    },
    verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });

  User.associate = models => {
    User.belongsToMany(models.League, { through: models.User_League });
    User.belongsTo(models.Player, { as: "top_scorer_id" });
    User.belongsToMany(models.Group_Match, {
      through: models.Group_Prediction
    });
    User.belongsToMany(models.Knockout_Match, {
      through: models.Knockout_Prediction
    });
  };

  return User;
};

export default user;
