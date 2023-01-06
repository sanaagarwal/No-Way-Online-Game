import React from "react";
import PromptCardSet from "./PromptCardSet";
import PointCardSet from "./PointCardSet";
import styled from "styled-components";
import {Centering} from "./Centering";
import {Voting} from "./Voting";

const ThreeColumnDiv = styled.div`
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    //grid-template-rows: repeat(5, 1fr);
    grid-column-gap: 5px;
    grid-row-gap: 10px;
    justify-content: center;
    max-width: 550px;
  
`


interface GameProps {
    prompt : string[]
    onEndTurn: (scores: number[]) => void  // TODO: This should be a callback to the game logic
    playing: boolean    // true if revealed and scored and stuff, false if not revealed and player is still guessing locally
    revealed?: {
        pointsA: number[]
        pointsB: number[]
        scoresA: number
        scoresB: number
    }
    isHost: boolean   // true if host (who is player A), false if not host (who is player B)
}



const Game: React.FC<GameProps> = ({prompt, onEndTurn, playing, revealed, isHost}) => {

    const myExampleFunction = (n: number) => {
        if(n == 1){
            console.log("ily sana")
        }else{
            console.log("ur cute")
        }
    }
    const myExampleFunction2 = (n: number) => {console.log(n)}


    return <Centering>
        {/*<ThreeColumnDiv>*/}
        {/*    <PromptCardSet prompt={prompt}  />*/}
        {/*</ThreeColumnDiv>*/}
        <button onClick={() => {onEndTurn([])}}>Test 2</button>

        <Voting name={"sana"} fn={myExampleFunction}></Voting>
        <Voting name={"sana"} fn={myExampleFunction2}></Voting>
        {playing && !revealed && <p>Error!</p>}

        {playing && revealed ? <div>
                <ThreeColumnDiv>
                    <PointCardSet point={revealed.pointsA} />
                    <PromptCardSet prompt={prompt}  />
                    <PointCardSet point={revealed.pointsB} />
                </ThreeColumnDiv>
            <div>Team A: {revealed?.scoresA}</div>
        </div>
        : <div>
                <PromptCardSet prompt={prompt}  />
        </div>}



    </Centering>
}

export default Game