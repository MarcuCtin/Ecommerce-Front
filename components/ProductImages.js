import React from 'react';
import styled from 'styled-components';
const BigImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  height: 350px;
  @media screen and (min-width: 768px) {
    height: 325px;
  }
`;
const Image = styled.img`
  width: 100px;
`;
const ImageButtons = styled.div`
  display: flex;
  justify-content: center;
  grid-template-columns: 1fr 1fr 1fr;
  flex-grow: 0;
  margin-top: 10px;
  width: 100%;
  gap: 10px;
`;

const ImageButton = styled.div`
  ${({ active }) => `
        border: 2px solid ${active === 'true' ? '#000' : '#fff'};
        border-radius: 7px;
        padding: 5px;
        cursor: pointer;
      `}
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  border-radius: 7px;
  overflow: hidden;
  height: 60px;
  width: 60px;
  cursor: pointer;
  @media screen and (min-width: 768px) {
    position: static;
    display: flex;
    height: 80px;
    width: 80px;
  }
`;
const BigImageWrapper = styled.div`
  text-align: center;
  width: 100%;
`;
const ProductImages = ({ images }) => {
  const [activeImage, setActiveImage] = React.useState(images?.[0]);

  return (
    <>
      <BigImageWrapper>
        <BigImage src={activeImage} />
      </BigImageWrapper>
      <ImageButtons>
        {images?.map((image, index) => (
          <ImageButton
            active={image === activeImage ? 'true' : 'false'}
            key={index}
            onClick={() => setActiveImage(image)}
          >
            <Image src={image} key={index} />
          </ImageButton>
        ))}
      </ImageButtons>
    </>
  );
};

export default ProductImages;
