import React, {useEffect} from 'react';
import './App.css';
import Game from "./components/Game";
import promptList from "./components/PromptList";
import styled from "styled-components";

const shuffle = (array: any[]) => {
    let currentIndex = array.length, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
    return array;
}

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
`

const useShuffle = (array: any[]) => {
    const [shuffledArray, setShuffledArray] = React.useState(array);
    useEffect(() => {
        setShuffledArray(shuffle(array));
    }, [array]);
    return shuffledArray;
}


function App() {

    type GameStage = "START_GAME" | "HOST_VOTING" |  "PEER_VOTING" | "VIEW_RESULTS"

    // === game state ===
    const [gameState, setGameState] = React.useState<GameStage>("START_GAME");


    // === setting up prompts ===
    const [startIdx, setStartIdx] = React.useState(0);
    const ourPlist = useShuffle(promptList);
    const prompts = ourPlist.slice(startIdx, startIdx + 5);
    if (startIdx + 5 > ourPlist.length) {
        setStartIdx(0);
    }
    const clickHandler = () => {
        setStartIdx(startIdx + 5);
        setGameState("HOST_VOTING");
    }

    // === setting up points ===
    const [votesHost, setVotesHost] = React.useState<number[]>(new Array(prompts.length).fill(0));
    const [votesOther, setVotesOther] = React.useState<number[]>(new Array(prompts.length).fill(0));


    // === setting up game state ===
    // const [flipped, setFlipped] = React.useState<boolean>(false);


    return (
        <>
            {gameState !== "START_GAME" ?
                <>
                    <Game
                        prompt={prompts}
                        onEndTurn={
                            (points: number[]) => {
                                if(gameState === "HOST_VOTING") {
                                    // runs when PoH clicks submit (host)
                                    setVotesHost(points);
                                    setGameState("PEER_VOTING");
                                }else if(gameState === "PEER_VOTING") {
                                    // runs when PoH clicks submit (not host)
                                    setVotesOther(points);
                                    setGameState("VIEW_RESULTS");
                                }
                            }
                        }
                        playing={gameState === "VIEW_RESULTS" }
                        isHost={gameState === "HOST_VOTING"}
                        revealed={{pointsA: votesHost, pointsB: votesOther, scoresA: 0, scoresB: 0}}/>
                    {gameState === "VIEW_RESULTS" && <button onClick={clickHandler}> Next Round</button>}
                    {gameState === "VIEW_RESULTS" && <button onClick={clickHandler}> Change Player of Honor </button>}
                </>
                : <GameButton onClick={() => {setGameState("HOST_VOTING")}}> Start Game </GameButton>
            }

        </>
        // stage 1: A and B vote (one of them is the Player of Honor)
        // stage 2: A and B reveal, with a button to go to the next round
        // stage 3: A and B vote again, but this time the Player of Honor is the other person
        // stage 4: A and B reveal, with a button to go to the next round
        // stage 5: A and B vote again, but this time the Player of Honor is the other person and there are new prompts

    )
}

export default App;