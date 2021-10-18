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
} from 'react-native';
import {
  createNativeStackNavigator,
  Header,
} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import {CommonActions} from '@react-navigation/native';

function LoginScreen() {
  const navigation = useNavigation();
  const [email, onChangeEmail] = useState(null);
  const [pass, onChangePass] = useState(null);

  _onPressButtonGET = function () {
    if (email != '' || pass != '') {
      fetch('https://kabisigapp.com/api/login/' + email + '/' + pass, {
        method: 'GET',
      })
        .then(response => response.json())
        .then(responseData => {
          if (responseData == 1) {
            Alert.alert('Successful', 'You have logged in your account!');
          }
        })
        .done();
    } else {
      Alert.alert(
        'Field(s) are empty!',
        'Email field and password field are required!',
      );
    }
  };

  return (
    <KeyboardAvoidingView style={styles.background}>
      <View style={styles.logo}>
        <Image source={require('../assets/kabisig_blue.png')} />
        <Text style={styles.logoText}>Login Your Account</Text>
      </View>
      <View style={styles.form}>
        <TextInput
          style={styles.formInput}
          onChangeText={onChangeEmail}
          placeholder="Email"></TextInput>
        <TextInput
          style={styles.formInput}
          placeholder="Password"
          onChangeText={onChangePass}
          secureTextEntry={true}></TextInput>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={_onPressButtonGET}>
          <Text style={{color: '#FFF'}}>Login</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#FFF',
    flex: 1,
  },
  logo: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#004F91',
    marginTop: 15,
  },
  form: {
    backgroundColor: '#004F91',
    width: '100%',
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formInput: {
    height: '13%',
    width: '75%',
    margin: 12,
    borderWidth: 1,
    borderColor: '#FFF',
    backgroundColor: '#fff',
  },
  loginButton: {
    backgroundColor: '#007ADE',
    color: '#004F91',
    width: '40%',
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
    height: '10%',
  },
});

export default LoginScreen;
