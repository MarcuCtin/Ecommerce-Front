import React, { useContext } from 'react';
import { CartContext } from './context/CartContext';
import Center from './Center';
import styled from 'styled-components';
import ButtonLink from './ButtonLink';
import Button from './Button';
import CartIcon from './icons/CartIcon';
const Bg = styled.div`
  background: #222;
  color: #fff;
  padding: 50px 0;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  margin: 0;
  @apply text-lg
  font-weight: normal;
  @media screen and (min-width: 768px) {
    font-size: 3rem;
  }
`;

const Desc = styled.p`
  color: #aaa;
  font-size: 0.8rem;
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;

  img {
    max-width: 100%;
    max-height: 300px;
    display: block;
    margin: 0 auto;
  }
  div:nth-child(1) {
    order: 2;
  }

  @media screen and (min-width: 768px) {
    grid-template-columns: 1.1fr 0.9fr;
    div:nth-child(1) {
      order: 0;
    }

    justify-content: center;
  }
`;
const Column = styled.div`
  display: flex;
  align-items: center;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;

const Featured = ({ product }) => {
  const { addProduct } = useContext(CartContext);
  function addFeaturedToCart() {
    addProduct(product._id);
  }
  return (
    <Bg>
      <Center>
        <Wrapper>
          <Column>
            <div>
              <Title>{product.title}</Title>
              <Desc className=''>
                lorem ipsum dolor sit amet consectetur adipisicing elit.
              </Desc>
              <ButtonsWrapper>
                <ButtonLink
                  href={'/products'}
                  white={1}
                  size='large'
                  outline={1}
                >
                  Read More
                </ButtonLink>
                <Button primary={1} size='large' onClick={addFeaturedToCart}>
                  <CartIcon />
                  Add to cart
                </Button>
              </ButtonsWrapper>
            </div>
          </Column>
          <div>
            <img src='https://mknext-ecommerce.s3.amazonaws.com/1709406106617.webp' />
          </div>
        </Wrapper>
      </Center>
    </Bg>
  );
};

export default Featured;
