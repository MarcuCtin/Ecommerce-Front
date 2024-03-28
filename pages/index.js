import Featured from '@/components/Featured';
import Header from '@/components/Header';
import { mongooseConnect } from '@/lib/mongoose';
import React from 'react';
import { Product } from '@/models/Product';
import NewProducts from '@/components/NewProducts';
const HomePage = ({ featuredProduct, newProducts }) => {
  console.log(newProducts);
  return (
    <div>
      <Header />
      <Featured product={featuredProduct} />
      <NewProducts newProducts={newProducts} />
    </div>
  );
};

export default HomePage;

export async function getServerSideProps() {
  const featuredProductId = '65e377ae39ed3eb3d0b41a2f';
  await mongooseConnect();
  const featuredProduct = await Product.findById(featuredProductId);
  const newProducts = await Product.find({}, null, {
    sort: { _id: -1 },
    limit: 10,
  });
  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
    },
  };
}
