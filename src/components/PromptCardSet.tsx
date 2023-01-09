import React from "react";
import PromptCard from "./PromptCard";
import styled from "styled-components";

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
  return <ContainerDiv>{prompt.map(MapFn)}</ContainerDiv>;
};

//
// function PromptEx ({prompt}: PromptCardSetProps) {
//     return <div>
//         {prompt.map((current) => <PromptCard prompt={current} />)}
//     </div>
// }

export default PromptCardSet;
