// App.js
import { View, Text, Image, TouchableOpacity, Pressable } from "react-native";
import React, { useState } from "react";
import { styled } from "nativewind";
import HomeScreen from "./screens/HomeScreen";
import TopsScreen from "./screens/TopsScreen";
import BottomsScreen from "./screens/BottomsScreen";
import OuterwearScreen from "./screens/OuterwearScreen";
import AccessoriesScreen from "./screens/AccessoriesScreen";
import Carousel from "react-native-snap-carousel";
import Product from "./Products/Product";
import ProductList from "./Products/ProductList";

const Container = styled(View);
const Section = styled(View);
const Trending = styled(Text);
const Logo = styled(Image);

const App = () => {
  const [currentScreen, setCurrentScreen] = useState("home");
  const [selectedProductHandle, setSelectedProductHandle] = useState(null);
  const [carouselVisible, setCarouselVisible] = useState(true); // State for carousel visibility

  const renderScreen = () => {
    switch (currentScreen) {
      case "home":
        return <HomeScreen setCarouselVisible={setCarouselVisible} />;
      case "tops":
        return <TopsScreen />;
      case "bottoms":
        return <BottomsScreen />;
      case "outerwear":
        return <OuterwearScreen />;
      case "accessories":
        return <AccessoriesScreen />;

      default:
        return null;
    }
  };

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

  const screenTextMap = {
    accessories: "Accessories",
    bottoms: "Bottoms",
    home: "Trending", // Default text for the home screen
    outerwear: "Outerwear",
    tops: "Tops",
  };

  return (
    <>
      <Section>
        {carouselVisible &&
          ["accessories", "bottoms", "home", "outerwear", "tops"].includes(
            currentScreen
          ) && (
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
              <Trending className="Trending left-[10px] top-[270px] absolute text-black text-3xl font-normal">
              {screenTextMap[currentScreen]}
              </Trending>
            </Section>
          )}
        {renderScreen()}

        {/* Logo */}
        <Pressable onPress={() => setCurrentScreen("home")}>
          <Logo
            className="GaloreLogo1 w-80 h-40 left-[30px] top-[-360px] absolute"
            source={{ uri: "/Users/student/galorewayz/assets/galore-logo.png" }}
          />
        </Pressable>

        {/* Product Types */}
        <TouchableOpacity
          onPress={() => setCurrentScreen("tops")}
          className="Group1 w-20 h-8 left-[15px] top-[160px] absolute"
        >
          <View className="Rectangle1 w-20 h-6 left-0 top-0 absolute bg-orange-200 bg-opacity-10 rounded-lg border border-black" />
          <Text className="Men w-8 h-6 left-[25px] top-[4px] absolute text-black text-xs font-normal font-['Jolly Lodger']">
            Tops
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setCurrentScreen("bottoms")}
          className="Group3 w-24 h-8 left-[110px] top-[160px] absolute"
        >
          <View className="Rectangle1 w-20 h-6 left-0 top-0 absolute bg-orange-200 bg-opacity-10 rounded-lg border border-black" />
          <Text className="Women w-12 h-6 left-[15px] top-[4px] absolute text-black text-xs font-normal font-['Jolly Lodger']">
            Bottoms
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setCurrentScreen("outerwear")}
          className="Group2 w-22 h-8 left-[205px] top-[160px] absolute"
        >
          <View className="Rectangle1 w-20 h-6 left-0 top-0 absolute bg-orange-200 bg-opacity-10 rounded-lg border border-black" />
          <Text className="Kids w-15 h-6 left-[9px] top-[4px] absolute text-black font-normal text-xs font-['Jolly Lodger']">
            Outerwear
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setCurrentScreen("accessories")}
          className="Group2 w-22 h-8 left-[300px] top-[160px] absolute"
        >
          <View className="Rectangle1 w-20 h-6 left-0 top-0 absolute bg-orange-200 bg-opacity-10 rounded-lg border border-black" />
          <Text className="Kids w-15 h-6 left-[6px] top-[4px] absolute text-black font-normal text-xs font-['Jolly Lodger']">
            Accessories
          </Text>
        </TouchableOpacity>
      </Section>
    </>
  );
};

export default App;
