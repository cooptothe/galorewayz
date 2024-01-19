import React from 'react';
import { View, Text, Image } from 'react-native';
import { styled } from 'nativewind';

const Container = styled(View);
const Section = styled(View);
const Trending = styled(Text);
const Logo = styled(Image);

const App = () => {
  return (
    <Container className="Iphone1415ProMax1 w-96 h-96 relative bg-zinc-100">
      {/* ... Other components ... */}
      <Trending className="Trending left-[29px] top-[475px] absolute text-black text-3xl font-normal font-['Jolly Lodger']">Trending</Trending>
      <Section className="Frame7 w-96 h-64 left-[20px] top-[185px] absolute">
        {/* Individual Frames */}
        {[0, 1, 2, 3, 4, 5].map(index => (
          <View key={index} className={`Frame${index + 1} w-96 h-72 left-[${344 * index}px] top-${6 * index}px absolute justify-center items-center inline-flex`}>
            <Image className={`Rectangle${index + 3} w-96 h-72 rounded-2xl shadow`} source={{ uri: 'https://via.placeholder.com/382x275' }} />
          </View>
        ))}
      </Section>
      {/* Categories */}
      <View className="Group1 w-24 h-8 left-[25px] top-[145px] absolute">
        <View className="Rectangle1 w-24 h-8 left-0 top-0 absolute bg-orange-400 bg-opacity-10 rounded-lg border border-black" />
        <Text className="Men w-8 h-6 left-[34px] top-[8px] absolute text-black text-l font-normal font-['Jolly Lodger']">Tops</Text>
      </View>
      <View className="Group2 w-24 h-8 left-[275px] top-[145px] absolute">
        <View className="Rectangle1 w-24 h-8 left-0 top-0 absolute bg-orange-400 bg-opacity-10 rounded-lg border border-black" />
        <Text className="Kids w-15 h-6 left-[10px] top-[8px] absolute text-black text- font-normal font-['Jolly Lodger']">Accessories</Text>
      </View>
      <View className="Group3 w-24 h-8 left-[150px] top-[145px] absolute">
        <View className="Rectangle1 w-24 h-8 left-0 top-0 absolute bg-orange-400 bg-opacity-10 rounded-lg border border-black" />
        <Text className="Women w-12 h-6 left-[26.5px] top-[8px] absolute text-black text-l font-normal font-['Jolly Lodger']">Bottoms</Text>
      </View>
      {/* Logo */}
      <Image className="GaloreLogo1 w-64 h-20 left-[65px] top-[54px] absolute" source={{ uri: '/Users/student/galorewayz/assets/galore-logo.png' }} />
    </Container>
  );
};

export default App;
