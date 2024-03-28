import React, { useContext } from 'react';

import styled from 'styled-components';
import Button from './Button';
import CartIcon from './icons/CartIcon';
import Link from 'next/link';
import { CartContext } from './context/CartContext';
const ProductWrapper = styled.div``;
const WhiteBox = styled(Link)`
  text-decoration: none;
  background-color: #fff;
  padding: 10px;
  height: 120px;
  align-items: center;
  display: flex;

  justify-content: center;
  border-radius: 10px;
  img {
    max-width: 100%;
    max-height: 100px;
  }
`;
const Title = styled(Link)`
  font-weight: normal;
  font-size: 1rem;
  margin: 0;
  margin-top: 5px;
  text-decoration: none;
  color: #000;
`;

const ProductInfoBox = styled.div`
  margin-top: 5px;
`;
const PriceRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media screen and (min-width: 768px) {
    display: flex;
  }
`;
export const Price = styled.div`
  font-size: 1rem;
  font-weight: 600;
  @media screen and (min-width: 768px) {
    font-size: 1.5rem;
    font-weight: 800;
  }
`;
const ProductBox = ({ _id, title, description, price, images }) => {
  const url = `/product/${_id}`;
  const { addProduct } = useContext(CartContext);
  return (
    <ProductWrapper>
      <WhiteBox href={url}>
        <div>
          <img src={images[0]} alt='0' />
        </div>
      </WhiteBox>
      <ProductInfoBox>
        <Title href={url}>{title}</Title>
        <PriceRow>
          <Price>${price}</Price>
          <Button primary onClick={() => addProduct(_id)}>
            Add to cart
          </Button>
        </PriceRow>
      </ProductInfoBox>
    </ProductWrapper>
  );
};

export default ProductBox;
