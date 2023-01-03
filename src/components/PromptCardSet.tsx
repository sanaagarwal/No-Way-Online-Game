import React from "react";
import PromptCard from "./PromptCard";

interface PromptCardSetProps {prompt : string[]}

const PromptCardSet: React.FC<PromptCardSetProps> = ({prompt}) => {
    const MapFn = (current: string) => <PromptCard prompt={current} />
    return <div>
        {prompt.map(MapFn)}
    </div>
}

//
// function PromptEx ({prompt}: PromptCardSetProps) {
//     return <div>
//         {prompt.map((current) => <PromptCard prompt={current} />)}
//     </div>
// }


export default PromptCardSet