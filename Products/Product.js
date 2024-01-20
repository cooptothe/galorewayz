import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, Button } from 'react-native';

const Product = ({ handle }) => {
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
  }, [handle]);

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
    <ScrollView style={{ backgroundColor: 'white', padding: 16 }}>
      {/* Image gallery */}
      <View style={{ aspectRatio: 3 / 4, overflow: 'hidden', borderRadius: 8 }}>
        <Image
          source={{ uri: imageUrl }}
          style={{ flex: 1, height: undefined, width: undefined }}
          resizeMode="cover"
        />
      </View>

      {/* Product info */}
      <View style={{ marginTop: 16 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>{title}</Text>
        <Text style={{ fontSize: 16, color: 'gray', marginTop: 8 }}>{`$${priceAmount}0`}</Text>

        {/* Description */}
        <Text style={{ fontSize: 16, marginTop: 10 }}>{description}</Text>

        {/* Add to bag button */}
        <Button
          title="Add to Bag"
          onPress={() => console.log('Add to Bag button pressed')}
          style={{ marginTop: 16 }}
        />
      </View>
    </ScrollView>
  );
};

export default Product;
