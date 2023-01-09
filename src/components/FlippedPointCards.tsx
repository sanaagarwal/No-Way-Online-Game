import { TeamA, TeamB } from "./PointCard";
import { ContainerDiv } from "./PointCardSet";
import React from "react";

interface FlippedPointCardSetProps {
  isHost: boolean;
  numberOfCards: number;
}

const FlippedPointCardSet: React.FC<FlippedPointCardSetProps> = ({
  isHost,
  numberOfCards,
}) => {
  const MapFn = () => {
    return isHost ? <TeamB /> : <TeamA />;
  };
  return <ContainerDiv>{Array(numberOfCards).fill(0).map(MapFn)}</ContainerDiv>;
};

export default FlippedPointCardSet;
