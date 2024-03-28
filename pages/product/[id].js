import Button from '@/components/Button';
import Center from '@/components/Center';
import Header from '@/components/Header';
import ProductImages from '@/components/ProductImages';
import WhiteBox from '@/components/WhiteBox';
import CartIcon from '@/components/icons/CartIcon';
import { mongooseConnect } from '@/lib/mongoose';
import { Product } from '@/models/Product';
import React, { useContext } from 'react';
import styled from 'styled-components';
import { CartContext } from '@/components/context/CartContext';
import { Price } from '@/components/ProductBox';
const Title = styled.h1`
  font-size: 1.75rem;
  font-weight: 800;
`;
const ColWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  margin-top: 40px;
  @media screen and (min-width: 768px) {
    grid-template-columns: 0.8fr 1.2fr;
  }
`;
const PriceRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
const ProductPage = ({ product }) => {
  const { addProduct } = useContext(CartContext);
  console.log(product, 'product');
  return (
    <>
      <Header />
      <Center>
        <ColWrapper>
          <WhiteBox>
            <ProductImages images={product.images} />
          </WhiteBox>
          <div>
            <p>
              <Title>{product.title}</Title>
              <p>{product.description}</p>
            </p>
            <PriceRow>
              <div>
                <Price>${product.price}</Price>
              </div>
              <div>
                <Button primary onClick={() => addProduct(product._id)}>
                  Add to cart
                </Button>
              </div>
            </PriceRow>
          </div>
        </ColWrapper>
      </Center>
    </>
  );
};

export async function getServerSideProps(context) {
  await mongooseConnect();
  const { id } = context.query;
  console.log(id, 'id');
  const product = JSON.stringify(await Product.findOne({ _id: id }));
  return {
    props: {
      product: JSON.parse(product),
    },
  };
}

export default ProductPage;
