import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RestaurantDetailScreen from '../screens/RestaurantDetailScreen';
import HomeScreen from './../screens/HomeScreen/index';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import OrderScreen from './../screens/OrderScreen/index';
import { Foundation } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import DishDetailsScreen from '../screens/DishDetailScreen';
import Basket from '../screens/Basket';
import OrderDetail from './../screens/OrderDetail/index';
import { View } from 'react-native';
import Profile from '../screens/Profile';
import { useAuthContext } from '../context/AuthContext';

const Stack = createNativeStackNavigator();
export const RootNavigator = () => {
  const { dbUser } = useAuthContext();
  return (
    <View style={{ flex: 1 }} collapsable={false}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {dbUser ? (
          <Stack.Screen name="HomeTab" component={HomeTab} />
        ) : (
          <Stack.Screen name="Profile" component={Profile} />
        )}
      </Stack.Navigator>
    </View>
  );
};

const Tab = createMaterialBottomTabNavigator();
export const HomeTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      barStyle={{ backgroundColor: '#fff' }}
      lazy={false}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{ tabBarIcon: ({ color }) => <Foundation name="home" size={24} color={color} /> }}
      />
      <Tab.Screen
        name="Orders"
        component={OrderStackNavigator}
        options={{
          tabBarIcon: ({ color }) => <FontAwesome name="list-alt" size={24} color={color} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{ tabBarIcon: ({ color }) => <FontAwesome name="user" size={24} color={color} /> }}
      />
    </Tab.Navigator>
  );
};

const HomeStack = createNativeStackNavigator();

const HomeStackNavigator = () => {
  return (
    <View style={{ flex: 1 }} collapsable={false}>
      <HomeStack.Navigator>
        <HomeStack.Screen name="Restaurants" component={HomeScreen} />
        <HomeStack.Screen
          name="Restaurant"
          component={RestaurantDetailScreen}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen name="Dish" component={DishDetailsScreen} />
        <HomeStack.Screen name="Basket" component={Basket} />
      </HomeStack.Navigator>
    </View>
  );
};

const OrderStack = createNativeStackNavigator();

const OrderStackNavigator = () => {
  return (
    <View style={{ flex: 1 }} collapsable={false}>
      <OrderStack.Navigator>
        <OrderStack.Screen name="OrdersScreen" component={OrderScreen} options={{}} />
        <OrderStack.Screen name="Order" component={OrderDetail} options={{ headerShown: false }} />
      </OrderStack.Navigator>
    </View>
  );
};
