import React from "react";
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
  // Dummy product data
  const products = [
    {
      id: 1,
      title: "Earthen Bottle",
      price: "$48",
      imageUrl: require("/Users/student/galorewayz/jpegmini_optimized/IMG_1438-removebg-preview.png"),
    },
    {
      id: 2,
      title: "Nomad Tumbler",
      price: "$35",
      imageUrl: require("/Users/student/galorewayz/jpegmini_optimized/IMG_1439-removebg-preview.png"),
    },
    {
      id: 3,
      title: "Focus Paper Refill",
      price: "$89",
      imageUrl: require("/Users/student/galorewayz/jpegmini_optimized/IMG_1441-removebg-preview.png"),
    },
    {
      id: 4,
      title: "Machined Mechanical Pencil",
      price: "$35",
      imageUrl: require("/Users/student/galorewayz/jpegmini_optimized/IMG_1443-removebg-preview.png"),
    },
  ];

  const renderItem = ({ item }) => (
    <ProductItem
      key={item.id}
      onPress={() => console.log("Product View")}
      className="group"
      style={{ padding: 15 }}
    >
      <ProductImage
        alt={item.imageAlt}
        style={{ height: 125, width: 125 }}
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
        numColumns={2}
      />
    </Container>
  );
};

export default ProductList;
