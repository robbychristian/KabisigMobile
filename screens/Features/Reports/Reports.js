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

function Reports() {
  const user = useContext(UserContext);
  const navigation = useNavigation();
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const isBlocked = user.isBlocked;
  //const [refreshing, setRefreshing] = useState(false);
  //const [itemState, setItemState] = useState(data);

  //useEffect(() => {
  //  if (initialMount.current) {
  //    initialMount.current = false;
  //    //data.isFetching = false;
  //    fetch('https://kabisigapp.com/api/fetchreport/' + user.id)
  //      .then(response => response.json())
  //      .then(json => {
  //        setData(json);
  //        setRefreshing(false);
  //      })
  //      .then(response => response.json())
  //      .then(json => {
  //        setData(json);
  //      })
  //      .catch(e => {
  //        Alert.alert('Error', 'There was an error fetching reports.');
  //      })
  //      .finally(() => setLoading(false));
  //  } else {
  //    fetch('https://kabisigapp.com/api/fetchreport/' + user.id)
  //      .then(response => response.json())
  //      .then(json => {
  //        setData(json);
  //      })
  //      .then(response => response.json())
  //      .then(json => {
  //        setData(json);
  //      })
  //      .catch(e => {
  //        Alert.alert('Error', 'There was an error fetching reports.');
  //      })
  //      .finally(() => setLoading(false));
  //  }
  //}, []);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    //data.isFetching = false;
    fetch('https://kabisigapp.com/api/fetchreport/' + user.id + '/' + user.brgy)
      .then(response => response.json())
      .then(json => {
        setData(json);
        setRefreshing(false);
      })
      .then(response => response.json())
      .then(json => {
        setData(json);
      })
      .catch(e => {
        //Alert.alert('Error', 'There was an error fetching reports.');
      })
      .finally(() => setLoading(false));
  };

  const deleteReport = id => {
    fetch('https://kabisigapp.com/api/deletereport/' + id)
      .then(response => response.json())
      .then(response => {
        console.log(response);
      })
      .catch(e => {
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
        <View style={{flex: 1}}>
          <View style={styles.reportsContainer}>
            <View
              style={{
                flex: 7,
                height: '100%',
                justifyContent: 'center',
              }}>
              <Text style={styles.reportTitle}>History of Reports</Text>
            </View>
            {isBlocked ? (
              <TouchableOpacity
                style={styles.reportBtn}
                onPress={() =>
                  Alert.alert(
                    'Blocked!',
                    'You have been blocked from sending reports due to false information.',
                  )
                }>
                <Text
                  style={{
                    color: '#FFF',
                    fontSize: 20,
                    fontWeight: 'bold',
                  }}>
                  Send Report
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.reportBtn}
                onPress={() => navigation.navigate('AddReport')}>
                <Text style={{color: '#FFF', fontSize: 20, fontWeight: 'bold'}}>
                  Send Report
                </Text>
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.flatListContainer}>
            <FlatList
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              nestedScrollEnabled
              data={data}
              keyExtractor={({id}, index) => id}
              renderItem={({item, index}) => (
                <View style={styles.content}>
                  <View style={{flex: 2}}>
                    <Image
                      source={{
                        uri:
                          'https://kabisigapp.com/KabisigGit/storage/app/public/report_imgs/' +
                          user.id +
                          '/' +
                          item.loc_img,
                      }}
                      style={{
                        flex: 1,
                        width: undefined,
                        height: undefined,
                      }}
                    />
                  </View>
                  <View style={{flex: 10}}>
                    <Text style={styles.reportHeading}> {item.title} </Text>
                    <Text style={styles.reportDesc}> {item.description} </Text>
                  </View>
                  <TouchableOpacity
                    style={{flex: 1}}
                    onPress={() => {
                      deleteReport(item.id);
                      setData(prevItemState =>
                        prevItemState.filter(
                          (_item, _Index) => _Index !== index,
                        ),
                      );
                    }}>
                    <Icon name="trash" size={30} color="#d9534f" />
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  reportsContainer: {
    flex: 2,
    width: '100%',
    flexDirection: 'row',
  },
  reportTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#333333',
  },
  reportBtn: {
    flex: 4,
    width: '100%',
    height: '50%',
    backgroundColor: '#004F91',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    padding: 7,
  },
  flatListContainer: {
    flex: 10,
    paddingTop: 20,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#ececec',
    borderBottomWidth: 2,
    borderLeftColor: '#004F91',
    borderLeftWidth: 8,
    //padding: 10,
    height: 90,
  },
  reportImg: {},
  reportHeading: {
    color: '#333333',
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    flexShrink: 1,
  },
  reportDesc: {
    color: '#333333',
    fontSize: 15,
    textTransform: 'capitalize',
    flexShrink: 1,
  },
  reportStatus: {
    textTransform: 'capitalize',
    fontSize: 13,
    fontWeight: 'bold',
    color: '#004F91',
  },
});

export default Reports;
