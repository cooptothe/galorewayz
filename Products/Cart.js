// Cart.js
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';

const Container = styled(View);

const Cart = ({ cartId }) => {
  const [cart, setCart] = useState(null);

  useEffect(() => {
    // Fetch cart data
    const fetchCart = async () => {
      try {
        if (cartId) {
          const response = await fetch(`http://localhost:3001/getCart/${cartId}`);
          const data = await response.json();
          setCart(data.data.cart);
        }
      } catch (error) {
        console.error('Error fetching cart data:', error);
      }
    };

    fetchCart();
  }, [cartId]);

  if (!cart) {
    return <Text>Loading cart...</Text>;
  }

  const handleCheckout = async () => {
    try {
      // Fetch the checkout URL and open it in a web browser or redirect the user to the URL
      const checkoutResponse = await fetch(`http://localhost:3001/checkoutURL/${cartId}`);
      const checkoutData = await checkoutResponse.json();
      const checkoutUrl = checkoutData.data.cart.checkoutUrl;

      // Implement logic to open the checkout URL (e.g., use Linking or navigation)
      console.log('Redirecting to checkout:', checkoutUrl);
    } catch (error) {
      console.error('Error fetching checkout URL:', error);
    }
  };

  return (
    <Container style={{ padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 16 }}>Your Cart</Text>

      {/* Display cart items */}
      {cart.lines.edges.map((line) => (
        <View key={line.node.id} style={{ marginBottom: 8 }}>
          <Text>{`${line.node.quantity} x ${line.node.merchandise.id}`}</Text>
        </View>
      ))}

      {/* Display total cost */}
      <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 16 }}>
        Total: ${cart.cost.totalAmount.amount} {cart.cost.totalAmount.currencyCode}
      </Text>

      {/* Checkout button */}
      <TouchableOpacity
        onPress={handleCheckout}
        style={{
          width: 120,
          height: 30,
          backgroundColor: '#FFCC90',
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 20,
          borderColor: 'black',
          borderWidth: 1,
        }}
      >
        <Text style={{ color: 'black', fontSize: 16, fontWeight: 'normal' }}>
          Checkout
        </Text>
      </TouchableOpacity>
    </Container>
  );
};

export default Cart;
