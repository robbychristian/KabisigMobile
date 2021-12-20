import React, {
  useState,
  useEffect,
  useCallback,
  useContext,
  useLayoutEffect,
} from 'react';
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
import Datastore from 'react-native-local-mongodb';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {UserContext} from '../../../provider/UserProvider';
import {useRoute} from '@react-navigation/native';
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
import {GiftedChat} from 'react-native-gifted-chat';
import {openDatabase} from 'react-native-sqlite-storage';
import {result} from 'validate.js';

function Chat() {
  const context = useContext(UserContext);
  const db = openDatabase({name: 'chats.db'});
  const navigation = useNavigation();
  const route = useRoute();
  const currUser = route.params.user;
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (db) {
    } else {
      console.log('nsadnsad');
    }
    const createTable = async () => {
      db.transaction(function (txn) {
        txn.executeSql(
          'CREATE TABLE IF NOT EXISTS chats(chat_id INTEGER PRIMARY KEY AUTOINCREMENT, text VARCHAR(255), createdAt VARCHAR(255), _id VARCHAR(255), name VARCHAR(255))',
          [],
        );
      });
      console.log('table created');
    };
    const unsubscribe = async () => {
      db.transaction(function (txn) {
        txn.executeSql('SELECT * FROM chats', [], function (tx, results) {
          console.log('item: ', results.rows.length);
          let temp = [];
          for (let i = 0; i < results.rows.length; i++) {
            temp.push(results.rows.item(i));
            setMessages(temp);
          }
        });
      });
    };
    unsubscribe();
    createTable();
    readUser();
    initialize();
    getConnectionInfo().then(info => console.log('Info inside chat: ', info));
    // receiveMessage().then(msg => {
    //   console.log('Message received successfully', msg);
    // });
    // console.log(user);
  }, []);

  //useLayoutEffect(() => {
  //  const destroyTable = async () => {
  //    db.transaction(function (txn) {
  //      txn.executeSql('DROP TABLE chats');
  //    });
  //  };
  //  return () => {
  //    destroyTable();
  //    console.log('destroyed successfully');
  //  };
  //});

  async function readUser() {
    // const user = AsyncStorage.getItem('user');
    // if (user) {
    //   await AsyncStorage.clear();
    //   console.log('cleared');
    //   const test = await AsyncStorage.getItem('user');
    //   if (test !== null) {
    //     console.log('not null');
    //   } else {
    //     console.log('null');
    //   }
    // }

    try {
      await AsyncStorage.setItem('user', JSON.stringify(user));
      setUser(currUser);
      console.log('success');
    } catch (e) {
      console.log('failed');
    }
  }

  async function handleSend(messages) {
    const m = db.transaction(function (txn) {
      txn.executeSql(
        'INSERT INTO chats (text, createdAt, _id, name) VALUES ("' +
          messages[0].text +
          '","' +
          messages[0].createdAt +
          '","' +
          messages[0].user._id +
          '","' +
          messages[0].user.fname +
          '")',
      ),
        [messages[0].text, messages[0].createdAt, messages[0].user._id];
    });
    console.log(messages[0].user._id);
  }
  //async function readUser() {
  //  const user = await AsyncStorage.getItem('user');
  //  if (user) {
  //    setUser(JSON.parse);
  //  }
  //}

  return (
    <GiftedChat
      messages={messages}
      onSend={messages => handleSend(messages)}
      user={user}
      textInputStyle={{color: 'black'}}
    />
  );
}

export default Chat;
