import Center from '@/components/Center';
import Header from '@/components/Header';
import React from 'react';
import { mongooseConnect } from '@/lib/mongoose';
import styled from 'styled-components';
import { Product } from '@/models/Product';
import ProductsGrid from '@/components/ProductsGrid';
const Title = styled.h1`
  font-size: 1.5rem;
`;
const ProductsPage = ({ products }) => {
  return (
    <>
      <Header />
      <Center>
        <Title>all products</Title>
        <ProductsGrid products={products} />
      </Center>
    </>
  );
};

export default ProductsPage;

export async function getServerSideProps() {
  await mongooseConnect();
  const products = JSON.stringify(
    await Product.find({}, null, { sort: { _id: -1 } })
  );
  return {
    props: {
      products: JSON.parse(products),
    },
  };
}
