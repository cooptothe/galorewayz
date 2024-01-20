import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import { styled } from "nativewind";

const Container = styled(View);
const Heading = styled(Text);
const ProductGrid = styled(FlatList);
const ProductItem = styled(TouchableOpacity);
const ProductImage = styled(Image);
const ProductTitle = styled(Text);
const ProductPrice = styled(Text);

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from the server
    const fetchProducts = async () => {
      try {
        const response = await fetch(`http://localhost:3001/getProducts/${Tops}`);
        const data = await response.json();
        setProducts(data.data.products.edges);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const renderItem = ({ item }) => {
    const mediaNode = item.node.media.edges[0]?.node; // Access the first media node
    const imageUrl = mediaNode?.previewImage.url || ""; // Access the preview image URL

    return (
      <ProductItem
        key={item.node.id}
        onPress={() => console.log("Product View")}
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
      {products && products.length > 0 && (
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

export default ProductList;
