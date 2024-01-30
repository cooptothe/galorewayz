import React from "react";
import { View, Image, Dimensions } from "react-native";
import { styled } from "nativewind";
import BottomsList from "../Products/BottomsList";
import { RFValue } from "react-native-responsive-fontsize";

const window = Dimensions.get("window");
const screenWidth = window.width;
const screenHeight = window.height;

const Container = styled(View);
const Section = styled(View);


const BottomsScreen = ({ setCarouselVisible }) => {
  const handleProductSelect = (selectedProduct) => {
    setCarouselVisible(false);
  };

  return (
    <Container style={{ position: "absolute", height: screenWidth * 0.1, width: screenWidth * 0.96 }}>
      <Section style={{ position: "absolute", height: screenWidth * 0.96, width: screenWidth * .96, top: screenWidth * 1.08, left: RFValue(20) }}>
        {/* ProductList */}
        <BottomsList
          onSelectProduct={handleProductSelect}
          setCarouselVisible={setCarouselVisible}
        />
      </Section>
            {/* Image Banner Section (Fixed at the bottom) */}
            <Section style={{ position: 'absolute', top: screenWidth * 1.92, left: RFValue(97.5) }}>
        <Image
          className="w-40 h-20 relative"
          source={{ uri: "https://cdn.shopify.com/s/files/1/0680/4815/8968/files/Web_banner.png?v=1705947435" }}
        />
      </Section>
    </Container>
  );
};

export default BottomsScreen;
