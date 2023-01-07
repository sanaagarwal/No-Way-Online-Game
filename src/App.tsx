import React from 'react';
import logo from './logo.svg';
import './App.css';
import PromptCardSet from "./components/PromptCardSet";
import Game from "./components/Game";

function App() {

    const [votes, setVotes] = React.useState<number[]>([]);

  return (
        <Game prompt={["Hello", "World"]} onEndTurn={
            (scores: number[]) => {
                setVotes(scores);
            }
        } playing={true} isHost={false} revealed={{pointsA: votes, pointsB: [1,2,3], scoresA: 0, scoresB: 1}}/>
  );
}

export default App;
