import user from "./user";
import group from "./group";
import team from "./team";
import group_match from "./group_matches";
import league from "./league";
import user_league from "./user_league";
import player from "./player";

const seeds = async () => {
  await user();
  await group();
  await team();
  await group_match();
  await league();
  await user_league();
  await player();
};

export default seeds;
