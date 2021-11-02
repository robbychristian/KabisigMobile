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

function EvacuationCenter() {
  const [location, setLocation] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [region, setRegion] = useState({
    longitude: 121.085039,
    latitude: 14.615522,
    latitudeDelta: 0.015,
    longitudeDelta: 0.015,
  });
  const mapView = useRef(null);
  useEffect(() => {
    fetch('https://kabisigapp.com/api/evacuationcenters')
      .then(response => response.json())
      .then(json => {
        setLocation(json);
      })
      .catch(error => {
        Alert.alert('Error', 'There is an error fetching data.');
      })
      .finally(() => setLoading(false));
  }, []);
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <MapView
          //provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={region}
          ref={mapView}
          onRegionChangeComplete={region => setRegion(region)}>
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
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default EvacuationCenter;
