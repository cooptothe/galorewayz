import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  TouchableWithoutFeedback,
} from "react-native";
import { styled } from "nativewind";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Container = styled(View);
const ProductImage = styled(Image);
const ProductTitle = styled(Text);
const ProductPrice = styled(Text);
const Option = styled(TouchableOpacity);

const Product = ({ handle, onClose, setCarouselVisible, cart }) => {
  const [product, setProduct] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [product2, setProduct2] = useState(null);
  let variant;


  useEffect(() => {
    // Fetch product by handle
    const fetchProductByHandle = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/getProductByHandle/${handle}`
        );
        const data = await response.json();
        setProduct(data.data.product);
        setProduct2(data.data.product)
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProductByHandle();
  }, [handle]); // Update when the handle prop changes

  const handleContainerTap = () => {
    // Handle tap outside the container
    onClose();
  };

  // Check if product is still being fetched
  if (!product) {
    return <Text>Loading...</Text>;
  }

  // Destructure product object
  const {
    id,
    title,
    description,
    media: { edges: mediaEdges },
    variants: { edges: variantEdges },
  } = product;


  // Access the price amount
  const priceAmount = variantEdges[0]?.node.price.amount || 0;

  const handleAddToBag = async () => {
    try {
      // Perform the logic for adding to the bag here
      let localCartData = JSON.parse(
        await AsyncStorage.getItem("galorewayz:shopify:cart")
      );

      console.log(localCartData.id);
      console.log(selectedVariant);

      if (selectedOption) {
        const result = await fetch("http://localhost:3001/addToCart", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cartId: localCartData.id,
            variantId: selectedVariant,
          }),
        });

        if (result.ok) {
          const data = await result.json();
          console.log("Successfully added to cart:", data);
          // Handle success as needed
        } else {
          console.error(
            "Failed to add to cart. Server responded with:",
            result.status
          );
          // Handle failure as needed
        }

        // For now, just reset the product and close the Product component
        onClose();
      } else {
        alert("Please select color and size before adding to bag");
      }
    } catch (error) {
      console.error("Error adding to bag:", error);
      // Handle error as needed
    }
  };

  // console.log(variant);

  return (
    <Container
      style={{ backgroundColor: "white", padding: 15, bottom: 400, left: -30 }}
    >
      {/* Image gallery */}
      <FlatList
        horizontal
        data={mediaEdges}
        keyExtractor={(item) => item.node.previewImage.url}
        renderItem={({ item }) => (
          <ProductImage
            source={{ uri: item.node.previewImage.url }}
            style={{ flex: 3, height: 400, width: 325, left: 30, top: 70 }}
            resizeMode="contain"
          />
        )}
      />

      {/* Add to bag button */}
      <TouchableOpacity
        onPress={handleAddToBag}
        style={{
          width: 120,
          height: 30,
          backgroundColor: "#FFCC90",
          borderRadius: 10,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 5,
          left: 130,
          borderColor: "black",
          borderWidth: 1,
        }}
        disabled={!selectedOption}
      >
        <Text style={{ color: "black", fontSize: 16, fontWeight: "normal" }}>
          Add to Bag
        </Text>
      </TouchableOpacity>

      {/* Product info */}
      <Container style={{ marginTop: 10 }}>
        <ProductTitle
          style={{ fontSize: 20, fontWeight: "bold", color: "black" }}
        >
          {title}
        </ProductTitle>
        <ProductPrice
          style={{ fontSize: 16, color: "gray", marginTop: 8 }}
        >{`$${priceAmount}0`}</ProductPrice>

        {/* Color selection */}
        <Text style={{ fontSize: 16, marginTop: 10 }}>Select Option:</Text>
        <FlatList
          horizontal
          data={variantEdges}
          keyExtractor={(item) => item.node.id}
          renderItem={({ item }) => (
            <Option
              onPress={() => {
                setSelectedOption(item.node.title);
                setSelectedVariant(item.node.id);
              }}
              disabled={item.node.quantityAvailable === 0}
              style={{
                backgroundColor:
                item.node.title === selectedOption ? "#FFCC90" : "white",
                borderWidth: 1,
                borderColor: "black",
                borderRadius: 5,
                padding: 5,
                marginTop: 10,
                marginRight: 10,
              }}
            >
              <Text>{item.node.title}</Text>
            </Option>
          )}
        />

        {/* Description */}
        <Text style={{ fontSize: 14, marginTop: 5 }}>{description}</Text>
      </Container>
    </Container>
  );
};

export default Product;
