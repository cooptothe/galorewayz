// App.js
import React, { useState } from "react";
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
import Cart from "./Products/Cart";
import NavBar from "./NavBar";
import { RFValue } from "react-native-responsive-fontsize";
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from "react-native-responsive-screen";
import * as Notifications from "expo-notifications";

// push notifications
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const window = Dimensions.get("window");
const screenWidth = window.width;
const Section = styled(View);
const Trending = styled(Text);
const Logo = styled(Image);

const App = () => {
  const [carouselVisible, setCarouselVisible] = useState(true); // State for carousel visibility
  const [currentScreen, setCurrentScreen] = useState("home");

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
        return <Cart />;
      default:
        return null;
    }
  };

  const screenTextMap = {
    accessories: "Accessories",
    bottoms: "Bottoms",
    home: "Trending",
    outerwear: "Outerwear",
    tops: "Tops",
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
        width: screenWidth * 0.96,
        height: screenWidth * 0.96,
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
          bottom: RFValue(0),
        }}
        source={{ uri: item.imageUrl }}
      />
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      {/* renderScreen */}
      {renderScreen()}

      {/* Carousel */}
      <Section
        style={{
          position: "absolute",
          top: RFValue(125), // Adjust the vertical position as needed
          left: 0,
          right: 0,
          alignItems: "center", // Center horizontally
          height: screenWidth * 0.8,
          marginTop: RFValue(40),
        }}
      >
        {carouselVisible &&
          ["accessories", "bottoms", "home", "outerwear", "tops"].includes(
            currentScreen
          ) && (
            <Section style={{}}>
              <Carousel
                data={carouselData}
                renderItem={renderItem}
                sliderWidth={widthPercentageToDP("100%")}
                itemWidth={widthPercentageToDP("100%")} // Adjust the width as needed
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
                  marginTop: RFValue(165),
                  backgroundColor: "white",
                }}
              >
                {screenTextMap[currentScreen]}
              </Trending>
            </Section>
          )}
      </Section>

      {/* LOGO */}
      <Section style={{ alignItems: "center", top: RFValue(35) }}>
        <Pressable
          onPress={() => {
            setCurrentScreen("home");
            setCarouselVisible(true);
          }}
        >
          <Logo
            style={{
              width: screenWidth * 0.80,
              height: screenWidth * 0.3,
            }}
            source={{
              uri: "https://cdn.shopify.com/s/files/1/0680/4815/8968/files/galore-logo.png?v=1709226912",
            }}
          />
        </Pressable>
      </Section>

      {/* cart */}
      <Section
        style={{
          position: "absolute",
          top: RFValue(45),
          right: RFValue(25),
          height: RFValue(1),
        }}
      >
        <TouchableOpacity
          onPress={() => {
            setCurrentScreen("cart");
            setCarouselVisible(true);
          }}
          style={{
            alignItems: "center",
          }}
        >
          <Image
            style={{
              width: RFValue(20),
              height: RFValue(20),
            }}
            source={{
              uri: "https://cdn.shopify.com/s/files/1/0680/4815/8968/files/Shopping-bag.png?v=1709226925",
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

      {/* NAV */}
      <NavBar
        setCarouselVisible={setCarouselVisible}
        currentScreen={currentScreen}
        setCurrentScreen={setCurrentScreen}
      />

      {/* Image Banner Section (Fixed at the bottom) */}
      <Section style={{ alignItems: "center", top: RFValue(540) }}>
        <Image
          className="w-40 h-20 relative"
          source={{
            uri: "https://cdn.shopify.com/s/files/1/0680/4815/8968/files/Web_banner.png?v=1705947435",
          }}
        />
      </Section>
    </View>
  );
};

export default App;
