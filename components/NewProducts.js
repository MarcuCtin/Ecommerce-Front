import React from 'react';
import styled from 'styled-components';
import Center from './Center';
import ProductsGrid from './ProductsGrid';

const Title = styled.h2`
  font-size: 2rem;
  margin: 30px 0 10px;
  font-weight: normal;
`;
const NewProducts = ({ newProducts }) => {
  return (
    <Center>
      <Title>New Arrivals</Title>
      <ProductsGrid products={newProducts} />
    </Center>
  );
};

export default NewProducts;
