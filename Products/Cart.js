import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList, Image } from "react-native";
import { styled } from "nativewind";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Product from "./Product";
import App from "../App";

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

  const renderItem = ({ item }) => (
    <ProductItem style={{ alignSelf: "left"}}>
      <ProductImage
        source={{ uri: item.node.merchandise.image.url }}
        style={{ width: 50, height: 50 }}
      />
      <ProductInfo >
        <ProductTitle>{item.node.merchandise.product.handle}</ProductTitle>
        <ProductTitle>Size/Color: {item.node.merchandise.title}</ProductTitle>
        <ProductPrice>Price: {`$${item.node.merchandise.price.amount}`}</ProductPrice>
      </ProductInfo>
    </ProductItem>
  );
  

  const handleEmptyCart = async () => {
    try {
      // Clear the cart data in AsyncStorage
      await AsyncStorage.removeItem("galorewayz:shopify:cart");

      // Update the state to reflect the empty cart
      setCart({ id: null, checkoutUrl: null, lines: [] });

      console.log("Cart emptied successfully");
    } catch (error) {
      console.error("Error emptying the cart:", error);
    }
  };

  const handleCheckout = () => {
    // Implement the logic to navigate to the checkout screen or perform the checkout action
    // This can include additional API calls and navigation logic
    // For now, let's just log a message
    console.log("Proceeding to checkout...");
  };


  return (
    <Container style={{ backgroundColor: "white", padding: 192, alignItems: "center", alignSelf: 'center' }}>
      {cart.lines.length === 0 ? (
        <Section style={{ alignSelf: "center", alignItems: "center", top: 100, position: "absolute", }}>
          <Text style={{ fontSize: 18, top: 300, position: "absolute", }}>
            Your cart is empty!
          </Text>
        </Section>
      ) : (
        <>
        <Container style={{ position: "absolute", top: 300, width: 800, left: 0 }}>
            <FlatList
              data={cart.lines}
              renderItem={renderItem}
              keyExtractor={(item) => item.node.id} />
          </Container>
          <Container style={{ position: "absolute", top: 800 }}>
              <TouchableOpacity
                onPress={handleCheckout}
                style={{
                  width: 120,
                  height: 30,
                  backgroundColor: "#FFCC90",
                  borderRadius: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 5,
                  borderColor: "black",
                  borderWidth: 1,
                  bottom: 100
                }}
              >
                <Text style={{ color: "black", fontSize: 16, fontWeight: "normal" }}>
                  Checkout
                </Text>
              </TouchableOpacity>
              {/* Add the Empty Cart button */}
              <TouchableOpacity
                onPress={handleEmptyCart}
                style={{
                  width: 120,
                  height: 30,
                  backgroundColor: "#FF6347",
                  borderRadius: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 5,
                  borderColor: "black",
                  borderWidth: 1,
                  bottom: 100
                }}
              >
                <Text style={{ color: "white", fontSize: 16, fontWeight: "normal" }}>
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
