import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const DishListItem = ({ dish }) => {
  const navigation = useNavigation();
  console.log('DISHES', dish);
  if (!dish) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'white' }}>No Dish</Text>
      </View>
    );
  }
  return (
    <Pressable
      onPress={() => navigation.navigate('Dish', { id: dish.id })}
      style={styles.container}
    >
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{dish.name}</Text>
        <Text style={styles.description}>{dish.description}</Text>
        <Text style={styles.price}>$ {dish.price}</Text>
      </View>
      {dish.image && <Image source={{ uri: dish.image }} style={styles.image} />}
    </Pressable>
  );
};

export default DishListItem;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    marginHorizontal: 20,
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 2,
    flexDirection: 'row',
  },
  name: {
    fontWeight: '600',
    fontSize: 17,
    letterSpacing: 0.9,
  },
  description: {
    color: 'gray',
    marginVertical: 5,
  },
  price: {},
  image: {
    height: '100%',
    width: 100,
  },
});
