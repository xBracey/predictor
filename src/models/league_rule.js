const league_rule = (sequelize, DataTypes) => {
  const League_Rule = sequelize.define("league_rule", {
    points: {
      type: DataTypes.INTEGER,
      defaultValue: false
    }
  });

  return League_Rule;
};

export default league_rule;
