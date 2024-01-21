import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { styled } from "nativewind";
import ProductList from "../Products/ProductList";

const Container = styled(View);
const Section = styled(View);

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
    </Container>
  );
};

export default HomeScreen;
