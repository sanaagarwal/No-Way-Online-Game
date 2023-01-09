import React from "react";
import PromptCardSet from "./PromptCardSet";
import styled from "styled-components";
import { Centering } from "./Centering";
import { Voting } from "./Voting";

const ThreeColumnDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
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
    pointsOther: number[];
    pointsHost: number[];
    scoresOther: number;
    scoresHost: number;
  };
  isHost: boolean; // true if host (who is player A), false if not host (who is player B)
  playerOfHonor: boolean;
  correctGuesses?: boolean[];
}

const Game: React.FC<GameProps> = ({
  prompt,
  onEndTurn,
  playing,
  revealed,
  isHost,
  playerOfHonor,
  correctGuesses,
}) => {

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
          point={!playing ? undefined : revealed?.pointsHost}
          correctGuesses={correctGuesses}
        />
        <PromptCardSet prompt={prompt} />
        <Voting
          numberOfPrompts={prompt.length}
          onSubmit={onEndTurn}
          isHost={false}
          playerOfHonor={playerOfHonor}
          isFlipped={!playing && isHost}
          point={!playing ? undefined : revealed?.pointsOther}
          correctGuesses={correctGuesses}
        />
      </ThreeColumnDiv>
    </Centering>
  );
};

export default Game;
