import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { styled } from "nativewind";
import Carousel from "react-native-snap-carousel";
import Product from "../Products/ProductList";
import ViewPropTypes from 'deprecated-react-native-prop-types';

const Container = styled(View);
const Section = styled(View);
const Trending = styled(Text);
const Logo = styled(Image);

const ProductScreen = () => {

  return (
    <Container className="Iphone1415ProMax1 w-96 h-96 relative">

      <Section className="w-96 h-80 left-[25px] top-[495px] relative">
        {/* ProductList */}
        <Product />
      </Section>
      {/* Trending */}
      <TouchableOpacity
        onPress={() => console.log("hey")}
        className="Group1 w-28 h-8 left-[15px] top-[2px] absolute"
      >
        <Trending className="Trending left-[10px] top-[455px] absolute text-black text-3xl font-normal">
          Trending
        </Trending>
      </TouchableOpacity>
    </Container>
  );
};

export default ProductScreen;
