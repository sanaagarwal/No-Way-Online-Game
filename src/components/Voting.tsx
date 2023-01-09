import React from "react";
import styled from "styled-components";
import InputPoint from "./InputPoint";
import { GiPointyHat } from "react-icons/gi";

export const PlayerOfHonorIcon = styled(GiPointyHat)`
  color: #00deff;
  font-size: 4em;
`;

interface VotingProps {
  numberOfPrompts: number;
  onSubmit: (pointAssortment: number[]) => void;
  isHost: boolean;
  playerOfHonor: boolean;
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
}) => {
  const [pointAssortment, setPointAssortment] = React.useState<number[]>(
    new Array(numberOfPrompts).fill(0)
  );
  const [buttonClick, setButtonClick] = React.useState<boolean>(false);

  // [0,0,0,0,0] => [ [_0_],[_0_],[_2_],[_0_],[_0_] ]

  const mapFn = (current: number, index: number) => (
    <InputPoint
      maxValue={numberOfPrompts}
      point={current}
      sendPoint={(point: number) => {
        // input: point (which is the number which the user typed)
        // pointAssortment: previous points array
        // current: the point before the user typed in the new one
        // index: which box they typed it in
        pointAssortment[index] = point;
        setPointAssortment(Object.assign([], pointAssortment));
      }}
      isHost={isHost}
      playerOfHonor={playerOfHonor}
    />
  );

  return (
    <>
      <ContainerDiv>
        {pointAssortment.map(mapFn)}
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
              (value: number, index) =>
                pointAssortment.indexOf(value) ===
                pointAssortment.lastIndexOf(value)
            )
          }
        >
          {" "}
          {buttonClick ? "✔️Submitted" : "Submit"}{" "}
        </StyledButton>
      </ContainerDiv>
    </>
  );
};
