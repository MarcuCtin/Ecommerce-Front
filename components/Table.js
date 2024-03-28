import React from 'react';

import styled from 'styled-components';
const StyledTable = styled.table`
  width: 100%;

  th {
    text-align: left;
    text-transform: uppercase;
    color: #aaa;
    font-weight: 550;
    font-size: 0.8rem;
  }
`;
const Table = (props) => {
  return <StyledTable {...props} />;
};

export default Table;
