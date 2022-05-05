import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
import React from 'react';
import orders from '../../../assets/data/orders.json';
import restaurants from '../../../assets/data/restaurants.json';
import DishListItem from '../../components/DishListItem';
import BasketDishitem from '../../components/BasketDishitem';
const order = orders[0];
const OrderDetail = () => {
  return (
    <View style={styles.page}>
      <Image source={{ uri: order.Restaurant.image }} style={styles.image} resizeMode="cover" />

      <View style={styles.info}>
        <View style={styles.row}>
          <Text style={styles.title}>{order.Restaurant.name}</Text>
          {/* <Text style={styles.rating}>{restaurant.rating}</Text> */}
        </View>

        <Text style={styles.name}>{` ${order.status} : 2 days ago`}</Text>
        <Text style={styles.menu__title}>Your Order</Text>
        <FlatList
          data={restaurants[0].dishes}
          renderItem={({ item }) => <BasketDishitem basketDish={item} />}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
};

export default OrderDetail;

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
