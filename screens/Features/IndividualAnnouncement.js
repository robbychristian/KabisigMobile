import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Alert,
  ActivityIndicator,
  RefreshControl,
  FlatList,
} from 'react-native';
import {
  createNativeStackNavigator,
  Header,
} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {UserContext} from '../../provider/UserProvider';
import {useRoute} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import {CommonActions} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {SafeAreaView} from 'react-native-safe-area-context';
import {format, formatDistance, formatRelative, subDays} from 'date-fns';
import {Dimensions} from 'react-native';
import axios from 'axios';
import moment from 'moment';

function IndividualAnnouncement() {
  const route = useRoute();
  const time = route.params.timestamp;
  const name = route.params.name;
  const title = route.params.title;
  const body = route.params.body;

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.announceTextTitle}>{title}</Text>
        <View style={styles.border}></View>
        <View style={styles.announceContainer}>
          <View>
            <Icon name="user" color="#004F91" size={45}></Icon>
          </View>
          <View style={{paddingHorizontal: 10, paddingVertical: 3}}>
            <Text style={styles.announceName}>{name}</Text>
            <Text style={styles.announceDate}>
              {moment(time).format('LLLL')}
            </Text>
          </View>
        </View>

        <Text style={styles.body}>{body}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    backgroundColor: '#fff',
  },
  announceTextTitle: {
    color: '#333333',
    fontSize: 30,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    flexShrink: 1,
    paddingHorizontal: 25,
    paddingVertical: 15,
  },
  announceContainer: {
    flexDirection: 'row',
    paddingHorizontal: 25,
    paddingVertical: 15,
  },
  announceName: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 15,
  },
  announceDate: {
    color: '#808080',
    fontSize: 15,
  },
  border: {
    borderBottomWidth: 1,
    borderBottomColor: '#d3d3d3',
  },
  body: {
    color: 'black',
    fontSize: 15,
    paddingHorizontal: 25,
    paddingVertical: 5,
  },
});

export default IndividualAnnouncement;
