import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";
import { styled } from "nativewind";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RFValue } from "react-native-responsive-fontsize";
import { widthPercentageToDP, heightPercentageToDP } from "react-native-responsive-screen";

const window = Dimensions.get("window");
const screenWidth = window.width;
const screenHeight = window.height;


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
      style={{ backgroundColor: "white", bottom: RFValue(250), right: screenWidth * .05 }}
    >
      {/* Image gallery */}
      <FlatList
        horizontal
        data={mediaEdges}
        keyExtractor={(item) => item.node.previewImage.url}
        renderItem={({ item }) => (
          <ProductImage
            source={{ uri: item.node.previewImage.url }}
            style={{ flex: 3, height: heightPercentageToDP("50%"), width: widthPercentageToDP("100%") }}
            resizeMode="contain"
          />
        )}
      />

      {/* Add to bag button */}
      <TouchableOpacity
        onPress={handleAddToBag}
        style={{
          width: RFValue(100),
          height: RFValue(25),
          backgroundColor: "#FFCC90",
          borderRadius: 10,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 5,
          alignSelf: 'center',
          borderColor: "black",
          borderWidth: 1,
          bottom: RFValue(50)
        }}
        disabled={!selectedOption}
      >
        <Text style={{ color: "black", fontSize: RFValue(14), fontWeight: "normal" }}>
          Add to Bag
        </Text>
      </TouchableOpacity>

      {/* Product info */}
      <Container style={{ marginTop: RFValue(1), bottom: RFValue(30) }}>
        <ProductTitle
          style={{ fontSize: RFValue(15), fontWeight: "bold", color: "black" }}
        >
          {title}
        </ProductTitle>
        <ProductPrice
          style={{ fontSize: RFValue(13), color: "gray", marginTop: 8 }}
        >{`$${priceAmount}0`}</ProductPrice>

        {/* Color selection */}
        <Text style={{ fontSize: RFValue(13), marginTop: RFValue(5) }}>Select Option:</Text>
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
                borderRadius: RFValue(5),
                padding: RFValue(5),
                marginTop: RFValue(10),
                marginRight: RFValue(10),
              }}
            >
              <Text>{item.node.title}</Text>
            </Option>
          )}
        />

        {/* Description */}
        <Text style={{ fontSize: RFValue(10), marginTop: RFValue(10) }}>{description}</Text>
      </Container>
    </Container>
  );
};

export default Product;
