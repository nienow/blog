import React, {ReactNode} from 'react';
import styled from "styled-components";

interface Params {
  onClick: () => void;
  children: ReactNode;
}

const Button = styled.button`
  padding: 10px 20px;
  outline: none;
  cursor: pointer;
  font-family: inherit;
  border: 1px solid #ccc;
  border-radius: 0;
  font-size: 16px;
`;

const ActionButton = ({onClick, children}: Params) => {
  return (
    <Button onClick={onClick}>{children}</Button>
  );
}

export default ActionButton
