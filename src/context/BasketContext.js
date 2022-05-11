import { createContext, useState, useEffect, useContext } from 'react';
import { DataStore } from 'aws-amplify';
import { Basket, BasketDish } from '../models';
import { useAuthContext } from './AuthContext';

const BasketContext = createContext({});

const BasketContextProvider = ({ children }) => {
  const { sub, dbUser } = useAuthContext();
  const [basket, setBasket] = useState(null);
  const [basketRestaurant, setBasketRestaurant] = useState(null);
  const [basketDishes, setBasketDishes] = useState([]);

  const createNewBasket = async () => {
    console.log('Into basket');
    const newBasket = await DataStore.save(
      new Basket({ userID: dbUser?.id, restaurantID: basketRestaurant?.id })
    );
    setBasket(newBasket);
    console.log('Created basket');
    return newBasket;
  };
  const addDishToBasket = async (dish, quantity) => {
    let myBasket;
    if (!basket) {
      myBasket = await createNewBasket();
    } else {
      myBasket = basket;
    }
    const newDish = await DataStore.save(
      new BasketDish({ quantity, Dish: dish, basketID: myBasket.id })
    );

    setBasketDishes([...basketDishes, newDish]);
  };
  const total = basketDishes?.reduce(
    (sum, bd) => sum + bd?.quantity * bd?.Dish?.price,
    basketRestaurant?.deliveryFee
  );
  useEffect(() => {
    DataStore.query(Basket, (b) =>
      b.restaurantID('eq', basketRestaurant?.id).userID('eq', dbUser?.id)
    ).then((baskets) => setBasket(baskets[0]));
  }, [dbUser, basketRestaurant]);

  useEffect(() => {
    if (basket) {
      DataStore.query(BasketDish, (bd) => bd.basketID('eq', basket.id)).then(setBasketDishes);
    }
  }, [basket]);

  return (
    <BasketContext.Provider
      value={{
        addDishToBasket,
        setBasketRestaurant,
        basketDishes,
        basket,
        basketRestaurant,
        total,
      }}
    >
      {children}
    </BasketContext.Provider>
  );
};

export default BasketContextProvider;

export const useBasketContext = () => useContext(BasketContext);
