import React from 'react';
import {
  ImageBackground,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import Earthquake from './Protocols/Earthquake';
import Flood from './Protocols/Flood';
import TropicalCyclone from './Protocols/TropicalCyclone';
import Tsunami from './Protocols/Tsunami';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

function Home() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.background}>
      <Text style={styles.heading}>Disaster Preparedness</Text>
      <View style={styles.container}>
        <View style={{flexDirection: 'row', flex: 1}}>
          <TouchableOpacity
            style={{
              flex: 1,
              alignItems: 'center',
              backgroundColor: '#004F91',
              justifyContent: 'center',
              marginRight: 20,
            }}
            onPress={() => navigation.push('Flood')}>
            <Text style={styles.title}>Flood</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 1,
              alignItems: 'center',
              backgroundColor: '#004F91',
              justifyContent: 'center',
            }}
            onPress={() => navigation.push('Earthquake')}>
            <Text style={styles.title}>Earthquake</Text>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row', flex: 1, marginTop: 30}}>
          <TouchableOpacity
            style={{
              flex: 1,
              alignItems: 'center',
              backgroundColor: '#004F91',
              justifyContent: 'center',
              marginRight: 20,
            }}
            onPress={() => navigation.push('Tropical Cyclone')}>
            <Text style={styles.title}>Tropical Cyclone</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 1,
              alignItems: 'center',
              backgroundColor: '#004F91',
              justifyContent: 'center',
            }}
            onPress={() => navigation.push('Tsunami')}>
            <Text style={styles.title}>Tsunami</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 30,
    color: '#004F91',
    fontWeight: 'bold',
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default Home;
