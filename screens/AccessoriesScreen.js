import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { styled } from "nativewind";
import AccessoriesList from "../Products/AccessoriesList";

const Container = styled(View);
const Section = styled(View);

const AccessoriesScreen = ({ setCarouselVisible }) => {
  const handleProductSelect = (selectedProduct) => {
    setCarouselVisible(false);
    console.log("Selected Product:", selectedProduct);
  };

  return (
    <Container className="Iphone1415ProMax1 w-96 h-96 relative">
      <Section className="w-96 h-80 left-[25px] top-[495px] relative">
        {/* ProductList */}
        <AccessoriesList
          onSelectProduct={handleProductSelect}
          setCarouselVisible={setCarouselVisible}
        />
      </Section>
    </Container>
  );
};

export default AccessoriesScreen;
