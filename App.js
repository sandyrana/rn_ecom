import 'react-native-gesture-handler';
import * as React from 'react';
import { View,Text,TouchableOpacity, Image,StyleSheet ,SafeAreaView,StatusBar,Button} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './src/screen/SplashScreen';
import WelcomeScreen from './src/screen/WelcomeScreen';
import LoginScreen from './src/screen/LoginScreen';
import RegisterScreen from './src/screen/RegisterScreen';
import HomeScreen from './src/screen/HomeScreen';
import ProfileScreen from './src/screen/ProfileScreen';
import CustomSidebarMenu from './src/navigation/CustomSidebarMenu';
import Capture from './src/screen/Capture';
import CustomeHeader from './src/navigation/CustomeHeader';
import ForgetPasswordScreen from './src/screen/ForgotPasswordScreen'
import CategoryWiseProduct from './src/screen/CategoryWiseProduct';
import Categories from './src/screen/Categories';
import Cart from './src/screen/Cart'
import ProductDetailsScreen from './src/screen/ProductDetailsScreen';
import SpecialProduct from './src/screen/SpecialProduct';
import CheckoutScreen from './src/screen/CheckoutScreen';
import ShippingAddressScreen from './src/screen/ShippingAddressScreen';
import UpdateShippingAddress from './src/screen/UpdateShippingAddress';




const MainStack = createNativeStackNavigator();
const RootStack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();


const MainStackScreen = () => (
  <MainStack.Navigator
    screenOptions={{
      headerShown: false,
      animationEnabled: false,
    }}>
    <MainStack.Screen name="SplashScreen" component={SplashScreen} />
    <MainStack.Screen name="WelcomeScreen" component={WelcomeScreen} />
  </MainStack.Navigator>
);

const CreateDrawer = () => (
  <Drawer.Navigator
    initialRouteName="Home"
    contentOptions={(activeTintColor = 'red')}
   
    drawerContent={props => <CustomSidebarMenu {...props} />}
    >
    <Drawer.Screen name="Home"  options={{headerTitle:'Ecom'}} component={HomeScreen} />
    <Drawer.Screen name="Profile" component={ProfileScreen} />
    <Drawer.Screen name="CategoryWiseProduct" component={CategoryWiseProduct} />
    <Drawer.Screen name="Categories" component={Categories} />
    <Drawer.Screen name="Cart" component={Cart} />
    <Drawer.Screen name="SpecialProduct" component={SpecialProduct} />
    <Drawer.Screen name="ProductDetailsScreen" component={ProductDetailsScreen} />
    <Drawer.Screen name="CheckoutScreen" component={CheckoutScreen} />
    <Drawer.Screen name="ShippingAddressScreen" component={ShippingAddressScreen} />
    <Drawer.Screen name="UpdateShippingAddress" component={UpdateShippingAddress} />









    
  </Drawer.Navigator>
);

RootStackScreen = () => (
  <RootStack.Navigator
    screenOptions={{
      headerShown: false,
      animationEnabled: false,
    }}>
    <RootStack.Screen name="Main" component={MainStackScreen} />    
    <RootStack.Screen name="Login" component={LoginScreen} />
    <RootStack.Screen name="ForgetPassword" component={ForgetPasswordScreen} />  
    <RootStack.Screen name="Register" component={RegisterScreen} /> 
    <RootStack.Screen name="Capture" component={Capture} />   
    <RootStack.Screen name="HomeScreen" component={CreateDrawer} /> 
  </RootStack.Navigator>
);

export default function App(){
  return <NavigationContainer>{RootStackScreen()}</NavigationContainer>;
}


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    overflow: 'hidden',
  },
})
