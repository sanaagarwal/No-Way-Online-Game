import React from "react";
import styled from "styled-components";

const Container = styled.input`
  background-color: #f5f5f5;
  border-radius: 5px;
  border: 1px solid #e8e8e8;
  border-bottom: 1px solid rgba(0, 0, 0, 0.47);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  color: #333;
  font-family: monospace;
  font-size: 1.2em;
  margin: 0.5em;
  padding: 0.5em;
  text-align: center;
  width: 50px;
  align-self: center;

  &::placeholder {
    color: rgba(0, 0, 0, 0.3);
  }

  &:focus {
    outline: 1px solid #000000;
  }
`

interface InputCardProps {
    point : number
    sendPoint : (point : number ) => void
    maxValue : number
}

const InputCard: React.FC<InputCardProps> = ({point,sendPoint, maxValue}) => {
    return <Container type="number" min="1" max={maxValue} value={point === 0 ? undefined : point} placeholder={point !== 0 ? undefined : "0"} onChange={(event) => {
            const numberInputted = Math.max(1, event.target.valueAsNumber)
            const numberAfterMin = Math.min(numberInputted, maxValue)
            sendPoint(numberAfterMin)
        } }/>
}

export default InputCard