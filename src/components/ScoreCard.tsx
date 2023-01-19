import React from "react";
import styled from "styled-components";
import { Font } from "./Font";

const ScoreBox = styled(Font)<{ side: boolean }>`
  border-radius: 5px;
  border: 2px solid #100303;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  color: #333;
  height: 50px;
  font-size: 1.5em;
  margin: 0.5em;
  padding: 0.5em;
  text-align: center;
  width: 50px;
  align-self: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fcfcfc;
  background-image: repeating-radial-gradient(
    circle at 0 0,
    transparent 0,
    #ffffff 10px
  );
  position: fixed;
  top: 10px;
  right: ${(props) => (props.side ? "10px" : "unset")};
  left: ${(props) => (props.side ? "unset" : "10px")};
  )box-shadow: 1 px 1 px 2 px rgba(0, 0, 0, 0.1);
`;
interface ScoreCardProps {
  score: number;
  side: boolean;
}

const ScoreCard: React.FC<ScoreCardProps> = ({ score, side }) => {
  return (
    <>
      <ScoreBox side={side}>
        {" "}
        {score}
        {/*<input style={{width: "100%", height: "100%", position: "absolute", top: 0, left: 0, opacity: 0}}/>*/}
      </ScoreBox>
    </>
  );
};

export default ScoreCard;
