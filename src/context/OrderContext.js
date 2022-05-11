import { createContext, useState, useContext, useEffect } from 'react';
import { DataStore } from 'aws-amplify';
import { Order, Basket, OrderDish } from '../models';
import { useBasketContext } from './BasketContext';
import { useAuthContext } from './AuthContext';

const OrderContext = createContext({});

const OrderContextProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const { dbUser } = useAuthContext();
  const { basketRestaurant, total, basketDishes, basket } = useBasketContext();

  useEffect(() => {
    DataStore.query(Order, (order) => order.userID('eq', dbUser.id)).then(setOrders);
    console.log(orders);
  }, [dbUser]);

  const createOrder = async () => {
    // create the order
    const newOrder = await DataStore.save(
      new Order({
        userID: dbUser.id,
        Restaurant: basketRestaurant,
        status: 'NEW',
        total: total,
      })
    );

    // add all basketDishes to the order
    await Promise.all(
      basketDishes.map((basketDish) =>
        DataStore.save(
          new OrderDish({
            quantity: basketDish.quantity,
            orderID: newOrder.id,
            Dish: basketDish.Dish,
          })
        )
      )
    );

    // delete basket
    await DataStore.delete(basket);
    setOrders([...orders, newOrder]);
  };

  const getOrder = async (id) => {
    const order = await DataStore.query(Order, id);
    const orderDish = await DataStore.query(OrderDish, (od) => od.orderID('eq', order.id));
    return { ...order, dishes: orderDish };
  };

  return (
    <OrderContext.Provider value={{ createOrder, orders, getOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContextProvider;

export const useOrderContext = () => useContext(OrderContext);
