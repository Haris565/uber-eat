import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Basket from './src/screens/Basket';
import DishDetailsScreen from './src/screens/DishDetailScreen';
import HomeScreen from './src/screens/HomeScreen';
import OrderDetail from './src/screens/OrderDetail';
import OrderScreen from './src/screens/OrderScreen';
import RestaurantDetailScreen from './src/screens/RestaurantDetailScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootNavigator, HomeTab } from './src/navigation/index';
import { Amplify } from 'aws-amplify';
import awsconfig from './src/aws-exports';
import { withAuthenticator } from 'aws-amplify-react-native';
import AuthContextProvider from './src/context/AuthContext';

Amplify.configure({ ...awsconfig, Analytics: { disabled: true } });

function App() {
  return (
    <NavigationContainer>
      <AuthContextProvider>
        <RootNavigator />
      </AuthContextProvider>
      {/* <HomeTab /> */}
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
export default withAuthenticator(App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginVertical: 30,
    justifyContent: 'center',
  },
});
