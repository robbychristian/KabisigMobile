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
  FlatList,
  Modal,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {
  createNativeStackNavigator,
  Header,
} from '@react-navigation/native-stack';
import {UserContext} from '../../provider/UserProvider';
import {NavigationContainer} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import {CommonActions} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {SafeAreaView} from 'react-native-safe-area-context';
import {format, formatDistance, formatRelative, subDays} from 'date-fns';
import {Dimensions} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useValidation} from 'react-native-form-validator';
import axios from 'axios';

function EditProfile() {
  //context values
  const context = useContext(UserContext);
  const id = context.id;
  const fname = context.fname;
  const mname = context.mname;
  const lname = context.lname;
  const contactNo = context.contactNo;
  const profilePic = context.profilePic;
  const homeAdd = context.homeAdd;
  const [loading, setLoading] = useState(false);
  //new Values
  const [newFName, setNewFName] = useState(context.fname);
  const [newMName, setNewMName] = useState(context.mname);
  const [newLName, setNewLName] = useState(context.lname);
  const [newContactNo, setNewContactNo] = useState(context.contactNo);
  const [newHomeAdd, setNewHomeAddress] = useState(context.homeAdd);
  const [currPass, setCurrPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confPass, setConfPass] = useState('');
  const [photo, setPhoto] = useState('');
  const [imgUri, setImgUri] = useState(context.profilePic);
  const [imgName, setImgName] = useState(context.profilePic);

  const {validate, isFieldInError, getErrorsInField, getErrorMessages} =
    useValidation({
      state: {
        newFName,
        newMName,
        newLName,
        currPass,
        newContactNo,
        newPass,
        confPass,
        photo,
      },
    });

  const formdata = new FormData();
  const checkPassForm = new FormData();
  const submit = () => {
    if (
      newFName != '' ||
      newMName != '' ||
      newLName != '' ||
      currPass != '' ||
      photo != '' ||
      newContactNo != ''
    ) {
      if (
        validate({
          newFName: {required: true},
          newMName: {required: true},
          newLName: {required: true},
          currPass: {required: true},
          newContactNo: {
            required: true,
            minlength: 11,
            maxlength: 11,
            numbers: true,
          },
          photo: {required: true},
          newPass: {required: true, minlength: 8},
          confPass: {required: true, equalPassword: newPass},
        })
      ) {
        setLoading(true);
        checkPassForm.append('id', context.id);
        checkPassForm.append('pass', currPass);
        axios({
          url: 'https://kabisigapp.com/api/checkpass',
          method: 'POST',
          data: checkPassForm,
          headers: {
            Accept: 'application/form-data',
            'Content-Type': 'multipart/form-data',
          },
        })
          .then(function (response) {
            console.log(checkPassForm);
            if (response.data == 1) {
              let file = {
                uri: imgUri,
                type: 'multipart/form-data',
                name: imgName,
              };
              formdata.append('photo', file);
              formdata.append('id', id);
              formdata.append('fname', newFName);
              formdata.append('mname', newMName);
              formdata.append('lname', newLName);
              formdata.append('homeAdd', newHomeAdd);
              formdata.append('contactNo', newContactNo);
              formdata.append('pass', newPass);
              axios({
                url: 'https://kabisigapp.com/api/updateprofile',
                method: 'POST',
                data: formdata,
                headers: {
                  Accept: 'application/form-data',
                  'Content-Type': 'multipart/form-data',
                },
              })
                .then(function (response) {
                  setLoading(false);
                  Alert.alert('Profile Updated', 'Profile has been updated');
                  context.setID(id);
                  context.setFName(newFName);
                  context.setMName(newMName);
                  context.setLName(newLName);
                  context.setContactNo(newContactNo);
                  context.setHomeAdd(newHomeAdd);
                  context.setPass(newPass);
                  context.setProfilePic(imgName);
                })
                .catch(function (error) {
                  console.log(error);
                });
            } else {
              setLoading('false');
              Alert.alert('Current password is wrong!');
            }
          })
          .catch(function (error) {
            console.log(checkPassForm);
          });
      } else {
        if (isFieldInError('newFName')) {
          getErrorsInField('newFName').map(e => {
            Alert.alert('A field is not properly field', e);
          });
        } else if (isFieldInError('newMName')) {
          getErrorsInField('newMName').map(e => {
            Alert.alert('A field is not properly field', e);
          });
        } else if (isFieldInError('newLName')) {
          getErrorsInField('newLName').map(e => {
            Alert.alert('A field is not properly field', e);
          });
        } else if (isFieldInError('currPass')) {
          getErrorsInField('currPass').map(e => {
            Alert.alert('A field is not properly field', e);
          });
        } else if (isFieldInError('newContactNo')) {
          getErrorsInField('newContactNo').map(e => {
            Alert.alert('A field is not properly field', e);
          });
        } else if (isFieldInError('newPass')) {
          getErrorsInField('newPass').map(e => {
            Alert.alert('A field is not properly field', e);
          });
        } else if (isFieldInError('confPass')) {
          getErrorsInField('confPass').map(e => {
            Alert.alert('A field is not properly field', e);
          });
        } else if (isFieldInError('photo')) {
          getErrorsInField('photo').map(e => {
            Alert.alert(
              'Submission error!',
              'You must include a new profile picture!',
            );
          });
        }
      }
    } else {
      console.log('loop 1');
    }
  };

  const openCamera = () => {
    const options = {
      storageOptions: {
        saveToPhotos: true,
        mediaType: 'photo',
        path: 'images',
      },
    };
    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        setPhoto(response);
        setImgUri(response.assets[0].uri);
        setImgName(response.assets[0].fileName);
      }
    });
  };

  return (
    <SafeAreaView style={styles.background}>
      <Modal transparent={true} visible={loading}>
        <View style={styles.modalBackground}>
          <View style={styles.activityIndicatorWrapper}>
            <ActivityIndicator animating={loading} color="blue" />
          </View>
        </View>
      </Modal>
      <ScrollView>
        <View style={{flexDirection: 'column'}}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#004F91',
              height: 300,
            }}>
            <Image
              source={{
                uri:
                  'https://kabisigapp.com/KabisigGit/storage/app/public/profile_pics/' +
                  id +
                  '/' +
                  context.profilePic,
              }}
              style={{
                width: 200,
                height: 200,
                borderRadius: 200 / 2,
                backgroundColor: '#fff',
              }}
            />
            <TouchableOpacity
              style={{
                marginTop: 10,
                borderWidth: 1,
                borderColor: 'white',
                borderRadius: 50,
                padding: 10,
              }}
              onPress={openCamera}>
              <Text style={{color: 'white'}}>Take a Picture</Text>
            </TouchableOpacity>
          </View>
          <View style={{padding: 10}}>
            <Text style={styles.heading}>Account Information</Text>
            <View style={styles.border}></View>
            <View>
              <Text style={styles.title}>First Name</Text>
              <TextInput
                style={styles.formInput}
                placeholder={context.fname}
                onChangeText={setNewFName}
                placeholderTextColor="#a0a0a0">
                {context.fname}
              </TextInput>
            </View>
            <View>
              <Text style={styles.title}>Middle Name</Text>
              <TextInput
                style={styles.formInput}
                placeholder={context.mname}
                onChangeText={setNewMName}
                placeholderTextColor="#a0a0a0">
                {context.mname}
              </TextInput>
            </View>
            <View>
              <Text style={styles.title}>Last Name</Text>
              <TextInput
                style={styles.formInput}
                placeholder={context.lname}
                onChangeText={setNewLName}
                placeholderTextColor="#a0a0a0">
                {context.lname}
              </TextInput>
            </View>
            <View>
              <Text style={styles.title}>Address</Text>
              <TextInput
                style={styles.formInput}
                placeholder={context.homeAdd}
                onChangeText={setNewHomeAddress}
                placeholderTextColor="#a0a0a0">
                {context.homeAdd}
              </TextInput>
            </View>
            <View>
              <Text style={styles.title}>Contact Number</Text>
              <TextInput
                style={styles.formInput}
                placeholder={context.contactNo}
                onChangeText={setNewContactNo}
                placeholderTextColor="#a0a0a0">
                {context.contactNo}
              </TextInput>
            </View>
            <Text
              style={{
                fontSize: 20,
                color: '#004F91',
                fontWeight: 'bold',
                marginTop: 25,
              }}>
              Change your password
            </Text>
            <View style={styles.border}></View>
            <View>
              <Text style={styles.title}>Current Password</Text>
              <TextInput
                style={styles.formInput}
                onChangeText={setCurrPass}
                secureTextEntry={true}></TextInput>
            </View>
            <View>
              <Text style={styles.title}>New Password</Text>
              <TextInput
                style={styles.formInput}
                secureTextEntry={true}
                onChangeText={setNewPass}></TextInput>
            </View>
            <View>
              <Text style={styles.title}>Confirm New Password</Text>
              <TextInput
                style={styles.formInput}
                secureTextEntry={true}
                onChangeText={setConfPass}></TextInput>
            </View>
          </View>

          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <TouchableOpacity
              onPress={submit}
              style={{
                marginTop: 10,
                borderWidth: 1,
                borderColor: '#004F91',
                //borderRadius: 50,'
                backgroundColor: '#004F91',
                padding: 10,
                marginBottom: 20,
              }}>
              <Text style={{color: 'white'}}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                marginTop: 10,
                borderWidth: 1,
                borderColor: '#004F91',
                //borderRadius: 50,'
                backgroundColor: '#004F91',
                padding: 10,
                marginBottom: 20,
                marginLeft: 10,
              }}>
              <Text style={{color: 'white'}}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#fff',
    //padding: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 20,
    color: '#004F91',
    fontWeight: 'bold',
    marginTop: 10,
  },
  title: {
    color: '#444444',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  border: {
    borderWidth: 0.7,
    borderColor: '#cccccc',
    marginTop: 5,
  },
  formInput: {
    color: '#000',
    borderBottomWidth: 1,
    borderColor: '#004F91',
    backgroundColor: '#fff',
    height: 40,
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

export default EditProfile;
