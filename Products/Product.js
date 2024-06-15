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
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from "react-native-responsive-screen";
import NavBar from "../NavBar";

const window = Dimensions.get("window");
const screenWidth = window.width;
const screenHeight = window.height;

const Container = styled(View);
const ProductImage = styled(Image);
const ProductTitle = styled(Text);
const ProductPrice = styled(Text);
const Option = styled(TouchableOpacity);
const Section = styled(View);

const Product = ({ handle, onClose }) => {
  const [product, setProduct] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [product2, setProduct2] = useState(null);

  useEffect(() => {
    // Fetch product by handle
    const fetchProductByHandle = async () => {
      try {
        const response = await fetch(
          `https://us-central1-galore-wayz-b0b8f.cloudfunctions.net/api/getProductByHandle/${handle}`
        );
        const data = await response.json();
        setProduct(data.data.product);
        setProduct2(data.data.product);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProductByHandle();
  }, [handle]); // Update when the handle prop changes

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
        const result = await fetch(
          "https://us-central1-galore-wayz-b0b8f.cloudfunctions.net/api/addToCart",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              cartId: localCartData.id,
              variantId: selectedVariant,
            }),
          }
        );

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

  const handleBack = () => {
    onClose();
  }

  return (
    <Section
      style={{
        position: "absolute",
        width: screenWidth * 0.96,
        alignSelf: "center",
        bottom: RFValue(-200),
        marginBottom: RFValue(5)
      }}
    >
      <Section
        style={{
          position: "absolute",
          width: RFValue(400),
          bottom: RFValue(60),
          alignSelf: "center",
          marginBottom: RFValue(5)
        }}
      >
        {/* Image gallery */}
        <FlatList
          horizontal
          data={mediaEdges}
          keyExtractor={(item) => item.node.previewImage.url}
          renderItem={({ item }) => (
            <ProductImage
              source={{ uri: item.node.previewImage.url }}
              resizeMode="contain"
              style={{
                height: RFValue(450),
                width: RFValue(400),
                top: RFValue(60),
                alignSelf: "center",
                marginBottom: RFValue(10)
              }}
            />
          )}
          pagingEnabled={true} // Enable pagination for scrolling through each image
        />
      </Section>
      <View style={{ top: RFValue(80), right: RFValue(10) }}>
        {/* Product info */}
        <View>
          <ProductTitle
            style={{
              fontSize: RFValue(13),
              fontWeight: "bold",
              color: "black",
              alignSelf: "center",
              alignItems: "center",
              justifyContent: "center",
              top: RFValue(25),
            }}
          >
            {title}
          </ProductTitle>
          <ProductPrice
            style={{
              fontSize: RFValue(10),
              color: "gray",
              marginTop: RFValue(2),
              alignSelf: "center",
              alignItems: "center",
              justifyContent: "center",
              bottom: RFValue(5),
            }}
          >{`$${priceAmount}0`}</ProductPrice>

          {/* Color selection */}
          <Text
            style={{
              fontSize: RFValue(11),
              marginTop: RFValue(10),
            }}
          >
            Select Option:
          </Text>
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
                  marginTop: RFValue(5),
                  marginRight: RFValue(5),
                }}
              >
                <Text>{item.node.title}</Text>
              </Option>
            )}
          />

          {/* Description */}
          <Text
            style={{
              fontSize: RFValue(9),
              marginTop: RFValue(5),
              marginRight: RFValue(5),
              alignContent: "center",
            }}
          >
            {description}
          </Text>
          {/* Add to bag button */}
          <TouchableOpacity
            onPress={handleAddToBag}
            style={{
              marginTop: RFValue(5),
              width: RFValue(80),
              height: RFValue(20),
              backgroundColor: "#FFCC90",
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "center",
              borderColor: "black",
              borderWidth: 1,
            }}
            disabled={!selectedOption}
          >
            <Text
              style={{
                color: "black",
                fontSize: RFValue(12),
                fontWeight: "normal",
                alignSelf: "center",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Add to Bag
            </Text>
          </TouchableOpacity>

          {/* back button */}
          <TouchableOpacity
            onPress={handleBack}
            style={{
              width: RFValue(50),
              height: RFValue(20),
              backgroundColor: "#FF6349",
              borderRadius: RFValue(8),
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "center",
              borderColor: "black",
              borderWidth: 1,
              marginTop: RFValue(5),
            }}
          >
            <Text
              style={{
                color: "black",
                fontSize: RFValue(12),
                fontWeight: "normal",
                alignSelf: "center",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Return
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Section>
  );
};

export default Product;
