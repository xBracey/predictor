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
      allowNull: false,
      unique: true
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
    },
    verification_token: {
      type: DataTypes.STRING
    },
    verification_expiry: {
      type: DataTypes.DATE
    },
    forgot_password_token: {
      type: DataTypes.STRING
    },
    forgot_password_expiry: {
      type: DataTypes.DATE
    }
  });

  User.associate = models => {
    User.belongsToMany(models.League, { through: models.User_League });
    User.belongsToMany(models.Group_Match, {
      through: models.Group_Prediction
    });
    User.belongsToMany(models.Knockout_Match, {
      through: models.Knockout_Prediction
    });
    User.belongsToMany(models.Rule, { through: models.Rule_Prediction });
  };

  return User;
};

export default user;
