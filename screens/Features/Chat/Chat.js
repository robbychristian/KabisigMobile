// @refresh reset
import React, {
  useState,
  useEffect,
  useCallback,
  useContext,
  useLayoutEffect,
} from 'react';
import uuid from 'react-native-uuid';
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
import moment from 'moment';
import {
  collection,
  addDoc,
  orderBy,
  query,
  onSnapshot,
} from 'firebase/firestore';

import * as firebase from '../../../firebase';

function Chat() {
  const context = useContext(UserContext);
  const navigation = useNavigation();
  const route = useRoute();
  const currUser = route.params.user;
  const [user, setUser] = useState(null);
  const [isPressed, setIsPressed] = useState(false);
  const [textMsg, setTextMsg] = useState('');
  const [newMsg, setNewMsg] = useState([]);
  const [messages, setMessages] = useState([]);
  const [msgReceived, setMsgReceived] = useState(null);
  const uniqueID = uuid.v4();

  useEffect(() => {
    readUser();
    const collectionRef = collection(firebase.database, 'chats');
    const q = query(collectionRef, orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, querySnapshot => {
      setMessages(
        querySnapshot.docs.map(doc => ({
          _id: doc.data()._id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: doc.data().user,
        })),
      );
    });
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
    const {_id, createdAt, text, user} = messages[0];
    addDoc(collection(firebase.database, 'chats'), {
      _id,
      createdAt,
      text,
      user,
    });
  }, []);

  async function readUser() {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(user));
      setUser(currUser);
      console.log('success');
    } catch (e) {
      console.log('failed');
    }
  }

  const send = () => {
    //for p2p
    const testMessage = {
      _id: uuid.v4(),
      createdAt: new Date(),
      text: 'NOTHING',
      user: currUser,
    };
    console.log('the message being sent: ' + textMsg);
    setMessages(testMessage);

    sendMessage(textMsg)
      .then(metaInfo => setMessages(testMessage))
      .catch(err => console.log('Error while message sending', err));
  };

  return (
    <GiftedChat
      messages={messages}
      showAvatarForEveryMessage={true}
      onSend={messages => onSend(messages)}
      user={currUser}
      textInputStyle={{color: 'black'}}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  inputBox: {
    paddingHorizontal: 10,
    flex: 4,
    color: 'black',
  },
  senderBox: {
    backgroundColor: 'blue',
    alignSelf: 'flex-end',
    padding: 12,
    borderRadius: 20,
    color: 'white',
    maxWidth: 250,
  },
  receiverBox: {
    backgroundColor: 'white',
    alignSelf: 'flex-start',
    padding: 12,
    borderRadius: 20,
    color: 'black',
    maxWidth: 250,
  },
  senderFont: {
    fontSize: 15,
    color: 'white',
  },
  receiverFont: {
    fontSize: 15,
    color: 'black',
  },
  senderTimestamp: {
    color: '#f0f0f0',
    fontSize: 10,
    marginTop: 5,
    alignSelf: 'flex-end',
  },
  receiverTimestamp: {
    color: '#b0b0b0',
    marginTop: 5,
    fontSize: 10,
    alignSelf: 'flex-end',
  },
});

export default Chat;
