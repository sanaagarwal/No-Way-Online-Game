import React from "react";
import styled from "styled-components";

const CardDiv = styled.pre`
border: red 1px solid;
  display: flex;
  justify-content: center;
  background: #1ea7fd;
`
interface PromptCardProps {prompt : string}

const PromptCard: React.FC<PromptCardProps> = ({prompt}) => {
    return <CardDiv>
        {prompt}
    </CardDiv>
}

export default PromptCard