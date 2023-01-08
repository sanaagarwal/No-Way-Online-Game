import React from "react";
import styled from "styled-components";
import {Font} from "./Font";

export const TeamA = styled(Font)`
  border-radius: 5px;
  border: 1px solid #e8e8e8;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  color: #333;
  height: 72px;
  font-size: 1.2em;
  margin: 0.5em;
  padding: 0.5em;
  text-align: center;
  width: 100px;
  align-self: center;
  background-color: #e5e5f7;
  background-image:  repeating-radial-gradient( circle at 0 0, transparent 0, #e5e5f7 10px ), repeating-linear-gradient( #444cf755, #444cf7 );
`

export const TeamB = styled(TeamA)`
  background-color: #e5e5f7;
  background-image:  linear-gradient(135deg, #0a30c9 25%, transparent 25%), linear-gradient(225deg, #0a30c9 25%, transparent 25%), linear-gradient(45deg, #0a30c9 25%, transparent 25%), linear-gradient(315deg, #0a30c9 25%, #e5e5f7 25%);
  background-position:  12px 0, 12px 0, 0 0, 0 0;
  background-size: 12px 12px;
`

const PointText = styled.p`
    color: #000000;
    font-size: 1.2em;
    font-weight: bold;
    background-color: #ffffff;
    border-radius: 5px;
    padding: 0.5em;
    margin: 0.5em;
    text-align: center;
`


interface PointCardProps {
    point : number
    isHost: boolean
}

const PointCard: React.FC<PointCardProps> = ({point, isHost}) => {
    return isHost ?
        <TeamA> <PointText>{point}</PointText> </TeamA> :
        <TeamB> <PointText>{point}</PointText> </TeamB>
}


export default PointCard