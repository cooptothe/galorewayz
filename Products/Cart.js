import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import { styled } from 'nativewind';

const Container = styled(View);
const ProductItem = styled(View);
const ProductImage = styled(Image);
const ProductInfo = styled(View);
const ProductTitle = styled(Text);
const ProductPrice = styled(Text);

const Cart = ({ cartId, setCarouselVisible }) => {
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    // Fetch cart data based on the cartId
    const fetchCartData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/getCartData/${cartId}`);
        const data = await response.json();
        setCartData(data.products || []); // Default to an empty array if there is no data or 'products' field
      } catch (error) {
        console.error('Error fetching cart data:', error);
      }
    };

    if (cartId) {
      fetchCartData();
    }
  }, [cartId]);

  const renderItem = ({ item }) => (
    <ProductItem>
      <ProductImage source={{ uri: item.image }} style={{ width: 50, height: 50 }} />
      <ProductInfo>
        <ProductTitle>{item.title}</ProductTitle>
        <ProductPrice>{`$${item.price}`}</ProductPrice>
      </ProductInfo>
    </ProductItem>
  );

  const handleCheckout = () => {
    // Implement the logic to navigate to the checkout screen or perform the checkout action
    // This can include additional API calls and navigation logic
    // For now, let's just log a message
    console.log('Proceeding to checkout...');
  };

  return (
    <Container style={{ backgroundColor: 'white', top: 500, width:96, height: 96, left: 130 }}>
      {cartData.length === 0 ? (
        <Text style={{ fontSize: 18, textAlign: 'center', marginTop: 20 }}>
          Your cart is empty.
        </Text>
      ) : (
        <>
          <FlatList
            data={cartData}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
          />

          <TouchableOpacity
            onPress={handleCheckout}
            style={{
              backgroundColor: '#FFCC90',
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
              padding: 10,
              marginTop: 20,
            }}
          >
            <Text style={{ color: 'black', fontSize: 16, fontWeight: 'normal' }}>
              Checkout
            </Text>
          </TouchableOpacity>
        </>
      )}
    </Container>
  );
};

export default Cart;
