// App.js
import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, Pressable } from "react-native";
import { styled } from "nativewind";
import HomeScreen from "./screens/HomeScreen";
import TopsScreen from "./screens/TopsScreen";
import BottomsScreen from "./screens/BottomsScreen";
import OuterwearScreen from "./screens/OuterwearScreen";
import AccessoriesScreen from "./screens/AccessoriesScreen";
import Carousel from "react-native-snap-carousel";
import Product from "./Products/Product";
import Cart from "./Products/Cart";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage

const Container = styled(View);
const Section = styled(View);
const Trending = styled(Text);
const Logo = styled(Image);

const App = () => {
  const [currentScreen, setCurrentScreen] = useState("home");
  const [carouselVisible, setCarouselVisible] = useState(true);
  const [cartId, setCartId] = useState(null);

 // When the component mounts or when a user logs in
 useEffect(() => {
  const initiateSession = async () => {
    try {
      const response = await fetch('http://localhost:3001/initiateSession', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      const { cartId } = data;

      // Store the cartId locally using AsyncStorage
      await AsyncStorage.setItem('cartId', cartId);

      // Set the cartId in the component state
      setCartId(cartId);
    } catch (error) {
      console.error('Error initiating session:', error);
    }
  };

  initiateSession();
}, []);

  const renderScreen = () => {
    const screens = {
      home: <HomeScreen setCarouselVisible={setCarouselVisible} />,
      tops: <TopsScreen setCarouselVisible={setCarouselVisible} />,
      bottoms: <BottomsScreen setCarouselVisible={setCarouselVisible} />,
      outerwear: <OuterwearScreen setCarouselVisible={setCarouselVisible} />,
      accessories: <AccessoriesScreen setCarouselVisible={setCarouselVisible} />,
      cart: <Cart cartId={cartId} setCarouselVisible={setCarouselVisible} />,
    };

    return screens[currentScreen] || null;
  };

  const carouselData = [
    "/Users/student/galorewayz/jpegmini_optimized/IMG_1438-removebg-preview.png",
    "/Users/student/galorewayz/jpegmini_optimized/IMG_1439-removebg-preview.png",
    "/Users/student/galorewayz/jpegmini_optimized/IMG_1441-removebg-preview.png",
    "/Users/student/galorewayz/jpegmini_optimized/IMG_1442-removebg-preview.png",
    "/Users/student/galorewayz/jpegmini_optimized/IMG_1443-removebg-preview.png",
    "/Users/student/galorewayz/jpegmini_optimized/IMG_1444-removebg-preview.png",
  ];

  const renderItem = ({ item }) => (
    <View className="w-90 h-72 justify-center items-center">
      <Image
        className="w-96 h-72 rounded-2xl shadow"
        source={{ uri: item }}
      />
    </View>
  );

  const screenTextMap = {
    accessories: "Accessories",
    bottoms: "Bottoms",
    home: "Trending",
    outerwear: "Outerwear",
    tops: "Tops",
  };

  return (
    <>
      <Section>
        {carouselVisible && ["accessories", "bottoms", "home", "outerwear", "tops"].includes(currentScreen) && (
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
        <Pressable onPress={() => { setCurrentScreen("home"); setCarouselVisible(true); }}>
          <Logo className="GaloreLogo1 w-80 h-40 left-[30px] top-[-360px] absolute" source={{ uri: "/Users/student/galorewayz/assets/galore-logo.png" }} />
        </Pressable>

        {/* Product Types */}
        {["tops", "bottoms", "outerwear", "accessories"].map((type, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => { setCurrentScreen(type); setCarouselVisible(true); }}
            className={`Group${index + 1} w-22 h-8 left-[${15 + index * 95}px] top-[160px] absolute`}
          >
            <View className="Rectangle1 w-20 h-6 relative bg-orange-200 bg-opacity-10 rounded-lg border border-black" />
            <Text className={`${type === "outerwear" ? "Kids" : type === "accessories" ? "Kids" : type.charAt(0).toUpperCase() + type.slice(1)} w-15 h-6 left-2 top-[-20px] relative text-black text-xs font-normal`}>
              {type === "accessories" ? "Accessories" :  type.charAt(0).toUpperCase() + type.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}

        {/* Shopping Bag */}
        <TouchableOpacity onPress={() => { setCurrentScreen("cart"); setCarouselVisible(true); }}>
          <Image className="w-[25px] h-[25px] left-[340px] top-[-312px] relative" source={{ uri: "/Users/student/galorewayz/assets/Shopping-bag.png" }} />
          <Text className="w-[25px] h-[25px] left-[340px] top-[-352px] relative text-black font-normal text-xs">Cart</Text>
        </TouchableOpacity>
      </Section>
    </>
  );
};

export default App;
