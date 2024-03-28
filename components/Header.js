import Link from 'next/link';
import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import Center from './Center';
import { CartContext } from './context/CartContext';
import BarsIcon from './icons/Bars';
const StyledHeader = styled.header`
  background-color: #222;
`;
const Logo = styled(Link)`
  color: white;
  text-decoration: none;
  position: relative;
  font-size: 30px;
  z-index: 10;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 30px 0;
`;
const NavLink = styled(Link)`
  display: block;
  color: #aaa;
  text-decoration: none;
  padding: 10px 0px;
`;

const StyledNav = styled.nav`
  ${(props) => (props.mobileNavActive ? `display:block;` : `display:none;`)}
  position: fixed;
  top: 0px;
  padding: 90px 20px 20px;
  left: 0px;
  bottom: 0px;
  right: 0px;
  background-color: #222;
  line-height: 30px;
  @media screen and (min-width: 768px) {
    position: static;
    display: flex;
    padding: 0;
  }
  gap: 15px;
`;

const NavButton = styled.button`
  border: none;
  background-color: transparent;
  width: 40px;
  color: white;
  cursor: pointer;
  height: 40px;
  position: relative;
  z-index: 10;
  @media screen and (min-width: 768px) {
    display: none;
  }
`;
const Header = () => {
  const [mobileNavActive, setMobileNavActive] = useState(false);

  const { cartProducts } = useContext(CartContext);
  return (
    <StyledHeader>
      <Center>
        <Wrapper>
          <Logo href={'/'}>Black.</Logo>
          <StyledNav mobileNavActive={mobileNavActive}>
            <NavLink href={'/'}>Home</NavLink>
            <NavLink href={'/products'}>All products</NavLink>
            <NavLink href={'/categories'}>Categories</NavLink>
            <NavLink href={'/account'}>Account</NavLink>
            <NavLink href={'/cart'}>Cart ({cartProducts?.length})</NavLink>
          </StyledNav>
          <NavButton onClick={() => setMobileNavActive((prev) => !prev)}>
            <BarsIcon />
          </NavButton>
        </Wrapper>
      </Center>
    </StyledHeader>
  );
};

export default Header;
