import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { styled } from "nativewind";
import TopsList from "../Products/TopsList";

const Container = styled(View);
const Section = styled(View);

const TopsScreen = ({ setCarouselVisible }) => {
  const handleProductSelect = (selectedProduct) => {
    setCarouselVisible(false); // Hide the carousel when a product is selected
  };

  return (
    <Container className="Iphone1415ProMax1 w-96 h-96 relative">
      <Section className="w-96 h-80 left-[25px] top-[495px] relative">
        {/* ProductList */}
        <TopsList
          onSelectProduct={handleProductSelect}
          setCarouselVisible={setCarouselVisible}
        />
      </Section>
            {/* Image Banner Section (Fixed at the bottom) */}
            <Section style={{ position: 'absolute', top: 785, left: 10, right: 0, alignItems: 'center' }}>
        <Image
          className="w-40 h-20 relative"
          source={{ uri: "https://cdn.shopify.com/s/files/1/0680/4815/8968/files/Web_banner.png?v=1705947435" }}
        />
      </Section>
    </Container>
  );
};

export default TopsScreen;
