import user from "./user";
import group from "./group";
import team from "./team";
import league from "./league";
import user_league from "./user_league";
import player from "./player";

const seeds = async () => {
  await user();
  await group();
  await team();
  await league();
  await user_league();
  await player();
};

export default seeds;
