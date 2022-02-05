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
import Icon from 'react-native-vector-icons/FontAwesome5';
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
  const [evacName, setEvacName] = useState();
  const [landmark, setLandmark] = useState();
  const [phoneNo, setPhoneNo] = useState();
  const [capacity, setCapacity] = useState();
  const [availability, setAvailability] = useState();
  const context = useContext(UserContext);
  const barangayLoc = context.brgy;
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

  const showDetails = (evacName, landmark, phoneNo, capacity, availability) => {
    setEvacName(evacName);
    setLandmark(landmark);
    setPhoneNo(phoneNo);
    setCapacity(capacity);
    setAvailability(availability);
  };
  useEffect(() => {
    if (barangayLoc == 'Barangay Santolan') {
      setRegion({
        longitude: 121.088,
        latitude: 14.6131,
        latitudeDelta: 0.008,
        longitudeDelta: 0.008,
      });
    } else if (barangayLoc == 'Barangay Manggahan') {
      setRegion({
        latitude: 14.601887,
        longitude: 121.093698,
        latitudeDelta: 0.008,
        longitudeDelta: 0.008,
      });
    } else if (barangayLoc == 'Barangay Dela Paz') {
      setRegion({
        latitude: 14.6137,
        longitude: 121.096,
        latitudeDelta: 0.008,
        longitudeDelta: 0.008,
      });
    } else if (barangayLoc == 'Barangay Maybunga') {
      setRegion({
        latitude: 14.5763,
        longitude: 121.085,
        latitudeDelta: 0.008,
        longitudeDelta: 0.008,
      });
    } else if (barangayLoc == 'Barangay Rosario') {
      setRegion({
        latitude: 14.5885,
        longitude: 121.0891,
        latitudeDelta: 0.008,
        longitudeDelta: 0.008,
      });
    }
    axios({
      url: 'https://kabisigapp.com/api/evacuationcenters/' + barangayLoc,
      method: 'GET',
    })
      .then(function (response) {
        setLocation(response.data);
      })
      .catch(function (e) {
        console.log(e);
      });
  }, [evacName, landmark, phoneNo, capacity, availability]);
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
                latitude: parseFloat(data.evac_latitude),
                longitude: parseFloat(data.evac_longitude),
              }}
              onPress={(
                evacName,
                landmark,
                phoneNo,
                capacity,
                availability,
              ) => {
                showDetails(
                  data.evac_name,
                  data.nearest_landmark,
                  data.phone_no,
                  data.capacity,
                  data.availability,
                );
              }}
            />
          );
        })}
      </MapView>
      <View style={[styles.card, styles.elevation]}>
        <View style={styles.cardAlign}>
          <Text
            style={{
              color: 'black',
              fontWeight: 'bold',
              fontSize: 20,
              color: '#004F91',
            }}>
            {evacName}
          </Text>
        </View>
        <View style={styles.cardAlign}>
          <Text style={{color: 'black', fontWeight: 'bold'}}>Landmark: </Text>
          <Text style={{color: 'black'}}>{landmark}</Text>
        </View>
        <View style={styles.cardAlign}>
          <Text style={{color: 'black', fontWeight: 'bold'}}>
            Phone Number:{' '}
          </Text>
          <Text style={{color: 'black'}}>{phoneNo}</Text>
        </View>
        <View style={styles.cardAlign}>
          <Text style={{color: 'black', fontWeight: 'bold'}}>Capacity: </Text>
          <Text style={{color: 'black'}}>{capacity}</Text>
        </View>
        <View style={styles.cardAlign}>
          <Text style={{color: 'black', fontWeight: 'bold'}}>
            Availability:{' '}
          </Text>
          <Text style={{color: 'black'}}>{availability}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    //...StyleSheet.absoluteFillObject,
    height: Dimensions.get('window').height / 1.5,
    width: Dimensions.get('window').width,
  },
  map: {
    //...StyleSheet.absoluteFillObject,
  },

  cardAlign: {
    flexDirection: 'row',
  },

  card: {
    borderLeftWidth: 3,
    borderLeftColor: '#004F91',
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 10,
    width: '100%',
    marginVertical: 10,
  },
  elevation: {
    elevation: 2,
    shadowColor: '#52006A',
  },
});

export default EvacuationCenter;
