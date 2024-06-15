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
import Product from "./Product"; // Import the Product component
import { RFValue } from "react-native-responsive-fontsize";


const window = Dimensions.get("window");
const screenWidth = window.width;
const screenHeight = window.height;

const Container = styled(View);
const ProductGrid = styled(FlatList);
const ProductItem = styled(TouchableOpacity);
const ProductImage = styled(Image);
const ProductTitle = styled(Text);
const ProductPrice = styled(Text);
const Section = styled(View);

const ProductList = ({ onSelectProduct, setCarouselVisible }) => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    // Fetch products
    const fetchProducts = async () => {
      // try {
      //   const response = await fetch("https://us-central1-galore-wayz-b0b8f.cloudfunctions.net/api/getProducts");
      //   const data = await response.json();
      //   setProducts(data.data.products.edges);
      // } catch (error) {
      //   console.error("Error fetching products:", error);
      // }
      console.log("Request received at /getProducts");
      try {
        const response = await fetch(
          "https://galorewayzlifestyle.com/api/2023-01/graphql.json",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-Shopify-Storefront-Access-Token":
              process.env.EXPO_PUBLIC_API_KEY,
            },
            body: JSON.stringify({
              query: `
              query getProducts {
                products(first: 100) {
                  edges {
                    node {
                      id
                      title
                      productType
                      description
                      handle
                      media(first: 1) {
                        edges {
                          node {
                            previewImage {
                              url
                            }
                          }
                        }
                      }
                      variants(first: 1) {
                        edges {
                          node {
                          id
                            title
                            quantityAvailable
                            price {
                              amount
                              currencyCode
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            `,
            }),
          }
        );
        console.log()
        const data = await response.json();
        setProducts(data.data.products.edges);
      } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    };

    fetchProducts();
  }, []);

  const handleProductPress = (product) => {
    setSelectedProduct(product);
    onSelectProduct(product); // Pass the selected product data back to HomeScreen.js
  };

  const handleTapAway = () => {
    // Handle tap away, set selectedProduct to null to return to the original view
    setSelectedProduct(null);
    console.log("hey");
  };

  const renderItem = ({ item }) => {
    const mediaNode = item.node.media.edges[0]?.node;
    const imageUrl = mediaNode?.previewImage.url || "";

    return (
      <ProductItem
        key={item.node.id}
        onPress={() => handleProductPress(item.node)}
        className="group"
        style={{ padding: RFValue(20) }}
      >
        <ProductImage
          alt={mediaNode?.alt || item.node.title}
          style={{
            height: RFValue(60),
            width: RFValue(80),
            right: RFValue(25),
          }}
          source={{ uri: imageUrl }}
        />
        <ProductTitle
          style={{
            position: "relative",
            color: "black",
            fontSize: RFValue(10),
            fontWeight: "normal",
            width: screenWidth * 0.4,
            right: RFValue(20),
            paddingBottom: RFValue(1),
            paddingTop: RFValue(5),
          }}
        >
          {item.node.title}
        </ProductTitle>

        <ProductPrice
          style={{
            position: "relative",
            color: "black",
            fontSize: RFValue(8),
            fontWeight: "normal",
            width: screenWidth * 0.3,
            right: RFValue(15),
            paddingBottom: RFValue(1),
            paddingTop: RFValue(1),
          }}
        >
          {"$"}
          {item.node.variants.edges[0]?.node.price.amount}
          {"0"}
        </ProductPrice>
      </ProductItem>
    );
  };

  return (
    <Container style={{ top: RFValue(170) }}>
      {selectedProduct && (
        <Product
          handle={selectedProduct.handle}
          onClose={() => {
            setSelectedProduct(null);
            setCarouselVisible(true);
          }}
          setCarouselVisible={setCarouselVisible}
        />
      )}
      {!selectedProduct && (
        <ProductGrid
          data={products}
          renderItem={renderItem}
          keyExtractor={(item) => item.node.id.toString()}
          numColumns={2}
        />
      )}
    </Container>
  );
};

export default ProductList;
