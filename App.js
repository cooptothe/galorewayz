// App.js
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Pressable,
  Dimensions,
  ScrollView,
  Button,
  Platform
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
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';


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
const screenHeight = window.height;

const Container = styled(View);
const Section = styled(View);
const Trending = styled(Text);
const Logo = styled(Image);

const App = ({ onTapAway }) => {
  const [currentScreen, setCurrentScreen] = useState("home");
  const [carouselVisible, setCarouselVisible] = useState(true); // State for carousel visibility
  const [cart, setCart] = useState({ id: null, checkoutUrl: null, lines: [] });
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();


  useEffect(() => {
    schedulePushNotification()
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
        const response = await fetch("http:/localhost:3001/createCart");

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

  async function schedulePushNotification() {
    // Set the trigger to every Sunday at 3 PM
    const triggerDay = 0; // 0 corresponds to Sunday
    const triggerHour = 15; // 24-hour format, 15 corresponds to 3 PM
  
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "New Arrivals! 🚨",
        body: 'Come shop latest the gear!',
      },
      trigger: {
        weekDay: triggerDay,
        hour: triggerHour,
        minute: 0, // Set the minute to 0 (top of the hour)
      },
    });
  }

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
          bottom: RFValue(0)
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
    <View style={{ flex: 1 }}>
      {/* renderScreen */}
        {renderScreen()}

      {/* Carousel */}
      <Section
        style={{
          position: "absolute",
          top: RFValue(120), // Adjust the vertical position as needed
          left: 0,
          right: 0,
          alignItems: "center", // Center horizontally
          height: screenWidth * 0.5,
          marginTop: RFValue(40)
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
                  backgroundColor: 'white'
                }}
              >
                {screenTextMap[currentScreen]}
              </Trending>
            </Section>
          )}
      </Section>

      {/* LOGO */}
      <Section style={{ alignItems: "center", top: RFValue(35)}}>
        <Pressable
          onPress={() => {
            setCurrentScreen("home");
            setCarouselVisible(true);
          }}
        >
          <Logo
            style={{
              width: screenWidth * 0.96,
              height: screenWidth * 0.29,
            }}
            source={{
              uri: "https://cdn.shopify.com/s/files/1/0680/4815/8968/files/galore-logo.png?v=1709226912",
            }}
          />
        </Pressable>
      </Section>

      {/* cart */}
      <Section
        style={{ position: "absolute", top: RFValue(50), right: RFValue(10), height: RFValue(1) }}
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
      <Section
        style={{
          position: "absolute",
          top: RFValue(90), // Adjust the value as needed
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-evenly",
          height: RFValue(1),
          marginTop: RFValue(45)
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
    </View>
  );
};

export default App;
