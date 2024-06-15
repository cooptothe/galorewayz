import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Linking,
  AppState,
} from "react-native";
import { styled } from "nativewind";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Product from "./Product";
import { RFValue } from "react-native-responsive-fontsize";
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from "react-native-responsive-screen";
import * as Notifications from "expo-notifications";

const window = Dimensions.get("window");
const screenWidth = window.width;
const screenHeight = window.height;

const Container = styled(View);
const ProductItem = styled(View);
const ProductImage = styled(Image);
const ProductInfo = styled(View);
const ProductTitle = styled(Text);
const ProductPrice = styled(Text);
const Logo = styled(Image);
const Section = styled(View);

const Cart = () => {
  const [cart, setCart] = useState({ id: null, checkoutUrl: null, lines: [] });

  const getCart = async () => {
    let localCartData = JSON.parse(
      await AsyncStorage.getItem("galorewayz:shopify:cart")
    );

    console.log(localCartData);

    if (localCartData) {
      const existingCart = await fetch(
        `https://us-central1-galore-wayz-b0b8f.cloudfunctions.net/api/getCart/${encodeURIComponent(
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
      console.log("Before fetch");
      const response = await fetch(
        "https://us-central1-galore-wayz-b0b8f.cloudfunctions.net/api/createCart"
      );
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

  useEffect(() => {
    // Fetch initial cart data
    console.log(cart);
    getCart();
  }, [cart.lines.length]);

  const renderItem = ({ item }) => (
    <ProductItem
      style={{
        paddingTop: RFValue(10),
        paddingLeft: RFValue(10),
        width: widthPercentageToDP("90%"),
        height: heightPercentageToDP("18%"),
      }}
    >
      <ProductImage
        keyExtractor={(item) => item.node.id}
        source={{ uri: item.node.merchandise.image.url }}
        style={{
          width: widthPercentageToDP("20%"),
          height: heightPercentageToDP("10%"),
        }}
      />
      <ProductInfo>
        <ProductTitle
          style={{
            color: "black",
            fontSize: RFValue(13),
            fontWeight: "normal",
            textAlign: "left",
          }}
        >
          {item.node.merchandise.product.title}
        </ProductTitle>
        <ProductTitle
          style={{ color: "black", fontSize: RFValue(9), fontWeight: "300" }}
        >
          Size/Color: {item.node.merchandise.title}
        </ProductTitle>
        <ProductPrice
          style={{
            color: "black",
            fontSize: RFValue(10),
            fontWeight: "bold",
            textAlign: "right",
            marginTop: 1,
          }}
        >
          Price: {`$${item.node.merchandise.price.amount}0`}
        </ProductPrice>
      </ProductInfo>
    </ProductItem>
  );

  const handleEmptyCart = async () => {
    try {
      // Clear the cart data in AsyncStorage
      await AsyncStorage.removeItem("galorewayz:shopify:cart");

      // Update the state to reflect the empty cart
      setCart({ id: null, checkoutUrl: null, lines: [] });

      // run get cart
      getCart();

      console.log("Cart emptied successfully");
    } catch (error) {
      console.error("Error emptying the cart:", error);
    }
  };

  const handleCheckout = () => {
    if (cart.checkoutUrl) {
      Linking.openURL(cart.checkoutUrl)
        .then((result) => {
          console.log("Opened successfully:", result);
        })
        .catch((error) => {
          console.error("Error opening URL:", error);
        });
    } else {
      console.warn("Checkout URL is not available.");
    }
  };

  return (
    <Container
      style={{
        backgroundColor: "white",
        position: "absolute",
        width: widthPercentageToDP("100%"),
        height: heightPercentageToDP("0%"),
      }}
    >
      {cart.lines.length === 0 ? (
        <Section>
          <Text
            style={{
              fontSize: RFValue(20),
              position: "absolute",
              width: widthPercentageToDP("100%"),
              height: heightPercentageToDP("100%"),
              textAlign: "center",
              top: RFValue(400),
            }}
          >
            Your cart is empty!
          </Text>
        </Section>
      ) : (
        <>
          <Container
            style={{
              position: "absolute",
              width: screenWidth * 0.96,
              height: screenWidth * 0.96,
              top: RFValue(160),
            }}
          >
            <FlatList
              data={cart.lines}
              renderItem={renderItem}
              key={(item) => item.node.id}
            />
          </Container>

          <Container
            style={{
              position: "absolute",
              alignSelf: "center",
              width: widthPercentageToDP("28%"),
              height: heightPercentageToDP("10%"),
              justifyContent: "center",
              alignItems: "center",
              top: RFValue(580),
            }}
          >
            <Text
              style={{
                color: "black",
                fontSize: RFValue(12),
                fontWeight: "bold",
                alignSelf: "center",
                marginBottom: RFValue(10),
              }}
            >
              Total: {`$${cart.cost.totalAmount.amount}0`}
            </Text>
            <TouchableOpacity
              onPress={handleCheckout}
              style={{
                width: RFValue(100),
                height: RFValue(25),
                backgroundColor: "#FFCC90",
                borderRadius: RFValue(10),
                justifyContent: "center",
                alignItems: "center",
                borderColor: "black",
                alignSelf: "center",
                borderWidth: 1,
                marginBottom: RFValue(5),
              }}
            >
              <Text
                style={{
                  color: "black",
                  fontSize: RFValue(12),
                  fontWeight: "normal",
                }}
              >
                Checkout
              </Text>
            </TouchableOpacity>
            {/* Add the Empty Cart button */}
            <TouchableOpacity
              onPress={handleEmptyCart}
              style={{
                width: RFValue(80),
                height: RFValue(20),
                backgroundColor: "#FF6347",
                borderRadius: RFValue(8),
                justifyContent: "center",
                alignItems: "center",
                alignSelf: "center",
                borderColor: "black",
                borderWidth: 1,
              }}
            >
              <Text
                style={{
                  color: "black",
                  fontSize: RFValue(10),
                  fontWeight: "normal",
                }}
              >
                Empty Cart
              </Text>
            </TouchableOpacity>
          </Container>
        </>
      )}
    </Container>
  );
};

export default Cart;
