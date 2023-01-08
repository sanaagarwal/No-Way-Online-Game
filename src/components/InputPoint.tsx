import React from "react";
import styled from "styled-components";
import {TeamA, TeamB} from "./PointCard";

const Container = styled(TeamA)`
  
  &::placeholder {
    color: rgba(0, 0, 0, 0.3);
  }

  &:focus {
    outline: 1px solid #000000;
  }
`

const Container2 = styled(TeamB)`
  &::placeholder {
    color: rgba(0, 0, 0, 0.3);
  }

  &:focus {
    outline: 1px solid #000000;
  }
`


const PointText = styled.input `
  color: #000000;
  font-size: 1.2em;
  font-weight: bold;
  background-color: #ffffff;
  border-radius: 5px;
  padding: 0.5em;
  margin: 0.5em;
  text-align: center;
`


interface InputCardProps {
    point : number
    sendPoint : (point : number ) => void
    maxValue : number
    isHost: boolean
}

const InputCard: React.FC<InputCardProps> = ({point,sendPoint, maxValue, isHost}) => {
    return isHost ?
    <Container>
        <PointText type="number" min="1" max={maxValue} value={point === 0 ? undefined : point} placeholder={point !== 0 ? undefined : "0"} onChange={(event) => {
            const numberInputted = Math.max(1, event.target.valueAsNumber)
            const numberAfterMin = Math.min(numberInputted, maxValue)
            sendPoint(numberAfterMin)
        } }/>
        </Container> :
        <Container2>
            <PointText type="number" min="1" max={maxValue} value={point === 0 ? undefined : point} placeholder={point !== 0 ? undefined : "0"} onChange={(event) => {
                const numberInputted = Math.max(1, event.target.valueAsNumber)
                const numberAfterMin = Math.min(numberInputted, maxValue)
                sendPoint(numberAfterMin)
            } }/>
        </Container2>
}

export default InputCard