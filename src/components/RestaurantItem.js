import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
const DEFAULT_IMAGE =
  'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/uber-eats/restaurant1.jpeg';
const RestaurantItem = ({ restaurant }) => {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => navigation.navigate('Restaurant', { id: restaurant.id })}
      style={styles.restaurant__container}
    >
      <Image
        source={{ uri: restaurant.image.startsWith('http') ? restaurant.image : DEFAULT_IMAGE }}
        style={styles.image}
      />
      <View style={styles.info}>
        <View style={styles.row}>
          <Text style={styles.title}>{restaurant.name}</Text>
          <Text style={styles.rating}>{restaurant.rating.toFixed(2)}</Text>
        </View>

        <Text style={styles.name}>
          {`$ ${restaurant.deliveryFee.toFixed(2)}  ${restaurant.minDeliveryTime}-${
            restaurant.maxDeliveryTime
          } minutes`}
        </Text>
      </View>
    </Pressable>
  );
};

export default RestaurantItem;

const styles = StyleSheet.create({
  restaurant__container: {
    width: '100%',
    marginVertical: 5,
  },
  image: {
    width: '100%',
    aspectRatio: 5 / 3,
  },
  info: {
    marginVertical: 5,
  },
  title: {
    fontWeight: '500',
    fontSize: 18,
  },
  name: {
    color: 'gray',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rating: {
    backgroundColor: 'gray',
    width: 45,
    height: 25,
    justifyContent: 'center',
    borderRadius: 10,
    alignItems: 'center',
    textAlign: 'center',
  },
});
