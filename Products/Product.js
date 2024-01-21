// Product.js
import React, { useState, useEffect } from 'react';
import { View, Text, Image, Button } from 'react-native';
import { styled } from 'nativewind';

const Container = styled(View);
const ProductImage = styled(Image);
const ProductTitle = styled(Text);
const ProductPrice = styled(Text);

const Product = ({ handle, onClose }) => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Fetch product by handle
    const fetchProductByHandle = async () => {
      try {
        const response = await fetch(`http://localhost:3001/getProductByHandle/${handle}`);
        const data = await response.json();
        setProduct(data.data.product);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProductByHandle();
  }, [handle]); // Update when the handle prop changes

  // Check if product is still being fetched
  if (!product) {
    return <Text>Loading...</Text>;
  }

  // Destructure product object
  const {
    id,
    title,
    description,
    media: { edges: mediaEdges },
    variants: { edges: variantEdges },
  } = product;

  // Access the first media node
  const imageUrl = mediaEdges[0]?.node.previewImage.url || '';

  // Access the price amount
  const priceAmount = variantEdges[0]?.node.price.amount || 0;

  return (
    <Container style={{ backgroundColor: 'white', padding: 50, top: -400, left: -30 }}>
      {/* Image gallery */}
      <Container style={{ aspectRatio: 3 / 4, overflow: 'hidden', borderRadius: 8 }}>
        <ProductImage
          source={{ uri: imageUrl }}
          style={{ flex: 1, height: 400, width: 400, left: -50 }}
          resizeMode="full"
        />
      </Container>

      {/* Product info */}
      <Container style={{ marginTop: 16 }}>
        <ProductTitle style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>{title}</ProductTitle>
        <ProductPrice style={{ fontSize: 16, color: 'gray', marginTop: 8 }}>{`$${priceAmount}0`}</ProductPrice>

        {/* Description */}
        <Text style={{ fontSize: 16, marginTop: 10 }}>{description}</Text>

        {/* Add to bag button */}
        <Button
          title="Add to Bag"
          onPress={() => console.log('Add to Bag button pressed')}
          style={{ marginTop: 16 }}
        />
      </Container>
    </Container>
  );
};

export default Product;
