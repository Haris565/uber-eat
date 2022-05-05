import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
const DEFAULT_IMAGE =
  'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/uber-eats/restaurant1.jpeg';
const Header = ({ restaurant }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.page}>
      <Image
        source={{ uri: restaurant.image.startsWith('http') ? restaurant.image : DEFAULT_IMAGE }}
        style={styles.image}
        resizeMode="cover"
      />
      <AntDesign
        name="arrowleft"
        size={24}
        color="white"
        style={styles.icon__container}
        onPress={() => navigation.goBack()}
      />
      <View style={styles.info}>
        <View style={styles.row}>
          <Text style={styles.title}>{restaurant.name}</Text>
          {/* <Text style={styles.rating}>{restaurant.rating}</Text> */}
        </View>

        <Text style={styles.name}>
          {`$ ${restaurant.deliveryFee.toFixed(2)}  ${restaurant.minDeliveryTime}-${
            restaurant.maxDeliveryTime
          } minutes`}
        </Text>
        <Text style={styles.menu__title}>Menu</Text>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  image: {
    width: '100%',
    aspectRatio: 5 / 3,
  },
  info: {
    marginVertical: 5,
    marginHorizontal: 10,
  },
  title: {
    fontWeight: '500',
    fontSize: 30,
  },
  name: {
    color: '#525252',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon__container: {
    backgroundColor: 'black',
    padding: 10,
    position: 'absolute',
    top: 30,
    left: 20,
    borderRadius: 50,
  },
  menu__title: {
    marginTop: 10,
    fontSize: 18,
    letterSpacing: 0.9,
  },
});
