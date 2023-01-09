import React, { useEffect } from "react";
import styled from "styled-components";
import InputPoint from "./InputPoint";
import { GiPointyHat } from "react-icons/gi";
import PointCard, { TeamA, TeamB } from "./PointCard";
import {EmptyHat} from "./EmptyHat";
import Confetti from 'react-confetti'


export const PlayerOfHonorIcon = styled(GiPointyHat)`
  color: #ffffff;
  font-size: 4em;
`;

interface VotingProps {
  numberOfPrompts: number;
  onSubmit: (pointAssortment: number[]) => void;
  isHost: boolean;
  playerOfHonor: boolean;
  point?: number[];
  isFlipped?: boolean;
  correctGuesses?: boolean[]
}

const ContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
`;

const StyledButton = styled.button`
  background-color: #f5f5f5;
  border-radius: 5px;
  border: 1px solid #000000;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  color: #333;
  font-family: monospace;
  font-size: 1.2em;
  margin: auto;
  padding: 0.5em;
  width: 50%;
  text-align: center;
  align-self: center;
  cursor: pointer;
  transition: 0.2s;
  position: initial;

  &:hover {
    background-color: #e8e8e8;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    scale: 1.1;
    transition: 0.2s;
  }

  &:disabled {
    background-color: #e8e8e8;
    opacity: 0.5;
    cursor: not-allowed;

    &:hover {
      scale: 0.9;
    }

    scale: 0.9;
    transition: 0.2s;
  }
`;

export const Voting: React.FC<VotingProps> = ({
  numberOfPrompts,
  onSubmit,
  isHost,
  playerOfHonor,
  point,
  isFlipped,
  correctGuesses
}) => {
  const [pointAssortment, setPointAssortment] = React.useState<number[]>(
    new Array(numberOfPrompts).fill(0)
  );
  const [buttonClick, setButtonClick] = React.useState<boolean>(false);

  useEffect(() => {
    setPointAssortment(new Array(numberOfPrompts).fill(0));
    setButtonClick(false);
  }, [numberOfPrompts, point, isFlipped]);

  const Hat = playerOfHonor === isHost ? PlayerOfHonorIcon : EmptyHat;

  // point card
  if (point && correctGuesses) {
    // const MapFn = (current: number) => (
    //   <PointCard point={current} isHost={isHost}/>
    // );
    return (
      <ContainerDiv>
        <Hat />
        {correctGuesses.map((correctGuess: boolean, index: number) => {
          return (
            <PointCard point={point[index]} isHost={isHost} isCorrect={correctGuess} />
            )
        })}
        {correctGuesses.every(Boolean) && <Confetti/>}
      </ContainerDiv>
    );
  }

  if (isFlipped) {
    const MapFn = () => {
      return isHost ? <TeamB /> : <TeamA />;
    };
    return (
      <ContainerDiv>
        <Hat />
        {Array(numberOfPrompts).fill(0).map(MapFn)}
      </ContainerDiv>
    );
  }

  // input point card
  return (
    <>
      <ContainerDiv>
        <Hat />
        {pointAssortment.map((current: number, index: number) => (
          <InputPoint
            maxValue={numberOfPrompts}
            point={current}
            sendPoint={(point: number) => {
              pointAssortment[index] = point;
              setPointAssortment(Object.assign([], pointAssortment));
            }}
            isHost={isHost}
            playerOfHonor={playerOfHonor}
          />
        ))}
        <StyledButton
          style={
            buttonClick
              ? { backgroundColor: "#b0ffb0" }
              : { backgroundColor: "#f5f5f5" }
          }
          onClick={() => {
            onSubmit(pointAssortment);
            setButtonClick(true);
          }}
          disabled={
            pointAssortment.includes(0) ||
            !pointAssortment.every(
              (value: number) =>
                pointAssortment.indexOf(value) ===
                pointAssortment.lastIndexOf(value)
            )
          }
        >
          {buttonClick ? "✔️Submitted" : "Submit"}
        </StyledButton>
      </ContainerDiv>
    </>
  );
};
