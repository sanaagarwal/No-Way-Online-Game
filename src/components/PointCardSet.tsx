import React from "react";
import PointCard from "./PointCard";
import styled from "styled-components";

const ContainerDiv = styled.div`
    display: flex;
    flex-direction: column;
    //justify-content: center;
    //align-items: center;
    //align-content: center;
`

interface PointCardSetProps {
    point : number[]
}

const PointCardSet: React.FC<PointCardSetProps> = ({point}) => {
    const MapFn = (current: number) => <PointCard point={current} />
    return <ContainerDiv>
        {point.map(MapFn)}
    </ContainerDiv>
}

//
// function PromptEx ({prompt}: PromptCardSetProps) {
//     return <div>
//         {prompt.map((current) => <PromptCard prompt={current} />)}
//     </div>
// }


export default PointCardSet