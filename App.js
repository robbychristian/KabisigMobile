// In App.js in a new project

import * as React from 'react';
import {View, Text, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {UserContext, UserProvider} from './provider/UserProvider';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {Header, HeaderTitleAlign} from '@react-navigation/elements';
import Welcome from './screens/Welcome';
import Login from './screens/Login';
import {useRoute} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
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
import IndividualAnnouncement from './screens/Features/IndividualAnnouncement';
//Reports
import Reports from './screens/Features/Reports/Reports';
import AddReports from './screens/Features/Reports/AddReports';
//Vulnerability Map
import VulnerabilityMap from './screens/Features/VulnerabilityMap';
//Evacuation Center
import EvacuationCenter from './screens/Features/EvacuationCenter';
//Edit Profile
import EditProfile from './screens/Features/EditProfile';

function HomeScreen() {
  return <Protocols />;
}

function AnnouncementScreen() {
  return <Announcements />;
}

function IndividualAnnouncementScreen() {
  return <IndividualAnnouncement />;
}

function VulnerabilityMapScreen() {
  return <VulnerabilityMap />;
}

function EditProfileScreen() {
  return <EditProfile />;
}

function EvacuationCenterScreen() {
  return <EvacuationCenter />;
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

function Logout(props) {
  const navigation = useNavigation();
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Logout"
        icon={({color, size}) => (
          <Icon name="door-open" size={size} color={color} />
        )}
        style={{
          borderTopColor: '#000',
          borderTopWidth: 1,
          marginTop: 30,
          paddingTop: 15,
        }}
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [
              {
                name: 'Welcome',
              },
            ],
          })
        }
      />
    </DrawerContentScrollView>
  );
}

const ProtocolStack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();
const AnnouncementStack = createNativeStackNavigator();
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

const AnnouncementStackScreen = () => {
  return (
    <AnnouncementStack.Navigator screenOptions={{headerShown: false}}>
      <AnnouncementStack.Screen
        name="Announcements"
        component={AnnouncementScreen}
      />
      <AnnouncementStack.Screen
        name="Individual Announcement"
        component={IndividualAnnouncementScreen}
      />
    </AnnouncementStack.Navigator>
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
  const navigation = useNavigation();
  return (
    <Drawer.Navigator drawerContent={props => <Logout {...props} />}>
      <Drawer.Screen
        options={{
          drawerIcon: ({color, size}) => (
            <Icon name="user-edit" size={size} color={color} />
          ),
        }}
        name="Edit Profile"
        component={EditProfileScreen}
      />
      <Drawer.Screen
        options={{
          drawerIcon: ({color, size}) => (
            <Icon name="bullhorn" size={size} color={color} />
          ),
        }}
        name="Announcement"
        component={AnnouncementStackScreen}
      />
      <Drawer.Screen
        options={{
          drawerIcon: ({color, size}) => (
            <Icon name="list" size={size} color={color} />
          ),
        }}
        name="Guidelines"
        component={ProtocolStackScreen}
      />
      <Drawer.Screen
        options={{
          drawerIcon: ({color, size}) => (
            <Icon name="pen-square" size={size} color={color} />
          ),
        }}
        name="Reports"
        component={ReportStackScreen}
      />
      <Drawer.Screen
        options={{
          drawerIcon: ({color, size}) => (
            <Icon name="map-marked-alt" size={size} color={color} />
          ),
        }}
        name="Vulnerability Map"
        component={VulnerabilityMapScreen}
      />
      <Drawer.Screen
        options={{
          drawerIcon: ({color, size}) => (
            <Icon name="map-pin" size={size} color={color} />
          ),
        }}
        name="Evacuation Center"
        component={EvacuationCenterScreen}
      />
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
