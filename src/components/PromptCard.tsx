import React from "react";
import styled from "styled-components";

const CardDiv = styled.div`
    background-color: #f5f5f5;
    border-radius: 5px;
    border: 1px solid #e8e8e8;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    color: #333;
    font-family: monospace;
    font-size: 1.2em;
    margin: 0.5em;
    padding: 0.5em;
    text-align: center;
    width: 250px;
    align-self: center;
`
interface PromptCardProps {prompt : string}

const PromptCard: React.FC<PromptCardProps> = ({prompt}) => {
    return <CardDiv>
        {prompt}
    </CardDiv>
}

export default PromptCard