import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from "react-native";
import { styled } from "nativewind";
import ProductList from "../Products/ProductList";

const Container = styled(View);
const Section = styled(View);
const Trending = styled(Text);

const HomeScreen = ({ setCarouselVisible }) => {

  const handleProductSelect = (selectedProduct) => {
    setCarouselVisible(false); // Hide the carousel when a product is selected
    // Handle the selected product data in HomeScreen.js
    console.log("Selected Product:", selectedProduct);

  };

  return (
    <Container className="Iphone1415ProMax1 w-96 h-96 relative">
      <Section className="w-96 h-80 left-[25px] top-[495px] relative">
        {/* ProductList */}
        <ProductList onSelectProduct={handleProductSelect} />
      </Section>
      {/* Trending */}
      <TouchableOpacity
        onPress={() => console.log("hey")}
        className="Group1 w-28 h-8 left-[15px] top-[2px] absolute"
      >
      </TouchableOpacity>
    </Container>
  );
};

export default HomeScreen;
