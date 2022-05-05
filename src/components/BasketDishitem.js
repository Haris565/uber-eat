import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';

const BasketDishitem = ({ basketDish }) => {
  return (
    <View style={styles.row}>
      <View style={styles.quantityContainer}>
        <Text style={{}}>1</Text>
      </View>
      <Text style={{}}>{basketDish.name}</Text>
      <Text style={{ marginLeft: 'auto' }}>$ {basketDish.price}</Text>
    </View>
  );
};

export default BasketDishitem;

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
