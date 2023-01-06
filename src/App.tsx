import React from 'react';
import logo from './logo.svg';
import './App.css';
import PromptCardSet from "./components/PromptCardSet";
import Game from "./components/Game";

function App() {

    const [votes, setVotes] = React.useState<number[]>([]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Game prompt={[]} onEndTurn={
            (scores: number[]) => {
                setVotes(scores);
            }
        } playing={false} isHost={false} revealed={{pointsA: votes, pointsB: [], scoresA: 0, scoresB: 1}}/>
        <PromptCardSet  prompt={["Hello", "World"]} />
      </header>
    </div>
  );
}

export default App;
