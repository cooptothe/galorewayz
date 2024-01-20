import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { styled } from "nativewind";
import Carousel from "react-native-snap-carousel";
import ProductList from "../Products/ProductList";
import ViewPropTypes from 'deprecated-react-native-prop-types';

const Container = styled(View);
const Section = styled(View);
const Trending = styled(Text);
const Logo = styled(Image);

const HomeScreen = () => {
  const carouselData = [
    {
      imageUrl:
        "/Users/student/galorewayz/jpegmini_optimized/IMG_1438-removebg-preview.png",
    },
    {
      imageUrl:
        "/Users/student/galorewayz/jpegmini_optimized/IMG_1439-removebg-preview.png",
    },
    {
      imageUrl:
        "/Users/student/galorewayz/jpegmini_optimized/IMG_1441-removebg-preview.png",
    },
    {
      imageUrl:
        "/Users/student/galorewayz/jpegmini_optimized/IMG_1442-removebg-preview.png",
    },
    {
      imageUrl:
        "/Users/student/galorewayz/jpegmini_optimized/IMG_1443-removebg-preview.png",
    },
    {
      imageUrl:
        "/Users/student/galorewayz/jpegmini_optimized/IMG_1444-removebg-preview.png",
    },
  ];

  const renderItem = ({ item }) => (
    <View className="w-90 h-72 justify-center items-center">
      <Image
        className="w-96 h-72 rounded-2xl shadow"
        source={{ uri: item.imageUrl }}
      />
    </View>
  );

  return (
    <Container className="Iphone1415ProMax1 w-96 h-96 relative">
      {/* ... Other components ... */}

      {/* Logo */}
      <Logo
        className="GaloreLogo1 w-80 h-40 left-[30px] top-[22px] absolute"
        source={{ uri: "/Users/student/galorewayz/assets/galore-logo.png" }}
      />

      <Section className="Frame7 w-96 h-72 left-[12px] top-[185px] absolute">
        <Carousel
          data={carouselData}
          renderItem={renderItem}
          sliderWidth={370}
          itemWidth={200}
          layout="default"
          layoutCardOffset={30}
          inactiveSlideOpacity={0.4}
          inactiveSlideScale={0.4}
          loop={true}
          autoplay={true}
          autoplayInterval={6000}
        />
      </Section>

      <Section className="w-96 h-80 left-[25px] top-[495px] relative">
        {/* ProductList */}
        <ProductList />
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

      {/* Categories */}
      <TouchableOpacity
        onPress={() => console.log("hey")}
        className="Group1 w-20 h-8 left-[15px] top-[160px] absolute"
      >
        <View className="Rectangle1 w-20 h-6 left-0 top-0 absolute bg-orange-200 bg-opacity-10 rounded-lg border border-black" />
        <Text className="Men w-8 h-6 left-[25px] top-[4px] absolute text-black text-xs font-normal font-['Jolly Lodger']">
          Tops
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => console.log("hey")}
        className="Group3 w-24 h-8 left-[110px] top-[160px] absolute"
      >
        <View className="Rectangle1 w-20 h-6 left-0 top-0 absolute bg-orange-200 bg-opacity-10 rounded-lg border border-black" />
        <Text className="Women w-12 h-6 left-[15px] top-[4px] absolute text-black text-xs font-normal font-['Jolly Lodger']">
          Bottoms
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => console.log("hey")}
        className="Group2 w-22 h-8 left-[205px] top-[160px] absolute"
      >
        <View className="Rectangle1 w-20 h-6 left-0 top-0 absolute bg-orange-200 bg-opacity-10 rounded-lg border border-black" />
        <Text className="Kids w-15 h-6 left-[9px] top-[4px] absolute text-black font-normal text-xs font-['Jolly Lodger']">
          Outerwear
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => console.log("hey")}
        className="Group2 w-22 h-8 left-[300px] top-[160px] absolute"
      >
        <View className="Rectangle1 w-20 h-6 left-0 top-0 absolute bg-orange-200 bg-opacity-10 rounded-lg border border-black" />
        <Text className="Kids w-15 h-6 left-[6px] top-[4px] absolute text-black font-normal text-xs font-['Jolly Lodger']">
          Accessories
        </Text>
      </TouchableOpacity>
    </Container>
  );
};

export default HomeScreen;
