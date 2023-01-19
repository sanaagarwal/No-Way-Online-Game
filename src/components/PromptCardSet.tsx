import React from "react";
import PromptCard from "./PromptCard";
import styled from "styled-components";
import { EmptyHat } from "./EmptyHat";

const ContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
`;

interface PromptCardSetProps {
  prompt: string[];
}

const PromptCardSet: React.FC<PromptCardSetProps> = ({ prompt }) => {
  const MapFn = (current: string) => <PromptCard prompt={current} />;
  return (
    <ContainerDiv>
      {" "}
      <EmptyHat />
      {prompt.map(MapFn)}
    </ContainerDiv>
  );
};

export default PromptCardSet;
