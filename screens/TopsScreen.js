import React from "react";
import { View, Image, Dimensions } from "react-native";
import { styled } from "nativewind";
import TopsList from "../Products/TopsList";
import { RFValue } from "react-native-responsive-fontsize";

const window = Dimensions.get("window");
const screenWidth = window.width;
const screenHeight = window.height;

const Container = styled(View);
const Section = styled(View);

const TopsScreen = ({ setCarouselVisible }) => {
  const handleProductSelect = (selectedProduct) => {
    setCarouselVisible(false); // Hide the carousel when a product is selected
  };

  return (
    <Container style={{ position: "absolute", height: screenWidth * 0.1, width: screenWidth * 0.96, alignSelf: "auto",
    alignItems: "center" }}>
      <Section style={{ position: "absolute", height: screenWidth * 0.96, width: screenWidth * .96, top: RFValue(200), left: RFValue(20) }}>
        {/* ProductList */}
        <TopsList
          onSelectProduct={handleProductSelect}
          setCarouselVisible={setCarouselVisible}
        />
      </Section>
    </Container>
  );
};

export default TopsScreen;
