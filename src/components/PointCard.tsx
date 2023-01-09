import React from "react";
import styled from "styled-components";
import { Font } from "./Font";

interface PointCardStyleProps {
    isCorrect?: boolean;
}

export const TeamA = styled(Font)<PointCardStyleProps>`
  border-radius: 5px;
  border: 1px solid #e8e8e8;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  color: #333;
  height: 72px;
  font-size: 1.2em;
  margin: 0.5em;
  padding: 0.5em;
  text-align: center;
  width: 100px;
  align-self: center;
  display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #e5e5f7;
  background-image: repeating-radial-gradient(
      circle at 0 0,
      transparent 0,
      #e5e5f7 10px
    ),
  repeating-linear-gradient(#444cf755, #444cf7);
  box-shadow: ${props => {
      switch (props.isCorrect) {
        case true:
            return "0 0 20px #4f4"; // green color : #44f
        case false:
            return "0 0 20px #f44"; // red
        default:
            return "none";
        }
    }
  };
`


export const TeamB = styled(TeamA)`
  background-color: #e5e5f7;
  background-image: linear-gradient(135deg, #0a30c9 25%, transparent 25%),
    linear-gradient(225deg, #0a30c9 25%, transparent 25%),
    linear-gradient(45deg, #0a30c9 25%, transparent 25%),
    linear-gradient(315deg, #0a30c9 25%, #e5e5f7 25%);
  background-position: 12px 0, 12px 0, 0 0, 0 0;
  background-size: 12px 12px;
`;

const PointText = styled.p`
  color: #000000;
  font-size: 1.2em;
  font-weight: bold;
  background-color: #ffffff;
  border-radius: 5px;
  text-align: center;
  padding: 0.5em;
  margin: 0.5em;
  width: calc(100% - 2em);

`;

interface PointCardProps {
  point: number;
  isHost: boolean;
  isCorrect?: boolean;

}


const PointCard: React.FC<PointCardProps> = ({ point, isHost, isCorrect }) => {

  // isCorrect ? glow = "WIN" : glow = "LOSE"

  return isHost ? (
    <TeamB isCorrect={isCorrect} >
      <PointText>{point}</PointText>
    </TeamB>
  ) : (
    <TeamA isCorrect={isCorrect}>
      <PointText>{point}</PointText>
    </TeamA>
  );
};

export default PointCard;
