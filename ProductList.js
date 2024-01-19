import React from "react";
import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import { styled } from "nativewind";

const Container = styled(View);
const Heading = styled(Text);
const ProductGrid = styled(FlatList); // Changed ScrollView to FlatList for better performance
const ProductItem = styled(TouchableOpacity); // Changed View to TouchableOpacity for clickable items
const ProductImage = styled(Image);
const ProductTitle = styled(Text);
const ProductPrice = styled(Text);

const ProductList = () => {
  // Dummy product data
  const products = [
    {
      id: 1,
      title: "Earthen Bottle",
      price: "$48",
      imageUrl: "/Users/student/galorewayz/assets/galore-logo.png",
    },
    {
      id: 2,
      title: "Nomad Tumbler",
      price: "$35",
      imageUrl: "/Users/student/galorewayz/jpegmini_optimized (1)/IMG_1438.jpg",
    },
    {
      id: 3,
      title: "Focus Paper Refill",
      price: "$89",
      imageUrl: "/Users/student/galorewayz/jpegmini_optimized (1)/IMG_1438.jpg",
    },
    {
      id: 4,
      title: "Machined Mechanical Pencil",
      price: "$35",
      imageUrl: "/Users/student/galorewayz/jpegmini_optimized (1)/IMG_1438.jpg",
    },
  ];

  const renderItem = ({ item }) => (
    <ProductItem
      key={item.id}
      onPress={() => console.log("Product View")}
      className="group"
    >
      <ProductImage
        alt={item.imageAlt}
        className="h-full w-full"
        source={item.imageUrl}
      />
      <ProductTitle className="mt-4 text-sm text-gray-700">
        {item.title}
      </ProductTitle>
      <ProductPrice className="mt-1 text-lg font-medium text-gray-900">
        {item.price}
      </ProductPrice>
    </ProductItem>
  );

  return (
    <Container>
      <ProductGrid
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2} // Change the number of columns as needed
      />
    </Container>
  );
};

export default ProductList;
