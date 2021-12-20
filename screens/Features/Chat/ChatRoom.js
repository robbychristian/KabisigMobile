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
import {UserContext} from '../../../provider/UserProvider';
import {useNavigation} from '@react-navigation/native';
import {CommonActions} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {SafeAreaView} from 'react-native-safe-area-context';
import {format, formatDistance, formatRelative, subDays} from 'date-fns';
import {Dimensions} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {PermissionsAndroid} from 'react-native';
import {
  CONNECTED,
  INVITED,
  FAILED,
  AVAILABLE,
  UNAVAILABLE,
} from 'react-native-wifi-p2p/device-info-statuses';
import {
  initialize,
  startDiscoveringPeers,
  stopDiscoveringPeers,
  unsubscribeFromPeersUpdates,
  unsubscribeFromThisDeviceChanged,
  unsubscribeFromConnectionInfoUpdates,
  subscribeOnConnectionInfoUpdates,
  subscribeOnThisDeviceChanged,
  subscribeOnPeersUpdates,
  connect,
  cancelConnect,
  createGroup,
  removeGroup,
  getAvailablePeers,
  sendFile,
  receiveFile,
  getConnectionInfo,
  getGroupInfo,
  receiveMessage,
  sendMessage,
} from 'react-native-wifi-p2p';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {openDatabase} from 'react-native-sqlite-storage';

function ChatRoom() {
  const db = openDatabase({name: 'chats.db'});

  const navigator = useNavigation();
  const context = useContext(UserContext);
  const [messageReceived, setMessageReceived] = useState('');
  const [messageSent, setMessageSent] = useState('');
  const [availableDevices, setAvailableDevices] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);
  const [roomCreated, setRoomCreated] = useState(false);
  const [hostName, setHostName] = useState('');

  //get connection Info
  const getInfo = () => {
    getConnectionInfo().then(info => console.log('getConnectionInfo', info));
  };

  //connect to first device
  const connectToFirstDevice = deviceAddress => {
    connect(deviceAddress)
      .then(() => {
        console.log('Successfully connected');
      })
      .then(() =>
        subscribeOnThisDeviceChanged(event => {
          if (event.owner.status == 4) {
            navigator.push('P2P Chat', {
              user: {
                _id: context.id,
                fname: context.fname,
              },
            });
          }
        }),
      )
      .catch(err => console.error('Something gone wrong. Details: ', err));
  };

  //create room
  const createRoom = () => {
    createGroup('name')
      .then(() => console.log('Group created successfully!'))
      .then(() => {
        navigator.push('P2P Chat', {
          user: {
            _id: context.id,
            fname: context.fname,
          },
        });
      })
      .catch(err => console.error('Something gone wrong. Details: ', err))
      .finally(setRoomCreated(true));
  };

  //destroy room
  const destroyRoom = () => {
    removeGroup()
      .then(() => console.log("Currently you don't belong to group!"))
      .catch(err => console.error('Something gone wrong. Details: ', err))
      .finally(() => {
        const destroyTable = async () => {
          db.transaction(function (txn) {
            txn.executeSql('DROP TABLE chats');
          });
        };
        destroyTable();
        console.log('destroyed successfully');
      });
  };

  //Send message
  const send = () => {
    sendMessage(messageSent)
      .then(metaInfo => console.log('Message sent successfully', metaInfo))
      .then(() => {
        getGroupInfo().then(info => console.log('getGroupInfo: ', info));
        getInfo();
        receive();
      })
      .catch(err => console.log('Error while message sending', err));
  };

  //Receive message
  const receive = () => {
    receiveMessage()
      .then(msg => {
        console.log('Message received successfully', msg);
        setMessageReceived(msg);
      })
      .then(() => {
        getGroupInfo().then(info => console.log('getGroupInfo: ', info));
        getInfo();
        receive();
      })
      .catch(err => console.log('Error while message receiving', err));
  };

  //Search for peers
  const grant = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Access to wi-fi P2P mode',
        message: 'ACCESS_COARSE_LOCATION',
      },
    );
    console.log(
      granted === PermissionsAndroid.RESULTS.GRANTED
        ? 'You can use the p2p mode'
        : 'Permission denied: p2p mode will not work',
    );
    startDiscoveringPeers()
      .then(() => console.log('Starting of discovering was successful'))
      .catch(err => console.error(err));
    subscribeOnPeersUpdates(({devices}) => {
      console.log('OnPeersUpdated', devices);
      setAvailableDevices(devices);
    });
  };

  //Stop searching
  const stopDiscovering = () => {
    stopDiscoveringPeers()
      .then(() => console.log('Stop discovering was successful'))
      .catch(err =>
        console.error(
          `Something is gone wrong. Maybe your WiFi is disabled? Error details: ${err}`,
        ),
      );
    unsubscribeFromPeersUpdates(event => console.log(event));
  };
  useEffect(() => {
    try {
      initialize();
      subscribeOnThisDeviceChanged(event => {
        console.log('This device changed: ', event);
      });
    } catch {}
  }, []);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFF'}}>
      <View style={styles.container}>
        <View style={styles.parent}>
          <TouchableOpacity style={styles.child} onPress={grant}>
            <Icon name="user-plus" color="#004F91" size={75} />
            <Text style={styles.boxText}>Discover Peers</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.child} onPress={stopDiscovering}>
            <Icon name="user-times" color="#004F91" size={75} />
            <Text style={styles.boxText}>Stop Discover Peers</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.parent}>
          <TouchableOpacity style={styles.child} onPress={createRoom}>
            <Icon name="comments" solid color="#004F91" size={75} />
            <Text style={styles.boxText}>Create Room</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.child} onPress={destroyRoom}>
            <Icon name="comment-slash" color="#004F91" size={75} />
            <Text style={styles.boxText}>Destroy Room</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.btmContainer}>
        <Text
          style={{
            fontFamily: 'roboto-700',
            color: 'rgba(0,79,145,1)',
            fontSize: 20,
            fontWeight: 'bold',
            marginLeft: 5,
          }}>
          Discovered Nearby Devices:{' '}
        </Text>
        <FlatList
          style={styles.card}
          nestedScrollEnabled
          data={availableDevices}
          keyExtractor={({id}, index) => id}
          renderItem={({item}) => (
            <View>
              <TouchableOpacity
                onPress={() => {
                  connectToFirstDevice(item.deviceAddress);
                  getInfo();
                }}>
                <Text style={{color: 'black'}}>{item.deviceName}</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  chatInput: {
    borderColor: 'black',
    borderWidth: 1,
    width: '50%',
    height: '15%',
    color: 'black',
  },
  discoverPeersBox: {
    flex: 2,
    borderWidth: 1,
    borderColor: 'black',
    width: '80%',
    alignSelf: 'center',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  boxText: {
    fontFamily: 'roboto-regular',
    color: 'rgba(0,79,145,1)',
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 'bold',
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
    justifyContent: 'space-evenly',
    borderWidth: 1.5,
    borderRadius: 20,
    borderColor: '#004F91',
    borderBottomWidth: 2,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.9,
    shadowRadius: 10,
  },
  btmContainer: {
    height: '100%',
    width: '100%',
  },
  card: {
    backgroundColor: '#fff',
    marginTop: 20,
    height: '20%',
    marginHorizontal: 15,
    padding: 20,
    shadowColor: 'black',
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 0.3,
    elevation: 8,
  },
});

export default ChatRoom;

//<SafeAreaView style={{flex: 1}}>
//  <View style={{flex: 1}}>
//    <TouchableOpacity onPress={grant}>
//      <Text style={{color: 'black'}}>Discover Peers</Text>
//    </TouchableOpacity>
//    <TouchableOpacity onPress={stopDiscovering}>
//      <Text style={{color: 'black'}}>Stop Discovering Peers</Text>
//    </TouchableOpacity>
//    <TouchableOpacity onPress={createRoom}>
//      <Text style={{color: 'black'}}>Create Room</Text>
//    </TouchableOpacity>
//    <TouchableOpacity onPress={getInfo}>
//      <Text style={{color: 'black'}}>Get Connection Info</Text>
//    </TouchableOpacity>
//    <TextInput style={styles.chatInput} onChangeText={setMessageSent} />
//    <TouchableOpacity onPress={send}>
//      <Text style={{color: 'black'}}>Send Message</Text>
//    </TouchableOpacity>
//    <TouchableOpacity onPress={receive}>
//      <Text style={{color: 'black'}}>Receive Message</Text>
//    </TouchableOpacity>
//    <TouchableOpacity onPress={destroyRoom}>
//      <Text style={{color: 'black'}}>Destroy Group</Text>
//    </TouchableOpacity>
//    <Text style={{color: 'black', fontWeight: 'bold'}}>
//      {messageReceived}
//    </Text>
//  </View>
//  <View style={{flex: 1}}>
//    <FlatList
//      style={styles.discoverPeersBox}
//      nestedScrollEnabled
//      data={availableDevices}
//      keyExtractor={({id}, index) => id}
//      renderItem={({item}) => (
//        <View>
//          <TouchableOpacity
//            style={{marginHorizontal: 10, marginVertical: 5}}
//            onPress={() => {
//              connectToFirstDevice(item.deviceAddress);
//              getInfo();
//            }}>
//            <Text style={{color: 'black'}}>{item.deviceName}</Text>
//          </TouchableOpacity>
//        </View>
//      )}
//    />
//  </View>
//</SafeAreaView>
