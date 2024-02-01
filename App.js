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
import { widthPercentageToDP, heightPercentageToDP } from "react-native-responsive-screen";

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
        "https://cdn.shopify.com/s/files/1/0680/4815/8968/files/valentines_collection-4.png?v=1706045692",
    },
    {
      imageUrl:
        "https://cdn.shopify.com/s/files/1/0680/4815/8968/files/BD0BC418-F0B7-49F7-B565-257B67D9DC7A.png?v=1704739453",
    },
    {
      imageUrl:
        "https://cdn.shopify.com/s/files/1/0680/4815/8968/files/valentines_collection-2_292379ec-1148-4cbe-9021-488942237d33.png?v=1706045619",
    },
    {
      imageUrl:
        "https://cdn.shopify.com/s/files/1/0680/4815/8968/files/Welcome_to_our_website_-_2.png?v=1704671408",
    },
    {
      imageUrl:
        "https://cdn.shopify.com/s/files/1/0680/4815/8968/files/Untitled_design-4.png?v=1704942366",
    },
  ];

  const renderItem = ({ item }) => (
    <View
      style={{
        width: screenWidth * 0.8,
        height: screenWidth * 0.8,
        alignSelf: 'center',
        alignItems: 'center',
      }}
    >
      <Image
        style={{
          width: widthPercentageToDP('96%'),
          height: heightPercentageToDP('22%'),
          borderRadius: RFValue(15),
          alignSelf: 'center',
          resizeMode: 'cover',
          top: RFValue(85)
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
      <Section style={{ position: "absolute", top: screenWidth * 0.96 }}>
        {carouselVisible &&
          ["accessories", "bottoms", "home", "outerwear", "tops"].includes(
            currentScreen
          ) && (
            <Section
              style={{
                right: RFValue(0),
                position: "relative",
                bottom: screenWidth * 0.68,
              }}
            >
              <Carousel
                data={carouselData}
                renderItem={renderItem}
                sliderWidth={widthPercentageToDP('100%')}
                sliderHeight={heightPercentageToDP('100%')}
                itemWidth={widthPercentageToDP('100%')}
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
                  top: RFValue(253),
                  position: "absolute",
                  color: "black",
                  fontSize: RFValue(24),
                  fontWeight: "normal",
                  left: RFValue(10),
                }}
              >
                {screenTextMap[currentScreen]}
              </Trending>
            </Section>
          )}
      </Section>

      <Container style={{ top: screenWidth * 0.105, alignSelf: "flex-start" }}>
        {renderScreen()}
      </Container>

      {/* NAV */}
      <Section style={{ top: screenWidth * 0.96 }}>
        <TouchableOpacity
          onPress={() => {
            setCurrentScreen("tops");
            setCarouselVisible(true);
          }}
          style={{
            right: RFValue(165),
            top: RFValue(-200),
            position: "absolute",
          }}
        >
          <View
            style={{
              width: screenWidth * 0.23,
              height: RFValue(23),
              right: screenWidth * 0.23,
              top: screenWidth * 0.11,
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
              right: RFValue(45),
              top: screenWidth * 0.12,
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
          }}
          style={{
            left: RFValue(30),
            top: RFValue(-200),
            position: "absolute",
          }}
        >
          <View
            style={{
              width: screenWidth * 0.23,
              height: RFValue(23),
              left: screenWidth * 0.165,
              top: screenWidth * 0.11,
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
              left: RFValue(62),
              top: screenWidth * 0.12,
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
          }}
          style={{
            left: RFValue(30),
            top: RFValue(-200),
            position: "absolute",
          }}
        >
          <View
            style={{
              width: screenWidth * 0.23,
              height: RFValue(23),
              left: screenWidth * 0.41,
              top: screenWidth * 0.11,
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
              left: RFValue(132),
              top: screenWidth * 0.12,
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
          }}
          style={{
            right: RFValue(-92),
            top: RFValue(-200),
            position: "absolute",
          }}
        >
          <View
            style={{
              width: screenWidth * 0.23,
              height: RFValue(23),
              right: screenWidth * 0.31,
              top: screenWidth * 0.11,
              position: "absolute",
              backgroundColor: "#FFCC90",
              borderRadius: RFValue(8),
              borderWidth: RFValue(1),
              borderColor: "black",
            }}
          />
          <Text
            style={{
              width: screenWidth * 0.23,
              height: RFValue(40),
              right: RFValue(95),
              top: screenWidth * 0.123,
              position: "absolute",
              color: "black",
              fontSize: RFValue(12.5),
              fontWeight: "normal",
            }}
          >
            Accessories
          </Text>
        </TouchableOpacity>
      </Section>

      {/* LOGO */}
      <Section>
        <Pressable
          onPress={() => {
            setCurrentScreen("home");
            setCarouselVisible(true);
          }}
        >
          <Logo
            style={{
              width: screenWidth * 0.96,
              height: screenWidth * 0.3,
              top: screenWidth * 0.12,
              position: "relative",
              alignSelf: "center",
            }}
            source={{
              uri: "/Users/student/galorewayz/assets/galore-logo.png",
            }}
          />
        </Pressable>
      </Section>

      {/* cart */}
      <TouchableOpacity
        onPress={() => {
          setCurrentScreen("cart");
          setCarouselVisible(true);
        }}
        style={{
          top: screenWidth * .01,
          alignSelf: 'flex-end',
          right: RFValue(10)
        }}
      >
        <Image
          style={{
            width: RFValue(20),
            height: RFValue(20),
            position: "relative",
          }}
          source={{
            uri: "/Users/student/galorewayz/assets/Shopping-bag.png",
          }}
        />
        <Text
          style={{
            color: "black",
            fontSize: RFValue(10),
            fontWeight: "light",
            position: "relative",
          }}
        >
          Cart
        </Text>
      </TouchableOpacity>
    </Container>
  );
};

export default App;
