import user from "./user";
import group from "./group";
import team from "./team";
import league from "./league";
import user_league from "./user_league";
import player from "./player";
import rule from "./rule";
import group_match from "./group_match";
import league_rule from "./league_rule";
import group_predictions from "./group_prediction";

const seeds = async () => {
  await user();
  await group();
  await team();
  await league();
  await user_league();
  await player();
  await rule();
  await league_rule();
  await group_match();
  await group_predictions();
};

export default seeds;
