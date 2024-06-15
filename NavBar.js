// NavBar.js
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  Dimensions,
} from "react-native";
import { styled } from "nativewind";
import { RFValue } from "react-native-responsive-fontsize";

const window = Dimensions.get("window");
const screenWidth = window.width;
const Section = styled(View);

const NavBar = ({ currentScreen, setCarouselVisible, setCurrentScreen }) => {
  return (
    <View>
      <Section
        style={{
          position: "absolute",
          top: RFValue(-15), // Adjust the value as needed
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-evenly",
          height: RFValue(1),
          marginTop: RFValue(45),
          left: RFValue(5)
        }}
      >
        <TouchableOpacity
          onPress={() => {
            setCurrentScreen("tops");
            setCarouselVisible(true);
          }}
          style={{
            alignItems: "center",
            width: screenWidth * 0.1,
            height: RFValue(0),
          }}
        >
          <View
            style={{
              width: screenWidth * 0.2,
              height: RFValue(20),
              backgroundColor: "#FFCC90",
              borderRadius: RFValue(8),
              borderWidth: RFValue(1),
              borderColor: "black",
            }}
          >
            <Text
              style={{
                color: "black",
                fontSize: RFValue(10),
                fontWeight: "normal",
                textAlign: "center",
                top: RFValue(3),
              }}
            >
              Tops
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setCurrentScreen("bottoms");
            setCarouselVisible(true);
          }}
          style={{
            alignItems: "center",
            width: screenWidth * 0.2,
            height: RFValue(0),
          }}
        >
          <View
            style={{
              width: screenWidth * 0.2,
              height: RFValue(20),
              backgroundColor: "#FFCC90",
              borderRadius: RFValue(8),
              borderWidth: RFValue(1),
              borderColor: "black",
            }}
          >
            <Text
              style={{
                color: "black",
                fontSize: RFValue(10),
                fontWeight: "normal",
                textAlign: "center",
                top: RFValue(3),
              }}
            >
              Bottoms
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setCurrentScreen("outerwear");
            setCarouselVisible(true);
          }}
          style={{
            alignItems: "center",
            width: screenWidth * 0.1,
            height: RFValue(0),
          }}
        >
          <View
            style={{
              width: screenWidth * 0.2,
              height: RFValue(20),
              backgroundColor: "#FFCC90",
              borderRadius: RFValue(8),
              borderWidth: RFValue(1),
              borderColor: "black",
            }}
          >
            <Text
              style={{
                color: "black",
                fontSize: RFValue(10),
                fontWeight: "normal",
                textAlign: "center",
                top: RFValue(3),
              }}
            >
            Outerwear
          </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setCurrentScreen("accessories");
            setCarouselVisible(true);
          }}
          style={{
            alignItems: "center",
            width: screenWidth * 0.2,
            height: RFValue(0),
          }}
        >
          <View
            style={{
              width: screenWidth * 0.2,
              height: RFValue(20),
              backgroundColor: "#FFCC90",
              borderRadius: RFValue(8),
              borderWidth: RFValue(1),
              borderColor: "black",
            }}
          >
            <Text
              style={{
                color: "black",
                fontSize: RFValue(10),
                fontWeight: "normal",
                textAlign: "center",
                top: RFValue(3),
              }}
            >
            Accessories
          </Text>
          </View>
        </TouchableOpacity>
      </Section>
    </View>
  );
};

export default NavBar;
