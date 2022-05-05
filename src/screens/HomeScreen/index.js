import { StyleSheet, Text, View, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import RestaurantItem from './../../components/RestaurantItem';
// import restaurants from '../../../assets/data/restaurants.json';
import { Restaurant } from '../../models';
import { DataStore } from 'aws-amplify';
const HomeScreen = () => {
  const [restaurants, setRestaurants] = useState([]);

  const fetchRestaurants = async () => {
    const result = await DataStore.query(Restaurant);
    setRestaurants(result);
  };
  useEffect(() => {
    fetchRestaurants();
  }, []);

  return (
    <View style={styles.page}>
      <FlatList
        data={restaurants}
        renderItem={({ item }) => <RestaurantItem restaurant={item} />}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  page: {
    padding: 10,
  },
});
