import { StyleSheet, Text, View, FlatList } from 'react-native';
import React from 'react';
import orders from '../../../assets/data/orders.json';
import OrderListItem from '../../components/OrderListItem';
const OrderScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={orders}
        renderItem={({ item }) => <OrderListItem order={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({});
