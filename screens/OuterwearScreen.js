import React from "react";
import { View, Image, Dimensions } from "react-native";
import { styled } from "nativewind";
import OuterwearList from "../Products/OuterwearList";
import { RFValue } from "react-native-responsive-fontsize";

const window = Dimensions.get("window");
const screenWidth = window.width;
const screenHeight = window.height;

const Container = styled(View);
const Section = styled(View);


const OuterwearScreen = ({ setCarouselVisible }) => {
  const handleProductSelect = (selectedProduct) => {
    setCarouselVisible(false);
    console.log("Selected Product:", selectedProduct);
  };

  return (
    <Container style={{ position: "absolute", height: screenWidth * 0.1, width: screenWidth * 0.96, alignSelf: "auto",
    alignItems: "center" }}>
      <Section style={{ position: "absolute", height: screenWidth * 0.96, width: screenWidth * .96, top: RFValue(200), left: RFValue(20) }}>
        {/* ProductList */}
        <OuterwearList
          onSelectProduct={handleProductSelect}
          setCarouselVisible={setCarouselVisible}
        />
      </Section>
    </Container>
  );
};

export default OuterwearScreen;
