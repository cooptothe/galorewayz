import React from 'react';
import { View, Text, Image } from 'react-native';
import { styled } from 'nativewind';

const Container = styled(View);
const Heading = styled(Text);
const ProductGrid = styled(View);
const ProductItem = styled(View);
const ProductImage = styled(Image);
const ProductTitle = styled(Text);
const ProductPrice = styled(Text);

const ProductList = () => {
  return (
    <Container className="bg-white">
      <View className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <Heading className="sr-only">Products</Heading>

        <ProductGrid className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {/* Product 1 */}
          <ProductItem className="group">
            <ProductImage
              className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200"
              source={{ uri: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg' }}
            />
            <ProductTitle className="mt-4 text-sm text-gray-700">Earthen Bottle</ProductTitle>
            <ProductPrice className="mt-1 text-lg font-medium text-gray-900">$48</ProductPrice>
          </ProductItem>

          {/* Product 2 */}
          <ProductItem className="group">
            <ProductImage
              className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200"
              source={{ uri: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg' }}
            />
            <ProductTitle className="mt-4 text-sm text-gray-700">Nomad Tumbler</ProductTitle>
            <ProductPrice className="mt-1 text-lg font-medium text-gray-900">$35</ProductPrice>
          </ProductItem>

          {/* Product 3 */}
          <ProductItem className="group">
            <ProductImage
              className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200"
              source={{ uri: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg' }}
            />
            <ProductTitle className="mt-4 text-sm text-gray-700">Focus Paper Refill</ProductTitle>
            <ProductPrice className="mt-1 text-lg font-medium text-gray-900">$89</ProductPrice>
          </ProductItem>

          {/* Product 4 */}
          <ProductItem className="group">
            <ProductImage
              className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200"
              source={{ uri: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg' }}
            />
            <ProductTitle className="mt-4 text-sm text-gray-700">Machined Mechanical Pencil</ProductTitle>
            <ProductPrice className="mt-1 text-lg font-medium text-gray-900">$35</ProductPrice>
          </ProductItem>
        </ProductGrid>
      </View>
    </Container>
  );
};

export default ProductList;
