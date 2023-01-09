import React, { useEffect } from "react";
import "./App.css";
import Game from "./components/Game";
import promptList from "./components/PromptList";
import styled from "styled-components";
import { GiAngelOutfit } from "react-icons/gi";
import background from "./images/TABLE_BG.jpeg";


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
  `

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
}

function App() {
  const [state, setState] = React.useState<GameState>({
    gameStage: "START_GAME",
    startIdx: 0,
    count: 0,
    votesHost: new Array(5).fill(0),
    votesOther: new Array(5).fill(0),
    playerOfHonor: true,
  });

  const {
    count,
    startIdx,
    gameStage: gameState,
    votesHost,
    votesOther,
    playerOfHonor,
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
  //
  // useEffect(() => {
  //   if (count % 2 === 0) setStartIdx(startIdx + 5);
  // }, [count]);

  // const changeHonor = () => {
  //   setPlayerOfHonor(!playerOfHonor);
  // };

  // === setting up points ===

  return (
    <WoodTable>
      {gameState !== "START_GAME" ? (
        <>
          <Game
            prompt={prompts}
            onEndTurn={(points: number[]) => {
              console.log("0xDEADBEEF");
              if (gameState === "HOST_VOTING") {
                console.log("Incrementing count from onEndTurn");
                setState({
                  ...state,
                  votesHost: points,
                  gameStage: "PEER_VOTING",
                  count: count + 1,
                });
                console.log("Host count : " + count);
              } else if (gameState === "PEER_VOTING") {
                setState({
                  ...state,
                  votesOther: points,
                  gameStage: "VIEW_RESULTS",
                  count: count + 1,
                });
                console.log("Peer count : " + count);
              }
            }}
            playing={gameState === "VIEW_RESULTS"}
            isHost={gameState === "HOST_VOTING"}
            revealed={{
              pointsA: votesOther,
              pointsB: votesHost,
              scoresA: 0,
              scoresB: 0,
            }}
            playerOfHonor={playerOfHonor}
          />

          {gameState === "VIEW_RESULTS" && (
            <button onClick={nextRound}> Next Round </button>
          )}
        </>
      ) : (
        <GameButton
          onClick={() => {
            setState({ ...state, gameStage: "HOST_VOTING" });
          }}
        >
          Start Game
          <GiAngelOutfit />
        </GameButton>
      )}
    </WoodTable>
    // stage 1: A and B vote (one of them is the Player of Honor)
    // stage 2: A and B reveal, with a button to go to the next round
    // stage 3: A and B vote again, but this time the Player of Honor is the other person
    // stage 4: A and B reveal, with a button to go to the next round
    // stage 5: A and B vote again, but this time the Player of Honor is the other person and there are new prompts
  );
}

export default App;
