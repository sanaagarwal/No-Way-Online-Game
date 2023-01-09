import React from "react";
import PromptCardSet from "./PromptCardSet";
import PointCardSet from "./PointCardSet";
import styled from "styled-components";
import { Centering } from "./Centering";
import { PlayerOfHonorIcon, Voting } from "./Voting";
import FlippedPointCardSet from "./FlippedPointCards";

const ThreeColumnDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  //grid-template-rows: repeat(5, 1fr);
  grid-column-gap: 5px;
  grid-row-gap: 10px;
  justify-content: center;
  max-width: 600px;
  align-items: start;
`;

interface GameProps {
  prompt: string[];
  onEndTurn: (scores: number[]) => void;
  playing: boolean; // true if revealed and scored and stuff, false if not revealed and player is still guessing locally
  revealed?: {
    pointsA: number[];
    pointsB: number[];
    scoresA: number;
    scoresB: number;
  };
  isHost: boolean; // true if host (who is player A), false if not host (who is player B)

  playerOfHonor: boolean;
}

const Game: React.FC<GameProps> = ({
  prompt,
  onEndTurn,
  playing,
  revealed,
  isHost,
  playerOfHonor,
}) => {
  // const myExampleFunction = (n: number) => {
  //     if(n == 1){
  //         console.log("ily sana")
  //     }else{
  //         console.log("ur cute")
  //     }
  // }
  // const myExampleFunction2 = (n: number) => {console.log(n)}

  return (
    <Centering>
      {playing && !revealed && <p>Error!</p>}

      {playing && revealed ? (
        <div>
          <ThreeColumnDiv>
            <PointCardSet point={revealed.pointsB} isHost={false} />
            <PromptCardSet prompt={prompt} />
            <PointCardSet point={revealed.pointsA} isHost={true} />
          </ThreeColumnDiv>
        </div>
      ) : (
        <div>
          {isHost ? (
            <ThreeColumnDiv>
              <FlippedPointCardSet
                numberOfCards={prompt.length}
                isHost={true}
              />
              <PromptCardSet prompt={prompt} />
              <Voting
                numberOfPrompts={prompt.length}
                onSubmit={onEndTurn}
                isHost={isHost}
                playerOfHonor={playerOfHonor}
              />
            </ThreeColumnDiv>
          ) : (
            <ThreeColumnDiv>
              <Voting
                numberOfPrompts={prompt.length}
                onSubmit={onEndTurn}
                isHost={isHost}
                playerOfHonor={playerOfHonor}
              />
              <PromptCardSet prompt={prompt} />
              <FlippedPointCardSet
                numberOfCards={prompt.length}
                isHost={false}
              />
            </ThreeColumnDiv>
          )}
        </div>
      )}
    </Centering>
  );
};

export default Game;
