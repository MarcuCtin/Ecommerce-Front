import React, { useState, useEffect } from 'react';
import { createContext } from 'react';

export const CartContext = createContext({});

export function CartContextProvider({ children }) {
  const ls = typeof window !== 'undefined' ? localStorage : null;
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    if (ls.getItem('cart')) {
      setCartProducts(JSON.parse(ls.getItem('cart')));
    }
  }, [ls]);

  useEffect(() => {
    if (cartProducts?.length > 0) {
      ls.setItem('cart', JSON.stringify(cartProducts));
    }
  }, [cartProducts, ls]);

  function addProduct(productId) {
    setCartProducts((prev) => [...prev, productId]);
  }

  function removeProduct(productId) {
    setCartProducts((prev) => {
      const pos = prev.findIndex((id) => id === productId);
      if (pos === -1) return prev;
      let newCartProducts = [...prev.slice(0, pos), ...prev.slice(pos + 1)];
      ls.setItem('cart', newCartProducts);
      return newCartProducts;
    });
  }
  function clearCart() {
    setCartProducts([]);
  }
  return (
    <CartContext.Provider
      value={{
        cartProducts,
        clearCart,
        addProduct,
        removeProduct,
        setCartProducts,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
