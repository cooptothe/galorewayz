import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { styled } from "nativewind";
import Carousel from "react-native-snap-carousel";
import AccessoriesList from "../Products/AccessoriesList";
import ViewPropTypes from "deprecated-react-native-prop-types";

const Container = styled(View);
const Section = styled(View);
const Trending = styled(Text);
const Logo = styled(Image);

const AccessoriesScreen = () => {

  return (
    <Container className="Iphone1415ProMax1 w-96 h-96 relative">

      <Section className="w-96 h-80 left-[25px] top-[495px] relative">
        {/* ProductList */}
        <AccessoriesList />
      </Section>
      {/* Trending */}
      <TouchableOpacity
        onPress={() => console.log("hey")}
        className="Group1 w-38 h-8 left-[15px] top-[2px] absolute"
      >
        <Trending className="Trending left-[10px] top-[455px] absolute text-black text-3xl font-normal">
        Accessories
        </Trending>
      </TouchableOpacity>

    </Container>
  );
};

export default AccessoriesScreen;
