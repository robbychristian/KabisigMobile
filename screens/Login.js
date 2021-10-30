import React, {useState, useContext} from 'react';
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
import Icon from 'react-native-vector-icons/FontAwesome';
import {UserContext} from '../provider/UserProvider';

function LoginScreen() {
  const user = useContext(UserContext);
  const navigation = useNavigation();
  const [email, onChangeEmail] = useState(null);
  const [pass, onChangePass] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const _onPressButtonGET = function () {
    if (email != '' || pass != '') {
      fetch('https://kabisigapp.com/api/logincreds/' + email + '/' + pass, {
        method: 'GET',
      })
        .then(response => response.json())
        .then(responseData => {
          if (responseData == 1) {
            fetch('https://kabisigapp.com/api/fetch/' + email, {
              method: 'GET',
            })
              .then(response => response.json())
              .then(responseData => {
                if (responseData[0].email_verified_at != null) {
                  user.id = responseData[0].id;
                  user.fname = responseData[0].first_name;
                  user.mname = responseData[0].middle_name;
                  user.lname = responseData[0].last_name;
                  user.brgy = responseData[0].brgy_loc;
                  user.email = responseData[0].email;
                  user.pass = responseData[0].password;
                  user.profilePic = responseData[0].profile_pic;
                  user.contactNo = responseData[0].contact_no;
                  user.isBlocked = responseData[0].is_blocked;
                  user.homeAdd = responseData[0].home_add;
                  navigation.reset({
                    index: 0,
                    routes: [
                      {
                        name: 'HomeLogin',
                      },
                    ],
                  });
                } else if (responseData[0].is_deactivated == 1) {
                  Alert.alert(
                    'Login Failed',
                    'It seems like your account has been deactivated.',
                  );
                } else {
                  Alert.alert(
                    'Login Failed',
                    'Make sure that your email is verified!',
                  );
                }
              });
          }
        })
        .catch(e => {
          Alert.alert(
            'Invalid Credentials',
            'Credentials does not match anything in the record.',
          );
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
          placeholderTextColor="#808080"
          placeholder="Email"></TextInput>
        <TextInput
          style={styles.formInput}
          placeholderTextColor="#808080"
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
    color: '#000',
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
