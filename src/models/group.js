const group = (sequelize, DataTypes) => {
  const Group = sequelize.define("group", {
    number: {
      type: DataTypes.STRING(1),
      primaryKey: true
    }
  });

  Group.associate = models => {
    Group.hasMany(models.Team);
    Group.hasMany(models.Group_Match);
  };

  return Group;
};

export default group;
