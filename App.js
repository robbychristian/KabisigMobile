// In App.js in a new project

import * as React from 'react';
import {View, Text} from 'react-native';
import {UserContext, UserProvider} from './provider/UserProvider';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Header, HeaderTitleAlign} from '@react-navigation/elements';
import Welcome from './screens/Welcome';
import Login from './screens/Login';
import {useRoute} from '@react-navigation/native';
import FirstRegister from './screens/FirstRegister';
import SecondRegister from './screens/SecondRegister';
//GUIDELINES
import Protocols from './screens/Protocols';
import Earthquake from './screens/Protocols/Earthquake';
import Flood from './screens/Protocols/Flood';
import TropicalCyclone from './screens/Protocols/TropicalCyclone';
import Tsunami from './screens/Protocols/Tsunami';
//Announcements
import Announcements from './screens/Features/Announcements';
//Reports
import Reports from './screens/Features/Reports/Reports';
import AddReports from './screens/Features/Reports/AddReports';

function HomeScreen() {
  return <Protocols />;
}

function AnnouncementScreen() {
  return <Announcements />;
}

function ReportScreen() {
  return <Reports />;
}

function AddReportScreen() {
  return <AddReports />;
}

function EarthquakeScreen() {
  return <Earthquake />;
}
function FloodScreen() {
  return <Flood />;
}
function TropicalCycloneScreen() {
  return <TropicalCyclone />;
}
function TsunamiScreen() {
  return <Tsunami />;
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

const ProtocolStack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const ReportStack = createNativeStackNavigator();

const ProtocolStackScreen = () => {
  return (
    <ProtocolStack.Navigator screenOptions={{headerShown: false}}>
      <ProtocolStack.Screen name="Protocols" component={HomeScreen} />
      <ProtocolStack.Screen name="Flood" component={FloodScreen} />
      <ProtocolStack.Screen name="Earthquake" component={EarthquakeScreen} />
      <ProtocolStack.Screen
        name="Tropical Cyclone"
        component={TropicalCycloneScreen}
      />
      <ProtocolStack.Screen name="Tsunami" component={TsunamiScreen} />
    </ProtocolStack.Navigator>
  );
};

const ReportStackScreen = () => {
  return (
    <ReportStack.Navigator screenOptions={{headerShown: false}}>
      <ReportStack.Screen name="ShowReports" component={ReportScreen} />
      <ReportStack.Screen name="AddReport" component={AddReportScreen} />
    </ReportStack.Navigator>
  );
};

const DrawerStackScreen = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Announcement" component={AnnouncementScreen} />
      <Drawer.Screen name="Guidelines" component={ProtocolStackScreen} />
      <Drawer.Screen name="Reports" component={ReportStackScreen} />
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
    <UserProvider>
      <NavigationContainer>
        <HomeStackScreen />
      </NavigationContainer>
    </UserProvider>
  );
}

export default App;
