// App.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Pressable,
  Dimensions,
} from "react-native";
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
import { RFValue } from "react-native-responsive-fontsize";

const window = Dimensions.get("window");
const screenWidth = window.width;
const screenHeight = window.height;

const Container = styled(View);
const Section = styled(View);
const Trending = styled(Text);
const Logo = styled(Image);

const App = ({ onTapAway }) => {
  const [currentScreen, setCurrentScreen] = useState("home");
  const [carouselVisible, setCarouselVisible] = useState(true); // State for carousel visibility
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

        return;
      }

      try {
        const response = await fetch("http://localhost:3001/createCart");

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
    <View
      style={{
        width: screenWidth * 0.8,
        height: screenWidth * 0.8,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        style={{
          width: screenWidth * 0.8,
          height: screenWidth * .8,
          borderRadius: 10,
          shadowRadius: 5,
          shadowOpacity: 0.5,
          top: screenWidth * .15,
          right: screenWidth * .15,
        }}
        source={{ uri: item.imageUrl }}
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
    <Container>
      {renderScreen()}
      <Section>

        <Container style={{ top: RFValue(35), left: RFValue(10) }}>
          <TouchableOpacity
            onPress={() => {
              setCurrentScreen("cart");
              setCarouselVisible(true);
              onTapAway;
            }}
          >
            <Image
              style={{
                width: RFValue(25),
                height: RFValue(22),
                left: RFValue(330),
                bottom: RFValue(310),
                position: "absolute",
              }}
              source={{
                uri: "/Users/student/galorewayz/assets/Shopping-bag.png",
              }}
            />
            <Text
              style={{
                color: "black",
                fontSize: RFValue(12),
                fontWeight: "light",
                bottom: RFValue(295),
                left: RFValue(330),
                position: "absolute",
              }}
            >
              Cart
            </Text>
          </TouchableOpacity>
        </Container>

        {carouselVisible &&
          ["accessories", "bottoms", "home", "outerwear", "tops"].includes(
            currentScreen
          ) && (
            <Section
              style={{
                left: RFValue(5),
                position: "relative",
                bottom: screenWidth * .60,
              }}
            >
              <Carousel
                data={carouselData}
                renderItem={renderItem}
                sliderWidth={screenWidth * 1}
                itemWidth={screenWidth * 0.49}
                layout="default"
                layoutCardOffset={RFValue(30)}
                inactiveSlideOpacity={0.4}
                inactiveSlideScale={0.4}
                loop={true}
                autoplay={true}
                autoplayInterval={6000}
              />
              <Trending
                style={{
                  left: RFValue(0),
                  top: RFValue(255),
                  position: "absolute",
                  color: "black",
                  fontSize: RFValue(24),
                  fontWeight: "normal",
                }}
              >
                {screenTextMap[currentScreen]}
              </Trending>
            </Section>
          )}

        <TouchableOpacity
          onPress={() => {
            setCurrentScreen("tops");
            setCarouselVisible(true);
            onTapAway;
          }}
          style={{
            width: RFValue(120),
            height: RFValue(40),
            left: RFValue(30),
            top: RFValue(-200),
            position: "absolute",
          }}
        >
          <View
            style={{
              width: screenWidth * 0.25,
              height: RFValue(23),
              right: screenWidth * 0.2,
              top: screenWidth * 0.18,
              position: "absolute",
              backgroundColor: "#FFCC90",
              borderRadius: RFValue(8),
              borderWidth: RFValue(1),
              borderColor: "black",
            }}
          />
          <Text
            style={{
              width: screenWidth * 0.25,
              height: RFValue(40),
              left: RFValue(2),
              top: screenWidth * 0.19,
              position: "absolute",
              color: "black",
              fontSize: RFValue(14),
              fontWeight: "normal",
            }}
          >
            Tops
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setCurrentScreen("bottoms");
            setCarouselVisible(true);
            onTapAway;
          }}
          style={{
            width: RFValue(120),
            height: RFValue(40),
            left: RFValue(30),
            top: RFValue(-200),
            position: "absolute",
          }}
        >
          <View
            style={{
              width: RFValue(86),
              height: RFValue(23),
              left: RFValue(70),
              bottom: RFValue(65),
              position: "absolute",
              backgroundColor: "#FFCC90",
              borderRadius: RFValue(8),
              borderWidth: RFValue(1),
              borderColor: "black",
            }}
          />
          <Text
            style={{
              width: RFValue(80),
              height: RFValue(40),
              left: RFValue(85),
              bottom: RFValue(47),
              position: "absolute",
              color: "black",
              fontSize: RFValue(14),
              fontWeight: "normal",
            }}
          >
            Bottoms
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setCurrentScreen("outerwear");
            setCarouselVisible(true);
            onTapAway;
          }}
          style={{
            width: RFValue(120),
            height: RFValue(40),
            left: RFValue(30),
            top: RFValue(-200),
            position: "absolute",
          }}
        >
          <View
            style={{
              width: RFValue(86),
              height: RFValue(23),
              left: RFValue(167),
              bottom: RFValue(65),
              position: "absolute",
              backgroundColor: "#FFCC90",
              borderRadius: RFValue(8),
              borderWidth: RFValue(1),
              borderColor: "black",
            }}
          />
          <Text
            style={{
              width: RFValue(80),
              height: RFValue(40),
              left: RFValue(175),
              bottom: RFValue(47),
              position: "absolute",
              color: "black",
              fontSize: RFValue(14),
              fontWeight: "normal",
            }}
          >
            Outerwear
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setCurrentScreen("accessories");
            setCarouselVisible(true);
            onTapAway;
          }}
          style={{
            width: RFValue(120),
            height: RFValue(40),
            left: RFValue(285),
            top: RFValue(-200),
            position: "absolute",
          }}
        >
          <View
            style={{
              width: RFValue(86),
              height: RFValue(23),
              left: RFValue(7),
              bottom: RFValue(65),
              position: "absolute",
              backgroundColor: "#FFCC90",
              borderRadius: RFValue(8),
              borderWidth: RFValue(1),
              borderColor: "black",
            }}
          />
          <Text
            style={{
              width: RFValue(80),
              height: RFValue(40),
              right: RFValue(32),
              bottom: RFValue(47),
              position: "absolute",
              color: "black",
              fontSize: RFValue(14),
              fontWeight: "normal",
            }}
          >
            Accessories
          </Text>
        </TouchableOpacity>

        <Pressable
          onPress={() => {
            setCurrentScreen("home");
            setCarouselVisible(true);
            onTapAway;
          }}
        >
          <Logo
            style={{
              width: screenWidth * 0.96,
              height: screenWidth * .28,
              bottom: screenWidth * 1.29,
              position: "absolute",
            }}
            source={{
              uri: "/Users/student/galorewayz/assets/galore-logo.png",
            }}
          />
        </Pressable>
      </Section>
    </Container>
  );
};

export default App;
