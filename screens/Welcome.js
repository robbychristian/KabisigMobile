import React from 'react';
import {
  ImageBackground,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';

function WelcomeScreen() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.logo}>
        <Image source={require('../assets/kabisig_white.png')}></Image>
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.registerButton}
          onPress={() => navigation.navigate('FirstRegister')}>
          <Text style={{color: '#004F91'}}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => navigation.push('Login')}>
          <Text style={{color: '#FFF'}}>Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  background: {
    backgroundColor: '#004F91',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    flex: 1,
    top: 130,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttons: {
    flex: 1,
    width: '80%',
    height: 60,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingVertical: '50%',
  },
  registerButton: {
    backgroundColor: '#FFF',
    color: '#004F91',
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    borderRadius: 50,
  },
  loginButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.00)',
    borderColor: '#FFF',
    borderWidth: 1,
    color: '#004F91',
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    borderRadius: 50,
  },
});

export default WelcomeScreen;
