import user from "./user";
import group from "./group";
import team from "./team";
import league from "./league";
import user_league from "./user_league";
import player from "./player";
import rule from "./rule";

const seeds = async () => {
  await user();
  await group();
  await team();
  await league();
  await user_league();
  await player();
  await rule();
};

export default seeds;
