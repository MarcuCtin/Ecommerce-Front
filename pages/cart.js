import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import styled from 'styled-components';
import Center from '@/components/Center';
import Button from '@/components/Button';
import { CartContext } from '@/components/context/CartContext';
import axios from 'axios';
import Table from '@/components/Table';
import { Price } from '@/components/ProductBox';
import Input from '@/components/Input';

const ColWrapper = styled.div`
  display: grid;
  grid-template-columns: 1.3fr 0.7fr;
  gap: 40px;
  margin-top: 40px;
`;
const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
`;
const ProductInfoCell = styled.td`
  padding: 10px 0;
  font-size: 1rem;
`;
const ProductImgBox = styled.div`
  max-width: 120px;
  max-height: 120px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  margin-bottom: 5px;
  img {
    max-width: 120px;
    max-height: 120px;
  }
`;
const QtyLabel = styled.span`
  padding: 0 4px;
`;
const CityHolder = styled.div`
  display: flex;
  gap: 5px;
`;
const CartPage = () => {
  const { cartProducts, addProduct, removeProduct, clearCart } =
    React.useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [country, setCountry] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [email, setEmail] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  useEffect(() => {
    if (cartProducts?.length > 0) {
      axios.post('/api/cart', { ids: cartProducts }).then((response) => {
        setProducts(response.data);
      });
    }
  }, [cartProducts]);
  useEffect(() => {
    if (window?.location.href.includes('success')) {
      clearCart();
      setIsSuccess(true);
    }
  }, [isSuccess, clearCart]);
  function plusProduct(id) {
    addProduct(id);
  }
  function minusProduct(id) {
    if (products.length === 1) {
      setProducts((prev) => prev.filter((id) => id !== id));
    }
    removeProduct(id);
  }
  let total = 0;
  for (const productId of cartProducts) {
    total += products.find((product) => product._id === productId)?.price;
  }
  async function goToPayment() {
    const res = await axios('/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        name,
        city,
        address,
        country,
        postalCode,
        email,
        cartProducts,
      },
    });
    if (res.data.url) {
      window.location = res.data.url;
    }
  }
  if (isSuccess) {
    return (
      <>
        <Header />
        <Center>
          <Box>
            <h2>Your order has been placed</h2>
            <Button onClick={() => (window.location.href = '/')}>
              Continue shopping
            </Button>
          </Box>
        </Center>
      </>
    );
  }
  return (
    <>
      <Header />
      <Center>
        <ColWrapper>
          <Box>
            {!cartProducts?.length && <h2>Your cart is empty</h2>}
            {products && products?.length !== 0 && (
              <>
                <h2>Cart</h2>
                <Table>
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Quantity</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products?.length !== 0 &&
                      products.map((product) => (
                        <tr key={product._id}>
                          <ProductInfoCell>
                            <ProductImgBox>
                              <img src={product.images[0]} alt='0' />
                            </ProductImgBox>
                            {product.title}
                          </ProductInfoCell>
                          <td>
                            <Button onClick={() => minusProduct(product._id)}>
                              -
                            </Button>
                            <QtyLabel>
                              {
                                cartProducts?.filter((id) => id === product._id)
                                  .length
                              }
                            </QtyLabel>
                            <Button onClick={() => plusProduct(product._id)}>
                              +
                            </Button>
                          </td>
                          <td>
                            $
                            {cartProducts?.filter((id) => id === product._id)
                              .length * product.price}
                          </td>
                        </tr>
                      ))}
                    <tr>
                      <td />
                      <td></td>
                      <td>Total: $ {total}</td>
                    </tr>
                  </tbody>
                </Table>
              </>
            )}
          </Box>
          {!!cartProducts?.length && (
            <Box>
              <h2>Order information</h2>

              <Input
                type='text'
                placeholder='Name'
                value={name}
                name='name'
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                type='text'
                placeholder='Email'
                value={email}
                name='email'
                onChange={(e) => setEmail(e.target.value)}
              />
              <CityHolder>
                <Input
                  type='text'
                  placeholder='City'
                  value={city}
                  name='city'
                  onChange={(e) => setCity(e.target.value)}
                />
                <Input
                  type='text'
                  placeholder='Postal Code'
                  value={postalCode}
                  name='postalCode'
                  onChange={(e) => setPostalCode(e.target.value)}
                />
              </CityHolder>
              <Input
                type='text'
                placeholder='Address'
                value={address}
                name='address'
                onChange={(e) => setAddress(e.target.value)}
              />
              <Input
                type='text'
                placeholder='Country'
                value={country}
                name='country'
                onChange={(e) => setCountry(e.target.value)}
              />

              <Button block={1} primary={1} onClick={goToPayment}>
                Continue to payment
              </Button>
            </Box>
          )}
        </ColWrapper>
      </Center>
    </>
  );
};

export default CartPage;
