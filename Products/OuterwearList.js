import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import { styled } from "nativewind";
import Product from './Product'; // Import the Product component 

const Container = styled(View);
const ProductGrid = styled(FlatList);
const ProductItem = styled(TouchableOpacity);
const ProductImage = styled(Image);
const ProductTitle = styled(Text);
const ProductPrice = styled(Text);

const OuterwearList = ({ onSelectProduct, setCarouselVisible }) => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    // Fetch products from the server
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3001/getProducts/Outerwear');
        const data = await response.json();
        setProducts(data.data.products.edges);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleProductPress = (product) => {
    setSelectedProduct(product);
    onSelectProduct(product); // Pass the selected product data back to HomeScreen.js
  };

  const handleTapAway = () => {
    // Handle tap away, set selectedProduct to null to return to the original view
    setSelectedProduct(null);
  };

  const renderItem = ({ item }) => {
    const mediaNode = item.node.media.edges[0]?.node; // Access the first media node
    const imageUrl = mediaNode?.previewImage.url || ""; // Access the preview image URL

    return (
      <ProductItem
        key={item.node.id}
        onPress={() => handleProductPress(item.node)}
        className="group"
        style={{ padding: 15 }}
      >
        <ProductImage
          alt={mediaNode?.alt || item.node.title}
          style={{ height: 125, width: 125, left: 0 }}
          source={{ uri: imageUrl }}
        />
        <ProductTitle className="mt-4 text-xs text-gray-700">
          {item.node.title}
        </ProductTitle>
        <ProductPrice className="mt-1 text-xs font-dark text-gray-900">
          {"$"}
          {item.node.variants.edges[0]?.node.price.amount}{"0"}
        </ProductPrice>
      </ProductItem>
    );
  };

  return (
    <Container>
    {selectedProduct && (
      <Product handle={selectedProduct.handle} onClose={() => {setSelectedProduct(null); setCarouselVisible(true);}} setCarouselVisible={setCarouselVisible} />
    )}
    {!selectedProduct && (
        <ProductGrid
          data={products}
          renderItem={renderItem}
          keyExtractor={(item) => item.node.id.toString()}
          numColumns={2}
        />
      )}
    </Container>
  );
};

export default OuterwearList;
