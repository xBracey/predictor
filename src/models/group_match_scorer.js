const group_match_scorer = (sequelize, DataTypes) => {
  const Group_Match_Scorer = sequelize.define("group_match_scorer");
  return Group_Match_Scorer;
};

export default group_match_scorer;
