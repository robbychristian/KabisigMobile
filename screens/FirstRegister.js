import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {TextInput} from 'react-native-gesture-handler';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import {useRoute} from '@react-navigation/native';
import {useValidation} from 'react-native-form-validator';

const FirstRegisterScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [fname, setFname] = useState(null);
  const [mname, setMname] = useState(null);
  const [lname, setLname] = useState(null);
  const [email, setEmail] = useState(null);
  const [pass, setPass] = useState(null);
  const [confPass, setConfPass] = useState(null);
  const {validate, isFieldInError, getErrorsInField, getErrorMessages} =
    useValidation({
      state: {fname, mname, lname, email, pass, confPass},
    });

  const validateData = function () {
    if (
      fname == null ||
      mname == null ||
      lname == null ||
      email == null ||
      pass == null ||
      confPass == null
    ) {
      Alert.alert('Field(s) are empty', 'Fill up all the forms');
    } else if (
      validate({
        fname: {minlength: 2, required: true},
        mname: {minlength: 2, required: true},
        lname: {minlength: 2, required: true},
        email: {email: true, require: true},
        pass: {
          minlength: 8,
          require: true,
          hasNumber: true,
          hasUpperCase: true,
          hasLowerCase: true,
          hasSpecialCharacter: true,
        },
        confPass: {equalPassword: pass},
      })
    ) {
      navigation.push('SecondRegister', {
        fname: fname,
        mname: mname,
        lname: lname,
        email: email,
        pass: pass,
        cpass: confPass,
      });
    } else {
      isFieldInError('email') &&
        getErrorsInField('email').map(e => {
          Alert.alert('A field is not properly field', e);
        });
      isFieldInError('confPass') &&
        getErrorsInField('confPass').map(e => {
          Alert.alert('A field is not properly field', e);
        });
      isFieldInError('fname') &&
        getErrorsInField('fname').map(e => {
          Alert.alert('A field is not properly field', e);
        });
      isFieldInError('mname') &&
        getErrorsInField('mname').map(e => {
          Alert.alert('A field is not properly field', e);
        });
      isFieldInError('lname') &&
        getErrorsInField('lname').map(e => {
          Alert.alert('A field is not properly field', e);
        });
      isFieldInError('pass') &&
        getErrorsInField('pass').map(e => {
          Alert.alert('A field is not properly field', e);
        });
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.textStyle}>Create your account</Text>
      </View>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.formInput}
          placeholderTextColor="gray"
          returnKeyType="next"
          onChangeText={setFname}
          placeholder="First Name"
        />
        <TextInput
          style={styles.formInput}
          placeholderTextColor="gray"
          returnKeyType="next"
          onChangeText={setMname}
          placeholder="Middle Name"
        />
        <TextInput
          style={styles.formInput}
          placeholderTextColor="gray"
          returnKeyType="next"
          onChangeText={setLname}
          placeholder="Last Name"
        />
        <TextInput
          style={styles.formInput}
          placeholderTextColor="gray"
          returnKeyType="next"
          onChangeText={setEmail}
          placeholder="Email"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.formInput}
          placeholderTextColor="gray"
          returnKeyType="next"
          onChangeText={setPass}
          placeholder="Password"
          secureTextEntry
        />
        <TextInput
          style={styles.formInput}
          placeholderTextColor="gray"
          returnKeyType="next"
          onChangeText={setConfPass}
          placeholder="Confirm Password"
          secureTextEntry
        />
        <TouchableOpacity style={styles.nextBtn} onPress={validateData}>
          <Text style={{color: '#FFF'}}>Next</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textContainer: {
    flex: 1,
    backgroundColor: '#004F91',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#FFF',
  },
  formContainer: {
    flex: 7,
    backgroundColor: '#f4f4f4',
    paddingTop: 15,
    alignItems: 'center',
  },
  formInput: {
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    marginTop: 15,
    width: '80%',
    fontSize: 20,
    color: '#000',
  },
  nextBtn: {
    backgroundColor: '#007ADE',
    color: '#004F91',
    width: '80%',
    marginTop: 35,
    alignItems: 'center',
    justifyContent: 'center',
    height: '10%',
  },
});

export default FirstRegisterScreen;
