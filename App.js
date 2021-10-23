// In App.js in a new project

import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Welcome from './screens/Welcome';
import Login from './screens/Login';
import FirstRegister from './screens/FirstRegister';
import SecondRegister from './screens/SecondRegister';
import Home from './screens/Home';
import {createDrawerNavigator} from '@react-navigation/drawer';

function HomeScreen() {
  return <Home />;
}

function WelcomeScreen() {
  return <Welcome />;
}

function LoginScreen() {
  return <Login />;
}

function FirstRegisterScreen() {
  return <FirstRegister />;
}

function SecondRegisterScreen() {
  return <SecondRegister />;
}

const Stack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const DrawerStackScreen = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={HomeScreen} />
    </Drawer.Navigator>
  );
};
const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <HomeStack.Screen name="Welcome" component={WelcomeScreen} />
      <HomeStack.Screen name="Login" component={LoginScreen} />
      <HomeStack.Screen
        name="FirstRegister"
        component={FirstRegisterScreen}
        options={{title: 'Register'}}
      />
      <HomeStack.Screen
        name="SecondRegister"
        component={SecondRegisterScreen}
        options={{title: 'Register'}}
      />
      <HomeStack.Screen name="HomeLogin" component={DrawerStackScreen} />
    </HomeStack.Navigator>
  );
};

function App() {
  return (
    <NavigationContainer>
      <HomeStackScreen />
    </NavigationContainer>
  );
}

export default App;
