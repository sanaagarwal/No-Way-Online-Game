import React from "react";
import Modal from "./Modal";
import styled from "styled-components";
import {GiPointyHat} from "react-icons/gi";

export const PlayerOfHonorIcon = styled(GiPointyHat)`
  color: #ffffff;
  font-size: 1.2em;
`;

interface GameInfoProps {
  onClose: (startGame: boolean) => void;
}

const GameInfo: React.FC<GameInfoProps> = ({ onClose }) => {
    const [pageIDX, setPageIDX] = React.useState(0);
    const pages =  [<ul style={{lineHeight: "9mm", fontSize: 21}}>
        <li> When you start the game, you will see a list of prompts.</li>
        <li> The objective of the game is to guess the other player's preferences and interests on a scale of 1
            to 5.
        </li>
        <li> The game starts with both the players ranking the preferences of the "Player of Honor" which is
            represented by the {" "}
            <PlayerOfHonorIcon/> {" "} icon for a given set of prompts.
        </li>
        <li> You must rank the preferences, where 1 means most preferred and 5 : least preferred.</li>
        <li> Once you are done ranking, click submit.</li>
        <li> You will see the cards glowing with green or red color depending on whether the answers match or
            not for that
            specific prompt.
        </li>
        <li> When you click on "Next Round", the other player now becomes the Player of Honor and you repeat the
            steps again,
            ranking the preferences of the player on the same set of prompts.
        </li>
        <li> Once both the players have been Player of Honor for the same set of prompts, the next round will
            give you new set of prompts, and you continue playing.
        </li>
        <li> The winner will be determined by whoever has the highest points. </li>
    </ul>,
        <>
        <p style={{lineHeight: "9mm", fontSize: 21}}> The points are calculated based on the following formula: </p>
        <ul style={{lineHeight: "9mm", fontSize: 21}}>
            <li> If the answer matches, you get 1 point.</li>
            <li> If the answer doesnt match, you get no points.</li>
            <li> If all the answers matches, you get an extra +1 point. </li>
        </ul>
    </>]

    const titles = ["Game Rules", "Points Calculation"]
    return (

                <Modal onClose={() => {onClose(false)}} title={titles[pageIDX]}>

                    {/*<button onClick={() => {*/}
                    {/*    App.setState({ ...state, gameStage: "HOST_VOTING" });*/}
                    {/*}}> Start Playing </button>*/}
                    {pages[pageIDX]}
                    {pageIDX === 0 && <button onClick={() => setPageIDX(pageIDX + 1)}>Next</button>}
                    {pageIDX === pages.length -1 && <button onClick={() => onClose(true)}>Play Now</button>}
                </Modal>
    );
}


export default GameInfo;
