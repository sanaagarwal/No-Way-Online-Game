import React, { useEffect } from "react";
import "./App.css";
import Game from "./components/Game";
import promptList from "./components/PromptList";
import styled from "styled-components";
import { GiAngelOutfit } from "react-icons/gi";
import background from "./images/TABLE_BG.jpeg";
import GameInfo from "./components/GameInfo";

const shuffle = (array: any[]) => {
  let currentIndex = array.length,
    randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
};

const WoodTable = styled.div`
  border-radius: 5px;
  background-image: url(${background});
  background-size: cover;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
`;

const GameButton = styled.button`
  background-color: #100c0b; /* Green */
  border: 1px solid #020000;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
`;

const useShuffle = (array: any[]) => {
  const [shuffledArray, setShuffledArray] = React.useState(array);
  useEffect(() => {
    setShuffledArray(shuffle(array));
  }, [array]);
  return shuffledArray;
};

type GameStage = "START_GAME" | "HOST_VOTING" | "PEER_VOTING" | "VIEW_RESULTS";

interface GameState {
  gameStage: GameStage;
  startIdx: number;
  count: number;
  votesHost: number[];
  votesOther: number[];
  playerOfHonor: boolean;
  scoresHost: number;
  scoresOther: number;
  correctGuesses: boolean[];
}

const scoreCalculation = (
  playerOfHonorCards: number[],
  guessCards: number[]
): number => {
  let score = 0;

  for (let i = 0; i < playerOfHonorCards.length; i++) {
    if (playerOfHonorCards[i] === guessCards[i]) {
      score += 1;
    }
  }
  return score === 5 ? (score += 1) : score;
};

const glowGuesses = (
  playerOfHonorCards: number[],
  guessCards: number[]
): boolean[] => {
  let correctGuesses: boolean[] = [];

  for (let i = 0; i < playerOfHonorCards.length; i++) {
    if (playerOfHonorCards[i] === guessCards[i]) {
      correctGuesses.push(true);
    } else {
      correctGuesses.push(false);
    }
  }
  return correctGuesses;
};

function App() {
  const [state, setState] = React.useState<GameState>({
    gameStage: "START_GAME",
    startIdx: 0,
    count: 0,
    votesHost: new Array(5).fill(0),
    votesOther: new Array(5).fill(0),
    playerOfHonor: true,
    scoresHost: 0,
    scoresOther: 0,
    correctGuesses: [],
  });

  const {
    count,
    startIdx,
    gameStage: gameState,
    votesHost,
    votesOther,
    playerOfHonor,
    scoresHost,
    scoresOther,
    correctGuesses,
  } = state;

  const setStartIdx = (startIdx: number) => {
    setState({ ...state, startIdx });
  };

  // === setting up prompts ===
  const ourPlist = useShuffle(promptList);
  const prompts = ourPlist.slice(startIdx, startIdx + 5);
  if (startIdx + 5 > ourPlist.length) {
    setStartIdx(0);
  }

  const nextRound = () => {
    setState({
      ...state,
      gameStage: "HOST_VOTING",
      playerOfHonor: !playerOfHonor,
      startIdx: count % 4 === 0 ? startIdx + 5 : startIdx,
    });
  };

  const [infoDisplay, setInfoDisplay] = React.useState(false);

  return (
    <WoodTable>
      {gameState !== "START_GAME" ? (
        <>
          <Game
            prompt={prompts}
            onEndTurn={(points: number[]) => {
              if (gameState === "HOST_VOTING") {
                setState({
                  ...state,
                  votesHost: points,
                  gameStage: "PEER_VOTING",
                  count: count + 1,
                });
              } else if (gameState === "PEER_VOTING") {
                setState({
                  ...state,
                  votesOther: points,
                  gameStage: "VIEW_RESULTS",
                  count: count + 1,
                  scoresOther:
                    scoresOther +
                    (playerOfHonor ? scoreCalculation(votesHost, points) : 0),
                  scoresHost:
                    scoresHost +
                    (playerOfHonor ? 0 : scoreCalculation(points, votesHost)),
                  correctGuesses: glowGuesses(votesHost, points),
                });
              }
            }}
            playing={gameState === "VIEW_RESULTS"}
            isHost={gameState === "HOST_VOTING"}
            revealed={{
              pointsOther: votesOther,
              pointsHost: votesHost,
              scoresHost: scoresHost,
              scoresOther: scoresOther,
            }}
            playerOfHonor={playerOfHonor}
            correctGuesses={correctGuesses}
          />

          {gameState === "VIEW_RESULTS" && (
            <button onClick={nextRound}> Next Round </button>
          )}
        </>
      ) : (
        <>
          <GameButton
            onClick={() => {
              setState({ ...state, gameStage: "HOST_VOTING" });
            }}
          >
            Start Game
            <GiAngelOutfit />
          </GameButton>
          <GameButton
            onClick={() => {
              setInfoDisplay(true);
            }}
          >
            Rules
          </GameButton>
          {infoDisplay ? (
            <GameInfo onClose={() => setInfoDisplay(false)} />
          ) : null}
        </>
      )}
    </WoodTable>
  );
}

export default App;
