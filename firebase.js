import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';

// Firebase config
const firebaseConfig = {
  apiKey: 'AIzaSyBN0YX2SaN7e5pKGtXdAhnCbJOCq9VGgPw',
  authDomain: 'kabisig-d8d96.firebaseapp.com',
  projectId: 'kabisig-d8d96',
  storageBucket: 'kabisig-d8d96.appspot.com',
  messagingSenderId: '1097020707923',
  appId: '1:1097020707923:web:9d2a50096ce3a9220622a6',
};

// initialize firebase
initializeApp(firebaseConfig);

export const auth = getAuth();
export const database = getFirestore();
