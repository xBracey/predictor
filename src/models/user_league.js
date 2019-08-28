const user_league = (sequelize, DataTypes) => {
  const User_League = sequelize.define("user_league", {
    admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });

  return User_League;
};

export default user_league;
