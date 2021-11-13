import React, {useState, useEffect, useRef, useContext} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Alert,
  FlatList,
} from 'react-native';
import {
  createNativeStackNavigator,
  Header,
} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import {CommonActions} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {UserContext} from '../../provider/UserProvider';
import {SafeAreaView} from 'react-native-safe-area-context';
import {format, formatDistance, formatRelative, subDays} from 'date-fns';
import {Dimensions} from 'react-native';
import MapView, {
  PROVIDER_GOOGLE,
  AnimatedRegion,
  Animated,
  Marker,
  Circle,
  TYPE_MAPS,
  Callout,
} from 'react-native-maps';
import axios from 'axios';

function EvacuationCenter() {
  const [location, setLocation] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const context = useContext(UserContext);
  const brgy = context.brgy;
  const [region, setRegion] = useState({
    longitude: 121.085039,
    latitude: 14.615522,
    latitudeDelta: 0.015,
    longitudeDelta: 0.015,
  });
  const mapView = useRef(null);

  const animate = () => {
    let r = {
      latitude: 42.5,
      longitude: 15.2,
      latitudeDelta: 7.5,
      longitudeDelta: 7.5,
    };
    mapView.animateToRegion(r, 2000);
  };
  useEffect(() => {
    axios({
      url: 'https://kabisigapp.com/api/evacuationcenters/' + brgy,
      method: 'GET',
    })
      .then(function (response) {
        setLocation(response.data);
      })
      .catch(function (e) {
        console.log(e);
      });
  }, []);
  return (
    <SafeAreaView>
      <MapView
        ref={mapView}
        initialRegion={region}
        style={styles.container}
        onPress={() => {
          console.log('test');
        }}>
        {location.map((data, index) => {
          return (
            <Marker
              key={index}
              coordinate={{
                latitude: parseFloat(data.lat),
                longitude: parseFloat(data.lng),
              }}
            />
          );
        })}
      </MapView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    //...StyleSheet.absoluteFillObject,
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
  map: {
    //...StyleSheet.absoluteFillObject,
  },
});

export default EvacuationCenter;
