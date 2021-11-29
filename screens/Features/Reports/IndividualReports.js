import React, {useState, useEffect, useContext, useRef} from 'react';
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
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import {
  createNativeStackNavigator,
  Header,
} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import {useRoute} from '@react-navigation/native';
import {CommonActions} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {UserContext} from '../../../provider/UserProvider';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  format,
  formatDistance,
  formatRelative,
  getDate,
  subDays,
} from 'date-fns';
import moment from 'moment';

function IndividualReports() {
  const route = useRoute();
  const image = route.params.image;
  const title = route.params.title;
  const description = route.params.description;
  const status = route.params.status;
  const created_at = route.params.created_at;

  const formatDate = moment(created_at).format('LL');
  const formatTime = moment(created_at).format('LT');
  const [textStatus, setTextStatus] = useState('');
  const newStatus = () => {
    if (status == 'Report Pending') {
      return <Text style={{color: 'yellow'}}>Report Pending</Text>;
    } else if (status == 'Report Confirmed') {
      return <Text style={{color: 'green'}}>Report Pending</Text>;
    } else if (status == 'Not Confirmed') {
      return <Text style={{color: 'yellow'}}>Not Confirmed</Text>;
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Image source={{uri: image}} style={{height: 250, width: 250}} />
        <Text
          style={{
            color: 'black',
            fontWeight: 'bold',
            fontSize: 20,
            marginTop: 10,
            flexShrink: 1,
            marginBottom: 5,
          }}>
          Title: {title}
        </Text>

        <View style={styles.content}>
          <Icon
            name="sticky-note"
            color="#004F91"
            size={20}
            style={{marginRight: 10}}></Icon>
          <Text style={{color: 'black', flexShrink: 1}}>
            Description: {description}
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Icon
            name="ellipsis-h"
            color="#004F91"
            size={20}
            style={{marginRight: 10}}></Icon>
          <Text style={{color: 'black'}}>Status: </Text>
          {status == 'Report Pending' ? (
            <View style={{flexDirection: 'row'}}>
              <Text style={{color: '#ff8800', fontWeight: 'bold'}}>
                {status}
              </Text>
              <Icon
                name="clock-o"
                color="#ff8800"
                size={20}
                style={{marginLeft: 5}}></Icon>
            </View>
          ) : status == 'Report Confirmed' ? (
            <View style={{flexDirection: 'row'}}>
              <Text style={{color: 'green', fontWeight: 'bold'}}>{status}</Text>
              <Icon
                name="check-circle"
                color="green"
                size={20}
                style={{marginLeft: 5}}></Icon>
            </View>
          ) : (
            <View style={{flexDirection: 'row'}}>
              <Text style={{color: 'red', fontWeight: 'bold'}}>{status}</Text>
              <Icon
                name="times-circle"
                color="red"
                size={20}
                style={{marginLeft: 5}}></Icon>
            </View>
          )}
        </View>
        <View style={styles.content}>
          <Icon
            name="calendar"
            color="#004F91"
            size={20}
            style={{marginRight: 10}}></Icon>
          <Text style={{color: 'black'}}>Date: {formatDate}</Text>
        </View>
        <View style={styles.content}>
          <Icon
            name="clock-o"
            color="#004F91"
            size={20}
            style={{marginRight: 10}}></Icon>
          <Text style={{color: 'black'}}>Time: {formatTime}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#fff',
    //padding: 10,
  },
  card: {
    backgroundColor: '#fff',
    marginVertical: 100,
    marginHorizontal: 15,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 0.3,
    elevation: 8,
  },
  content: {
    flexDirection: 'row',
  },
});
export default IndividualReports;
