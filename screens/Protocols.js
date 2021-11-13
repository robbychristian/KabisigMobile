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
import {Dimensions} from 'react-native';

function Home() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.background}>
      <Text style={styles.heading}>Disaster Preparedness</Text>
      <View style={styles.container}>
        <View style={styles.parent}>
          <TouchableOpacity
            style={styles.child}
            onPress={() => navigation.push('Flood')}>
            <Image
              source={require('../assets/flood.png')}
              style={styles.image}
            />
            <Text style={styles.title}>Flood</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.child}
            onPress={() => navigation.push('Earthquake')}>
            <Image
              source={require('../assets/earthquake.png')}
              style={styles.image}
            />
            <Text style={styles.title}>Earthquake</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.parent}>
          <TouchableOpacity
            style={styles.child}
            onPress={() => navigation.push('Tropical Cyclone')}>
            <Image
              source={require('../assets/storm.png')}
              style={styles.image}
            />
            <Text style={styles.title}>Tropical Cyclone</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.child}
            onPress={() => navigation.push('Tsunami')}>
            <Image
              source={require('../assets/tsunami.png')}
              style={styles.image}
            />
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
  parent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  child: {
    height: 200,
    width: (Dimensions.get('screen').width - 60) / 2,
    marginBottom: 10,
    marginRight: 10,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderRadius: 20,
    borderColor: '#004F91',
    borderBottomWidth: 2,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.9,
    shadowRadius: 10,
  },
  image: {
    flex: 1,
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  heading: {
    fontSize: 30,
    color: '#004F91',
    fontWeight: 'bold',
  },
  title: {
    color: '#004F91',
    //fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
  },
});

export default Home;
