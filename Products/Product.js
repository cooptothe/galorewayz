// Product.js
import React, { useState, useEffect } from 'react';
import { View, Text, Image, Button, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';

const Container = styled(View);
const ProductImage = styled(Image);
const ProductTitle = styled(Text);
const ProductPrice = styled(Text);

const Product = ({ handle, onClose, setCarouselVisible }) => {
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


  const handleAddToBag = () => {
    setCarouselVisible(true);
    // Perform the logic for adding to the bag here
    // For now, just reset the product and close the Product component
    setProduct(null);
    onClose();

  };

  return (
    <Container style={{ backgroundColor: 'white', padding: 25, top: -400, left: -30 }}>
      {/* Image gallery */}
      <Container style={{ aspectRatio: 3 / 4, overflow: 'hidden', borderRadius: 8 }}>
        <ProductImage
          source={{ uri: imageUrl }}
          style={{ flex: 3, height: 300, width: 375, left: -15, top: 40 }}
          resizeMode="contain"
        />
      </Container>

      {/* Product info */}
      <Container style={{ marginTop: 16, top: -10 }}>
        <ProductTitle style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>{title}</ProductTitle>
        <ProductPrice style={{ fontSize: 16, color: 'gray', marginTop: 8 }}>{`$${priceAmount}0`}</ProductPrice>

        {/* Description */}
        <Text style={{ fontSize: 14, marginTop: 10 }}>{description}</Text>

{/* Add to bag button */}
<TouchableOpacity
  onPress={handleAddToBag}
  style={{
    width: 120,
    height: 30,
    backgroundColor: '#FFCC90', // Set your desired background color
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    left: 100,
    borderColor: 'black', // Add black border color
    borderWidth: 1, // Add border width
  }}
>
  <Text style={{ color: 'black', fontSize: 16, fontWeight: 'normal' }}>
    Add to Bag
  </Text>
</TouchableOpacity>
      </Container>
    </Container>
  );
};

export default Product;
