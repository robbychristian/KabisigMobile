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

function ChatRoom() {
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
      .then(() => {
        getInfo();
        receive();
      })
      .then(() =>
        getGroupInfo().then(info => console.log('getGroupInfo: ', info)),
      )
      .catch(err => console.error('Something gone wrong. Details: ', err));
  };

  //create room
  const createRoom = () => {
    createGroup('name')
      .then(() => console.log('Group created successfully!'))
      .catch(err => console.error('Something gone wrong. Details: ', err))
      .finally(setRoomCreated(true));
  };

  //destroy room
  const destroyRoom = () => {
    removeGroup()
      .then(() => console.log("Currently you don't belong to group!"))
      .catch(err => console.error('Something gone wrong. Details: ', err))
      .finally(setRoomCreated(false));
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
      getInfo();
      receive();
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
      getInfo();
      receive();
    } catch {}
  }, []);
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
        <TouchableOpacity onPress={grant}>
          <Text style={{color: 'black'}}>Discover Peers</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={stopDiscovering}>
          <Text style={{color: 'black'}}>Stop Discovering Peers</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={createRoom}>
          <Text style={{color: 'black'}}>Create Room</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={getInfo}>
          <Text style={{color: 'black'}}>Get Connection Info</Text>
        </TouchableOpacity>
        <TextInput style={styles.chatInput} onChangeText={setMessageSent} />
        <TouchableOpacity onPress={send}>
          <Text style={{color: 'black'}}>Send Message</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={receive}>
          <Text style={{color: 'black'}}>Receive Message</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={destroyRoom}>
          <Text style={{color: 'black'}}>Destroy Group</Text>
        </TouchableOpacity>
        <Text style={{color: 'black', fontWeight: 'bold'}}>
          {messageReceived}
        </Text>
      </View>
      <View style={{flex: 1}}>
        <FlatList
          style={styles.discoverPeersBox}
          nestedScrollEnabled
          data={availableDevices}
          keyExtractor={({id}, index) => id}
          renderItem={({item}) => (
            <View>
              <TouchableOpacity
                style={{marginHorizontal: 10, marginVertical: 5}}
                onPress={() => {
                  connectToFirstDevice(item.deviceAddress);
                  getInfo();
                }}>
                <Text style={{color: 'black'}}>{item.deviceName}</Text>
              </TouchableOpacity>
            </View>
          )}
        />

        <FlatList
          style={{
            flex: 10,
            height: '100%',
            width: '80%',
            borderColor: 'black',
            borderWidth: 1,
            alignSelf: 'center',
            marginTop: 10,
          }}
          nestedScrollEnabled
          data={chatMessages}
          keyExtractor={({id}, index) => id}
          renderItem={({item}) => (
            <View>
              <Text>{item}</Text>
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
});

export default ChatRoom;
