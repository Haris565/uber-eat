import { StyleSheet, Text, View, Pressable, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import restaurants from '../../../assets/data/restaurants.json';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { DataStore } from 'aws-amplify';
import { Dish } from '../../models';

const DishDetailsScreen = () => {
  const [quantity, setquantity] = useState(1);
  const [dish, setDish] = useState(null);
  const navigation = useNavigation();
  const route = useRoute();
  const id = route.params.id;
  const getTotal = () => {
    return (dish?.price * quantity).toFixed(2);
  };
  const addHandler = () => {
    setquantity((prevState) => prevState + 1);
  };
  const minusHandler = () => {
    if (quantity > 1) {
      setquantity((prevState) => prevState - 1);
    }
  };
  useEffect(() => {
    if (id) {
      DataStore.query(Dish, id).then(setDish);
    }
  }, [id]);
  if (!dish) {
    return <ActivityIndicator size="large" color="white" />;
  }
  return (
    <View style={styles.page}>
      <Text style={styles.name}>{dish?.name}</Text>
      <Text style={styles.description}>{dish?.description}</Text>
      <View style={styles.separator} />
      <View style={styles.row}>
        <AntDesign name="minuscircleo" size={68} color="black" onPress={minusHandler} />
        <Text style={styles.quantity}>{quantity}</Text>
        <AntDesign name="pluscircleo" size={68} color="black" onPress={addHandler} />
      </View>
      <Pressable style={styles.button} onPress={() => navigation.navigate('Basket')}>
        <Text style={{ fontWeight: 'bold' }}>
          Add {quantity} items to basket for $ {getTotal()}
        </Text>
      </Pressable>
    </View>
  );
};

export default DishDetailsScreen;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    width: '100%',
    paddingVertical: 30,
    padding: 10,
  },
  name: {
    fontSize: 30,
    fontWeight: '600',
    marginVertical: 10,
  },
  description: {
    color: 'gray',
  },
  separator: {
    height: 1,
    backgroundColor: 'lightgrey',
    marginVertical: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  quantity: {
    fontSize: 25,
    marginHorizontal: 20,
  },
  button: {
    backgroundColor: 'black',
    marginTop: 'auto',
    padding: 20,
    alignItems: 'center',
  },
});
