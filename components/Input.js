import React from 'react';
import styled from 'styled-components';
const StyledInput = styled.input`
  width: 100%;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
  box-sizing: border-box;
  margin-bottom: 5px;
`;
const Input = (props) => {
  return <StyledInput {...props} />;
};

export default Input;
