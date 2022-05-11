import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import BasketDishitem from '../../components/BasketDishitem';
import { useOrderContext } from '../../context/OrderContext';
import { useRoute } from '@react-navigation/native';

const OrderDetail = () => {
  const { getOrder } = useOrderContext();
  const route = useRoute();
  const id = route.params.id;
  const [order, setOrder] = useState();

  useEffect(() => {
    getOrder(id).then(setOrder);
  }, []);

  if (!order) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{}}>Loading...</Text>
      </View>
    );
  }

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
          data={order.dishes}
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
