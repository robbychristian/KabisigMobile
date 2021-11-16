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
  Modal,
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
import {UserContext} from '../provider/UserProvider';
import axios from 'axios';

function LoginScreen() {
  const user = useContext(UserContext);
  const navigation = useNavigation();
  const [email, onChangeEmail] = useState(null);
  const [pass, onChangePass] = useState(null);
  const [loading, setLoading] = useState(false);
  const formdata = new FormData();
  const formfetch = new FormData();
  const _onPressButtonGET = function () {
    if (email != '' || pass != '') {
      formdata.append('email', email);
      formdata.append('pass', pass);
      setLoading(true);
      axios({
        url: 'https://kabisigapp.com/api/logincreds',
        method: 'POST',
        data: formdata,
        headers: {
          Accept: 'application/form-data',
          'Content-Type': 'multipart/form-data',
        },
      })
        .then(function (response) {
          if (response.data == 1) {
            formfetch.append('email', email);
            axios({
              url: 'https://kabisigapp.com/api/fetch',
              method: 'POST',
              data: formfetch,
              headers: {
                Accept: 'application/form-data',
                'Content-Type': 'multipart/form-data',
              },
            })
              .then(function (response) {
                setLoading(false);
                if (response.data[0].email_verified_at != null) {
                  user.id = response.data[0].id;
                  user.fname = response.data[0].first_name;
                  user.mname = response.data[0].middle_name;
                  user.lname = response.data[0].last_name;
                  user.brgy = response.data[0].brgy_loc;
                  user.email = response.data[0].email;
                  user.pass = response.data[0].password;
                  user.profilePic = response.data[0].profile_pic;
                  user.contactNo = response.data[0].contact_no;
                  user.homeAdd = response.data[0].home_address;
                  user.isBlocked = response.data[0].is_blocked;
                  user.homeAdd = response.data[0].home_add;
                  navigation.reset({
                    index: 0,
                    routes: [
                      {
                        name: 'HomeLogin',
                      },
                    ],
                  });
                } else if (response.data[0].is_deactivated == 1) {
                  setLoading(false);
                  Alert.alert(
                    'Deactivated account',
                    'This account has been deactivated. Ask for the barangay official to activate the account.',
                  );
                } else {
                  setLoading(false);
                  Alert.alert(
                    'Verify Email',
                    'Verify your email before logging in!',
                  );
                }
              })
              .catch(function (error) {
                setLoading(false);
                console.log(error);
              });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      Alert.alert(
        'Field(s) are empty!',
        'Email field and password field are required!',
      );
    }
  };

  return (
    <KeyboardAvoidingView style={styles.background}>
      <Modal transparent={true} visible={loading}>
        <View style={styles.modalBackground}>
          <View style={styles.activityIndicatorWrapper}>
            <ActivityIndicator animating={loading} color="blue" />
          </View>
        </View>
      </Modal>
      <View style={styles.logo}>
        <Image source={require('../assets/kabisig_blue.png')} />
        <Text style={styles.logoText}>Login Your Account</Text>
      </View>
      <View style={styles.form}>
        <TextInput
          style={styles.formInput}
          onChangeText={onChangeEmail}
          textContentType="emailAddress"
          keyboardType="email-address"
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
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040',
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 50,
    width: 50,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

export default LoginScreen;
