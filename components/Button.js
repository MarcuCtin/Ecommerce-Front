import React from 'react';
import styled, { css } from 'styled-components';
export const ButtonStyles = css`
  border: none;
  padding: 5px 15px;
  border-radius: 5px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-weight: bold;
  svg {
    height: 20px;
    margin-right: 5px;
  }
  text-decoration: none;
  ${(props) =>
    props.block &&
    css`
      display: block;
      width: 100%;
    `}
  ${(props) =>
    props.white &&
    !props.outline &&
    css`
      background-color: white;
      color: #000;
    `}
  ${(props) =>
    props.white &&
    props.outline &&
    css`
      background-color: transparent;
      color: #fff;
      border: 1px solid white;
    `}
  ${(props) =>
    props.primary &&
    !props.outline &&
    css`
      background-color: #013220;
      border: 1px solid #000;
      color: white;
    `}
  ${(props) =>
    props.primary &&
    props.outline &&
    css`
      background-color: #fff;
      border: 1px solid #fff;
      color: #000;
    `}
  ${(props) =>
    props.size === 'large' &&
    css`
      font-size: 1.2rem;
      padding: 7px 20px;
      svg {
        height: 25px;
      }
    `}
`;

export const StyledButton = styled.button`
  ${ButtonStyles};
`;

const Button = ({ children, ...rest }) => {
  return <StyledButton {...rest}>{children}</StyledButton>;
};

export default Button;
