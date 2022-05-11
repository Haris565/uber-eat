import { StyleSheet, Text, View, Pressable, FlatList } from 'react-native';
import React, { useState } from 'react';

import { useBasketContext } from '../../context/BasketContext';
import BasketDishitem from './../../components/BasketDishitem';
import { useOrderContext } from '../../context/OrderContext';
import { useNavigation } from '@react-navigation/native';

// const BasketDishes = ({ basketDish }) => {
//   return (
//     <View style={styles.row}>
//       <View style={styles.quantityContainer}>
//         <Text style={{}}>1</Text>
//       </View>
//       <Text style={{}}>{basketDish.name}</Text>
//       <Text style={{ marginLeft: 'auto' }}>$ {basketDish.price}</Text>
//     </View>
//   );
// };

const Basket = () => {
  const { basketDishes: basketDish, basketRestaurant: restaurant, total } = useBasketContext();
  const { createOrder } = useOrderContext();
  const navigation = useNavigation();

  const onCreateOrder = async () => {
    await createOrder();
    navigation.goBack();
  };

  if (!basketDish && !restaurant) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{}}>Loading...</Text>
      </View>
    );
  }
  return (
    <View style={styles.page}>
      <Text style={styles.name}>{restaurant?.name}</Text>
      <Text style={{}}>Your Items</Text>
      <FlatList
        data={basketDish}
        renderItem={({ item }) => <BasketDishitem basketDish={item} />}
        keyExtractor={(item) => item.id}
      />
      <View style={styles.separator} />
      <View style={{}}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{}}>SubTotal</Text>
          <Text style={{}}>$ {total.toFixed(2)}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
          <Text style={{}}>Total</Text>
          <Text style={{}}>$ {total.toFixed(2)}</Text>
        </View>
      </View>

      <View style={styles.row}></View>
      <Pressable style={styles.button} onPress={onCreateOrder}>
        <Text style={{ fontWeight: 'bold' }}>Create Order</Text>
      </Pressable>
    </View>
  );
};

export default Basket;

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

  separator: {
    height: 1,
    backgroundColor: 'lightgrey',
    marginVertical: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',

    marginVertical: 15,
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
  quantityContainer: {
    backgroundColor: 'gray',
    paddingHorizontal: 5,
    paddingVertical: 2,
    marginRight: 5,
    borderRadius: 5,
  },
});
