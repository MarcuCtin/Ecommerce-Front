import React from 'react';
import ProductBox from './ProductBox';

import styled from 'styled-components';
const SProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  padding-top: 20px;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;
const Title = styled.h2`
  font-size: 2rem;
  margin: 30px 0 10px;
  font-weight: normal;
`;
const ProductsGrid = ({ products }) => {
  return (
    <>
      <SProductsGrid>
        {products.length > 0 &&
          products.map((product) => (
            <ProductBox key={product._id} {...product} />
          ))}
      </SProductsGrid>
    </>
  );
};

export default ProductsGrid;
