import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { styled } from "nativewind";
import Carousel from "react-native-snap-carousel";

const Container = styled(View);
const Section = styled(View);
const Trending = styled(Text);
const Logo = styled(Image);

const App = () => {
  const carouselData = [
    {
      imageUrl:
        "/Users/student/galorewayz/jpegmini_optimized (1)/IMG_1438-removebg-preview.png",
    },
    {
      imageUrl:
        "/Users/student/galorewayz/jpegmini_optimized (1)/IMG_1439-removebg-preview.png",
    },
    {
      imageUrl:
        "/Users/student/galorewayz/jpegmini_optimized (1)/IMG_1441-removebg-preview.png",
    },
    {
      imageUrl:
        "/Users/student/galorewayz/jpegmini_optimized (1)/IMG_1442-removebg-preview.png",
    },
    {
      imageUrl:
        "/Users/student/galorewayz/jpegmini_optimized (1)/IMG_1443-removebg-preview.png",
    },
    {
      imageUrl:
        "/Users/student/galorewayz/jpegmini_optimized (1)/IMG_1444-removebg-preview.png",
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
    <Container className="Iphone1415ProMax1 w-96 h-96 relative bg-zinc-100">
      {/* ... Other components ... */}
      {/* Categories */}
      <TouchableOpacity
        onPress={() => console.log("hey")}
        className="Group1 w-24 h-8 left-[25px] top-[145px] absolute"
      >
        <View className="Rectangle1 w-24 h-8 left-0 top-0 absolute bg-orange-400 bg-opacity-10 rounded-lg border border-black" />
        <Text className="Men w-8 h-6 left-[34px] top-[8px] absolute text-black text-l font-normal font-['Jolly Lodger']">
          Tops
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => console.log("hey")}
        className="Group2 w-24 h-8 left-[275px] top-[145px] absolute"
      >
        <View className="Rectangle1 w-24 h-8 left-0 top-0 absolute bg-orange-400 bg-opacity-10 rounded-lg border border-black" />
        <Text className="Kids w-15 h-6 left-[10px] top-[8px] absolute text-black text- font-normal font-['Jolly Lodger']">
          Accessories
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => console.log("hey")}
        className="Group3 w-24 h-8 left-[150px] top-[145px] absolute"
      >
        <View className="Rectangle1 w-24 h-8 left-0 top-0 absolute bg-orange-400 bg-opacity-10 rounded-lg border border-black" />
        <Text className="Women w-12 h-6 left-[26.5px] top-[8px] absolute text-black text-l font-normal font-['Jolly Lodger']">
          Bottoms
        </Text>
      </TouchableOpacity>
      {/* Logo */}
      <Logo
        className="GaloreLogo1 w-60 h-20 left-[70px] top-[60px] absolute"
        source={{ uri: "/Users/student/galorewayz/assets/galore-logo.png" }}
      />
      <Trending className="Trending left-[29px] top-[475px] absolute text-black text-3xl font-normal">
        Trending
      </Trending>
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
    </Container>
  );
};

export default App;
