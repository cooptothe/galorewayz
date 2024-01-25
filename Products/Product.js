import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { styled } from 'nativewind';

const Container = styled(View);
const ProductImage = styled(Image);
const ProductTitle = styled(Text);
const ProductPrice = styled(Text);
const Option = styled(TouchableOpacity);


const Product = ({ handle, onClose, setCarouselVisible }) => {
  const [product, setProduct] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

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

  // Access the price amount
  const priceAmount = variantEdges[0]?.node.price.amount || 0;

  const handleAddToBag = () => {
    if (selectedColor && selectedSize) {
      // Perform the logic for adding to the bag here
      // For now, just reset the product and close the Product component
      setProduct(null);
      onClose();
    } else {
      alert('Please select color and size before adding to bag');
    }
  };

  return (
    <Container style={{ backgroundColor: 'white', padding: 25, top: -400, left: -30 }}>
      {/* Image gallery */}
      <FlatList
        horizontal
        data={mediaEdges}
        keyExtractor={(item) => item.node.previewImage.url}
        renderItem={({ item }) => (
          <ProductImage
            source={{ uri: item.node.previewImage.url }}
            style={{ flex: 3, height: 325, width: 325, left: 15, top: 60 }}
            resizeMode="contain"
          />
        )}
      />

      {/* Product info */}
      <Container style={{ marginTop: 16, top: 10 }}>
        <ProductTitle style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>{title}</ProductTitle>
        <ProductPrice style={{ fontSize: 16, color: 'gray', marginTop: 8 }}>{`$${priceAmount}0`}</ProductPrice>

        {/* Color selection */}
        <Text style={{ fontSize: 16, marginTop: 10 }}>Select Option:</Text>
        <FlatList
          horizontal
          data={variantEdges}
          keyExtractor={(item) => item.node.id}
          renderItem={({ item }) => (
            <Option
              onPress={() => setSelectedOption(item.node.title)}
              disabled={item.node.quantityAvailable === 0}
              style={{
                backgroundColor: item.node.title === selectedOption ? '#FFCC90' : 'white',
                borderWidth: 1,
                borderColor: 'black',
                borderRadius: 5,
                padding: 5,
                marginTop: 10,
                marginRight: 10,
              }}
            >
              <Text>{item.node.title}</Text>
            </Option>
          )}
        />

        {/* Description */}
        <Text style={{ fontSize: 14, marginTop: 20 }}>{description}</Text>

        {/* Add to bag button */}
        <TouchableOpacity
          onPress={handleAddToBag}
          style={{
            width: 120,
            height: 30,
            backgroundColor: '#FFCC90',
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 30,
            left: 110,
            borderColor: 'black',
            borderWidth: 1,
          }}
          disabled={!selectedOption}
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
