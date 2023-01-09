import React from "react";
import PromptCardSet from "./PromptCardSet";
import styled from "styled-components";
import { Centering } from "./Centering";
import { Voting } from "./Voting";

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

      <ThreeColumnDiv>
        <Voting
          numberOfPrompts={prompt.length}
          onSubmit={onEndTurn}
          isHost={true}
          playerOfHonor={playerOfHonor}
          isFlipped={!playing && !isHost}
          point={!playing ? undefined : revealed?.pointsA}
        />
        <PromptCardSet prompt={prompt} />
        <Voting
            numberOfPrompts={prompt.length}
            onSubmit={onEndTurn}
            isHost={false}
            playerOfHonor={playerOfHonor}
            isFlipped={!playing && isHost}
            point={!playing ? undefined: revealed?.pointsB}
        />
      </ThreeColumnDiv>

      {/*{playing && revealed ? (*/}
      {/*  <div>*/}
      {/*    <ThreeColumnDiv>*/}
      {/*      <Voting numberOfPrompts={revealed.pointsB.length} onSubmit={() => {}} point={revealed.pointsB} isHost={false} playerOfHonor={playerOfHonor} />*/}
      {/*      <PromptCardSet prompt={prompt} />*/}
      {/*      <Voting  numberOfPrompts={revealed.pointsA.length} onSubmit={() => {}} point={revealed.pointsA} isHost={true} playerOfHonor={playerOfHonor} />*/}
      {/*    </ThreeColumnDiv>*/}
      {/*  </div>*/}
      {/*) : (*/}
      {/*  <div>*/}
      {/*    {isHost ? (*/}
      {/*      <ThreeColumnDiv>*/}
      {/*        <Voting  numberOfPrompts={prompt.length} onSubmit={() => {}} point={[]} isHost={!isHost} playerOfHonor={playerOfHonor} isFlipped />*/}
      {/*        <PromptCardSet prompt={prompt} />*/}
      {/*        <Voting*/}
      {/*          numberOfPrompts={prompt.length}*/}
      {/*          onSubmit={onEndTurn}*/}
      {/*          isHost={isHost}*/}
      {/*          playerOfHonor={playerOfHonor}*/}
      {/*        />*/}
      {/*      </ThreeColumnDiv>*/}
      {/*    ) : (*/}
      {/*      <ThreeColumnDiv>*/}
      {/*        <Voting*/}
      {/*          numberOfPrompts={prompt.length}*/}
      {/*          onSubmit={onEndTurn}*/}
      {/*          isHost={isHost}*/}
      {/*          playerOfHonor={playerOfHonor}*/}
      {/*        />*/}
      {/*        <PromptCardSet prompt={prompt} />*/}
      {/*        <Voting  numberOfPrompts={prompt.length} onSubmit={() => {}} point={[]} isHost={!isHost} playerOfHonor={playerOfHonor} isFlipped />*/}
      {/*      </ThreeColumnDiv>*/}
      {/*    )}*/}
      {/*  </div>*/}
      {/*)}*/}
    </Centering>
  );
};

export default Game;
