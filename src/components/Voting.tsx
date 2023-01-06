import React from "react";

interface VotingProps {
    numberOfPrompts : number;
    onSubmit : (pointAssortment : number[]) => void;
}

export const Voting: React.FC<VotingProps> = ({numberOfPrompts, onSubmit}) => {
// style point boxes
    // provide inputs for numbers useState
    // https://stackoverflow.com/questions/55757761/handle-an-input-with-react-hooks

    // have a submit button to send the points back to the game
}