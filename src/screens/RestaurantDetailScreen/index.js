import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { AntDesign } from '@expo/vector-icons';
import DishListItem from '../../components/DishListItem';
import Header from './Header';
import { useNavigation, useRoute } from '@react-navigation/native';
import { DataStore } from 'aws-amplify';
import { Restaurant, Dish } from '../../models';
import { useBasketContext } from '../../context/BasketContext';
const RestaurantDetailScreen = () => {
  const [restaurant, setRestaurant] = useState(null);
  const [dishes, setDishes] = useState([]);
  const route = useRoute();
  const navigation = useNavigation();
  const id = route.params?.id;
  const { setBasketRestaurant, basket, basketDishes } = useBasketContext();
  const fetchDishes = async () => {
    try {
      if (id) {
        setBasketRestaurant(null);
        const result = await DataStore.query(Restaurant, id);
        console.log(result);
        setRestaurant(result);
        if (result) {
          const dishesData = await DataStore.query(Dish, (dish) => dish.restaurantID('eq', id));
          console.log('dISHES DATA', dishesData);
          setDishes(dishesData);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    // DataStore.query(Restaurant, id).then(setRestaurant);
    if (id) {
      fetchDishes();
    }
  }, [id]);

  useEffect(() => {
    setBasketRestaurant(restaurant);
  }, [restaurant]);

  if (!restaurant) {
    return (
      // <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#000000" />
    );
  }
  return (
    <View style={styles.page}>
      <FlatList
        ListHeaderComponent={() => <Header restaurant={restaurant} />}
        data={dishes}
        renderItem={({ item }) => <DishListItem dish={item} />}
        keyExtractor={(item) => item.id}
      />
      {basket && (
        <Pressable onPress={() => navigation.navigate('Basket')} style={styles.button}>
          <Text style={styles.buttonText}>Open basket ({basketDishes?.length})</Text>
        </Pressable>
      )}
    </View>
  );
};

export default RestaurantDetailScreen;

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
  menu: {
    marginHorizontal: 20,
  },
  button: {
    backgroundColor: 'black',
    marginTop: 'auto',
    padding: 20,
    alignItems: 'center',
    margin: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 18,
  },
});
