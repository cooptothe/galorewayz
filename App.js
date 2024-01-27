// App.js
import { View, Text, Image, TouchableOpacity, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import { styled } from "nativewind";
import HomeScreen from "./screens/HomeScreen";
import TopsScreen from "./screens/TopsScreen";
import BottomsScreen from "./screens/BottomsScreen";
import OuterwearScreen from "./screens/OuterwearScreen";
import AccessoriesScreen from "./screens/AccessoriesScreen";
import Carousel from "react-native-snap-carousel";
import Product from "./Products/Product";
import ProductList from "./Products/ProductList";
import Cart from "./Products/Cart";
import AsyncStorage from "@react-native-async-storage/async-storage";


const Container = styled(View);
const Section = styled(View);
const Trending = styled(Text);
const Logo = styled(Image);

const App = ({ onTapAway }) => {
  const [currentScreen, setCurrentScreen] = useState("home");
  const [carouselVisible, setCarouselVisible] = useState(true); // State for carousel visibility

  <Product setCarouselVisible={setCarouselVisible} />;

  const [cart, setCart] = useState({ id: null, checkoutUrl: null, lines: [] });

  useEffect(() => {
    const getCart = async () => {
      let localCartData = JSON.parse(
        await AsyncStorage.getItem("galorewayz:shopify:cart")
      );

      if (localCartData) {
        const existingCart = await fetch(
          `http://localhost:3001/getCart/${encodeURIComponent(
            localCartData.id
          )}`
        ).then((res) => res.json());

        setCart({
          id: localCartData.id,
          checkoutUrl: localCartData.checkoutUrl,
          cost: existingCart.data.cart.cost,
          lines: existingCart.data.cart.lines.edges,
        });

        console.log(existingCart.data.cart);

        return;
      }

      try {
        console.log("Before fetch");
        const response = await fetch("http://localhost:3001/createCart");
        console.log("After fetch");

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        localCartData = await response.json();

        setCart({
          id: localCartData.data.cartCreate.cart.id,
          checkoutUrl: localCartData.data.cartCreate.cart.checkoutUrl,
          cost: null,
          lines: [],
        });

        try {
          await AsyncStorage.setItem(
            "galorewayz:shopify:cart",
            JSON.stringify(localCartData.data.cartCreate.cart)
          );
          console.log("Cart data set successfully:", cart);
        } catch (storageError) {
          console.error("Error storing cart data:", storageError);
        }
      } catch (error) {
        console.error("Error in getCart:", error);
      }
    };

    getCart();
  }, []);

  const renderScreen = () => {
    switch (currentScreen) {
      case "home":
        return <HomeScreen setCarouselVisible={setCarouselVisible} />;
      case "tops":
        return <TopsScreen setCarouselVisible={setCarouselVisible} />;
      case "bottoms":
        return <BottomsScreen setCarouselVisible={setCarouselVisible} />;
      case "outerwear":
        return <OuterwearScreen setCarouselVisible={setCarouselVisible} />;
      case "accessories":
        return <AccessoriesScreen setCarouselVisible={setCarouselVisible} />;
      case "cart":
        return <Cart setCarouselVisible={setCarouselVisible} />;
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
    <Container>
          {renderScreen()}
          <Section>
           {/* Logo */}
           <Pressable
          onPress={() => {
            setCurrentScreen("home");
            setCarouselVisible(true);
            onTapAway;
          }}
        >
          <Logo
            className="GaloreLogo1 w-80 h-40 left-[30px] top-[-350px] absolute"
            source={{ uri: "/Users/student/galorewayz/assets/galore-logo.png" }}
          />
        </Pressable>

        <Container>
             {/* Shopping Bag */}
             <TouchableOpacity
          onPress={() => {
            setCurrentScreen("cart");
            setCarouselVisible(true);
            onTapAway;
          }}
        >
          <Image
            className="w-[25px] h-[22px] left-[340px] top-[-300px] absolute"
            source={{
              uri: "/Users/student/galorewayz/assets/Shopping-bag.png",
            }}
          />
          <Text className="w-[23px] h-[13px] left-[340px] top-[-315px] absolute text-black font-normal text-xs">Cart</Text>
        </TouchableOpacity>
            </Container>

        {carouselVisible &&
          ["accessories", "bottoms", "home", "outerwear", "tops"].includes(
            currentScreen
          ) && (
            <Section className="Frame7 left-[12px] top-[-175px] absolute">
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
              <Trending className="Trending left-[0px] top-[255px] absolute text-black text-xl font-normal">
                {screenTextMap[currentScreen]}
              </Trending>
            </Section>
          )}

        {/* Product Types */}
        <TouchableOpacity
          onPress={() => {
            setCurrentScreen("tops");
            setCarouselVisible(true);
            onTapAway;
          }}
          className="Group1 w-20 h-8 left-[15px] top-[-200px] absolute"
        >
          <View className="Rectangle1 w-20 h-6 left-0 top-0 absolute bg-orange-200 bg-opacity-10 rounded-lg border border-black" />
          <Text className="Men w-8 h-6 left-[25px] top-[4px] absolute text-black text-xs font-normal font-['Jolly Lodger']">
            Tops
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setCurrentScreen("bottoms");
            setCarouselVisible(true);
            onTapAway;
          }}
          className="Group3 w-24 h-8 left-[110px] top-[-200px] absolute"
        >
          <View className="Rectangle1 w-20 h-6 left-0 top-0 absolute bg-orange-200 bg-opacity-10 rounded-lg border border-black" />
          <Text className="Women w-12 h-6 left-[15px] top-[4px] absolute text-black text-xs font-normal font-['Jolly Lodger']">
            Bottoms
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setCurrentScreen("outerwear");
            setCarouselVisible(true);
            onTapAway;
          }}
          className="Group2 w-22 h-8 left-[205px] top-[-200px] absolute"
        >
          <View className="Rectangle1 w-20 h-6 left-0 top-0 absolute bg-orange-200 bg-opacity-10 rounded-lg border border-black" />
          <Text className="Kids w-15 h-6 left-[9px] top-[4px] absolute text-black font-normal text-xs font-['Jolly Lodger']">
            Outerwear
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setCurrentScreen("accessories");
            setCarouselVisible(true);
            onTapAway;
          }}
          className="Group2 w-22 h-8 left-[300px] top-[-200px] absolute"
        >
          <View className="Rectangle1 w-20 h-6 left-0 top-0 absolute bg-orange-200 bg-opacity-10 rounded-lg border border-black" />
          <Text className="Kids w-15 h-6 left-[6px] top-[4px] absolute text-black font-normal text-xs">
            Accessories
          </Text>
        </TouchableOpacity>
      </Section>
    </Container>
  );
};

export default App;
