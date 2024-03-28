import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { ButtonStyles } from './Button';

const StyledLink = styled(Link)`
  ${ButtonStyles};
`;

const ButtonLink = (props) => {
  return <StyledLink {...props} />;
};

export default ButtonLink;
