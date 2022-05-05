import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const OrderListItem = ({ order }) => {
  const navigation = useNavigation();
  console.log(order);
  return (
    <Pressable
      style={{ flexDirection: 'row', margin: 10 }}
      onPress={() => navigation.navigate('Order')}
    >
      <Image source={{ uri: order.Restaurant.image }} style={{ width: 75, height: 75 }} />
      <View style={{ marginLeft: 15 }}>
        <Text style={{ fontWeight: '600', fontSize: 17 }}>{order.Restaurant.name}</Text>
        <Text style={{ marginVertical: 5 }}>3 items for $38.9</Text>
        <Text style={{}}>2 days ago: {order.status}</Text>
      </View>
    </Pressable>
  );
};

export default OrderListItem;

const styles = StyleSheet.create({});
