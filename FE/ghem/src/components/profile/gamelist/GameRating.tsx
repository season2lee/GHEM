import {
  TbSquareRoundedNumber1Filled,
  TbSquareRoundedNumber2Filled,
  TbSquareRoundedNumber3Filled,
  TbSquareRoundedNumber4Filled,
  TbSquareRoundedNumber5Filled,
  TbSquareRoundedNumber1,
  TbSquareRoundedNumber2,
  TbSquareRoundedNumber3,
  TbSquareRoundedNumber4,
  TbSquareRoundedNumber5,
} from "react-icons/tb";

type GameRatingProps = {
  rate: number;
};

function GameRating({ rate }: GameRatingProps) {
  return rate === 1 ? (
    <TbSquareRoundedNumber1Filled size="25" />
  ) : rate === 2 ? (
    <TbSquareRoundedNumber2Filled size="25" />
  ) : rate === 3 ? (
    <TbSquareRoundedNumber3Filled size="25" />
  ) : rate === 4 ? (
    <TbSquareRoundedNumber4Filled size="25" />
  ) : (
    <TbSquareRoundedNumber5Filled size="25" />
  );
}

export default GameRating;
