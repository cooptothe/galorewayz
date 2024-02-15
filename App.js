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
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from "react-native-responsive-screen";

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
        alignSelf: "center",
        alignItems: "center",
      }}
    >
      <Image
        style={{
          width: widthPercentageToDP("96%"),
          height: heightPercentageToDP("22%"),
          borderRadius: RFValue(15),
          alignSelf: "center",
          resizeMode: "cover",
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
      <Section style={{ position: "absolute", top: screenHeight * 0.85 }}>
        {carouselVisible &&
          ["accessories", "bottoms", "home", "outerwear", "tops"].includes(
            currentScreen
          ) && (
            <Section 
            style={{
              position: "absolute",
              bottom: screenWidth * .5
            }}>
              <Carousel
                data={carouselData}
                renderItem={renderItem}
                sliderWidth={widthPercentageToDP("100%")}
                itemWidth={widthPercentageToDP("100%")}
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
            position: "absolute",
            color: "black",
            fontSize: RFValue(24),
            fontWeight: "normal",
            left: RFValue(10),
            top: screenHeight * .22
          }}
        >
          {screenTextMap[currentScreen]}
        </Trending>
            </Section>
          )}
      </Section>

      <Container style={{ position: "absolute", bottom: screenHeight * 0.05 }}>
        {renderScreen()}
      </Container>

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
              position: "absolute",
              top: screenHeight * 0.06,
              left: (screenWidth - screenWidth * 0.96) / 2,
              alignSelf: "center",
            }}
            source={{
              uri: "/Users/student/galorewayz/assets/galore-logo.png",
            }}
          />
        </Pressable>
      </Section>

      {/* NAV */}
      <Section
        style={{
          top: screenHeight * 0.2,
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            setCurrentScreen("tops");
            setCarouselVisible(true);
          }}
          style={{
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: screenWidth * 0.23,
              height: RFValue(23),
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
              color: "black",
              fontSize: RFValue(14),
              fontWeight: "normal",
              textAlign: "center",
              bottom: RFValue(20),
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
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: screenWidth * 0.23,
              height: RFValue(23),
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
              color: "black",
              fontSize: RFValue(14),
              fontWeight: "normal",
              textAlign: "center",
              bottom: RFValue(20),
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
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: screenWidth * 0.23,
              height: RFValue(23),
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
              color: "black",
              fontSize: RFValue(14),
              fontWeight: "normal",
              textAlign: "center",
              bottom: RFValue(20),
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
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: screenWidth * 0.23,
              height: RFValue(23),
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
              color: "black",
              fontSize: RFValue(13),
              fontWeight: "normal",
              textAlign: "center",
              bottom: RFValue(20),
            }}
          >
            Accessories
          </Text>
        </TouchableOpacity>
      </Section>

      {/* cart */}
      <Section>
        <TouchableOpacity
          onPress={() => {
            setCurrentScreen("cart");
            setCarouselVisible(true);
          }}
          style={{
            position: "absolute",
            alignSelf: "flex-end",
            right: RFValue(10),
            alignItems: "center",
          }}
        >
          <Image
            style={{
              width: RFValue(20),
              height: RFValue(20),
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
              marginTop: RFValue(1),
            }}
          >
            Cart
          </Text>
        </TouchableOpacity>
      </Section>

    </Container>
  );
};

export default App;
