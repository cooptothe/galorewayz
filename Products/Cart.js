import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList, Image } from "react-native";
import { styled } from "nativewind";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Container = styled(View);
const ProductItem = styled(View);
const ProductImage = styled(Image);
const ProductInfo = styled(View);
const ProductTitle = styled(Text);
const ProductPrice = styled(Text);
const Logo = styled(Image);

const Cart = () => {
  const [cart, setCart] = useState({ id: null, checkoutUrl: null, lines: [] });

  useEffect(() => {
    const getCart = async () => {
      let localCartData = JSON.parse(
        await AsyncStorage.getItem("galorewayz:shopify:cart")
      );

      if (localCartData) {
        setCart({
          id: localCartData.id,
          checkoutUrl: localCartData.checkoutUrl,
          estimatedCost: null,
          lines: [],
        });

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
          estimatedCost: null,
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
    <ProductItem>
      <ProductImage
        source={{ uri: item.image }}
        style={{ width: 50, height: 50 }}
      />
      <ProductInfo>
        <ProductTitle>{item.title}</ProductTitle>
        <ProductPrice>{`$${item.price}`}</ProductPrice>
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
    
    <Container
      className="Frame7 w-96 h-72 left-[12px] top-[185px] absolute"
    >

      {cart.lines.length === 0 ? (
        <Text
          style={{ fontSize: 24, textAlign: "center", marginTop: 20, top: 300 }}
        >
        Your cart is empty!
        </Text>

         
      ) : (
        <>
          <FlatList
            data={cart.lines}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
          />

          <TouchableOpacity
            onPress={handleCheckout}
            style={{
              backgroundColor: "#FFCC90",
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
              padding: 10,
              marginTop: 20,
            }}
          >
            <Text
              style={{ color: "black", fontSize: 16, fontWeight: "normal" }}
            >
              Checkout
            </Text>
          </TouchableOpacity>
          {/* Add the Empty Cart button */}
          <TouchableOpacity
            onPress={handleEmptyCart}
            style={{
              backgroundColor: "#FF6347",
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
              padding: 10,
              marginTop: 10,
            }}
          >
            <Text
              style={{ color: "white", fontSize: 16, fontWeight: "normal" }}
            >
              Empty Cart
            </Text>
          </TouchableOpacity>
        </>
      )}
    </Container>
  );
};

export default Cart;
