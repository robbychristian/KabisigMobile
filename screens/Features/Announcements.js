import React, {useState, useEffect, useContext} from 'react';
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
import {useNavigation} from '@react-navigation/native';
import {CommonActions} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {SafeAreaView} from 'react-native-safe-area-context';
import {format, formatDistance, formatRelative, subDays} from 'date-fns';
import {Dimensions} from 'react-native';
import axios from 'axios';

import {useRoute} from '@react-navigation/native';

var width = Dimensions.get('window').width; //full width
function Announcements() {
  const navigation = useNavigation();
  const context = useContext(UserContext);
  const brgy = context.brgy;
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios({
      url: 'https://kabisigapp.com/api/announcements/' + brgy,
      method: 'GET',
    })
      .then(function (response) {
        setData(response.data);
        setRefreshing(false);
        setLoading(false);
      })
      .catch(function (e) {
        console.log(e);
      });
  };

  const onRefresh = () => {
    setData([]);
    getData();
  };

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <View>
          <FlatList
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            nestedScrollEnabled
            data={data}
            keyExtractor={({id}, index) => id}
            renderItem={({item}) => (
              <View>
                <TouchableOpacity
                  style={styles.content}
                  onPress={() => {
                    navigation.push('Individual Announcement', {
                      title: item.title,
                      body: item.body,
                      name: item.name,
                      timestamp: item.created_at,
                    });
                  }}>
                  <Icon
                    name="bullhorn"
                    color="#004F91"
                    size={25}
                    style={{paddingLeft: 15}}></Icon>
                  <View style={styles.announceContainer}>
                    <Text style={styles.announceTextTitle}>{item.title}</Text>
                    <Text style={styles.announcedate}>{item.created_at}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const component = () => {
  //Posted at:{' '}
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //padding: 30,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#ececec',
    borderBottomWidth: 2,
  },
  announceContainer: {
    backgroundColor: '#fff',
    flex: 1,
  },
  announceTextTitle: {
    color: '#333333',
    fontSize: 20,
    fontWeight: 'bold',
    paddingRight: 15,
    paddingTop: 15,
    paddingLeft: 15,
    paddingBottom: 5,
    textTransform: 'capitalize',
    flexShrink: 1,
  },
  announcedate: {
    color: 'gray',
    fontSize: 13,
    paddingLeft: 15,
    paddingBottom: 5,
    fontWeight: 'bold',
    flexShrink: 1,
  },
});

export default Announcements;
