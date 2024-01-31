import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { styled } from 'nativewind';
import Product from './Product'; // Import the Product component
import { RFValue } from "react-native-responsive-fontsize";

const window = Dimensions.get("window");
const screenWidth = window.width;
const screenHeight = window.height;

const Container = styled(View);
const ProductGrid = styled(FlatList);
const ProductItem = styled(TouchableOpacity);
const ProductImage = styled(Image);
const ProductTitle = styled(Text);
const ProductPrice = styled(Text);

const TopsList = ({ onSelectProduct, setCarouselVisible }) => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    // Fetch products from the server
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3001/getProducts/Tops');
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
        style={{ padding: RFValue(20) }}
      >
        <ProductImage
          alt={mediaNode?.alt || item.node.title}
          style={{ height: RFValue(60), width: RFValue(80), right: RFValue(25) }}
          source={{ uri: imageUrl }}
        />
        <ProductTitle
          style={{
            position: "relative",
            color: "black",
            fontSize: RFValue(10),
            fontWeight: "normal",
            width: screenWidth * .4,
            right: RFValue(20),
            paddingBottom: RFValue(1),
            paddingTop: RFValue(5)
          }}
        >
          {item.node.title}
        </ProductTitle>

        <ProductPrice
          style={{
            position: "relative",
            color: "black",
            fontSize: RFValue(8),
            fontWeight: "normal",
            width: screenWidth * .3,
            right: RFValue(15),
            paddingBottom: RFValue(1),
            paddingTop: RFValue(1)
          }}
        >
          {"$"}
          {item.node.variants.edges[0]?.node.price.amount}
          {"0"}
        </ProductPrice>
      </ProductItem>
    );
  };

  return (
      <Container style={{ right: RFValue(1) }} >
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

export default TopsList;
