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
  PermissionsAndroid,
  Permission,
} from 'react-native';
import {
  createNativeStackNavigator,
  Header,
} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import {CommonActions} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {UserContext} from '../../../provider/UserProvider';
import {SafeAreaView} from 'react-native-safe-area-context';
import GetLocation from 'react-native-get-location';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useValidation} from 'react-native-form-validator';

function AddReports() {
  const context = useContext(UserContext);
  const userId = context.id;
  const userFName = context.fname;
  const userMName = context.mname;
  const userLName = context.lname;
  const [reportTitle, setReportTitle] = useState('');
  const [reportDesc, setReportDesc] = useState('');
  const [imgReportUri, setImgReportUri] = useState('no_Image.jpg');
  const [imgReportType, setImgReportType] = useState('');
  const [photo, setPhoto] = useState();
  const [locLatitude, setLocLatitude] = useState('');
  const [locLongitude, setLocLongitude] = useState('');
  const {validate, isFieldInError, getErrorsInField, getErrorMessages} =
    useValidation({
      state: {reportTitle, reportDesc, imgReportUri, locLatitude, locLongitude},
    });
  const formdata = new FormData();

  useEffect(() => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then(location => {
        setLocLatitude(location.latitude);
        setLocLongitude(location.longitude);
      })
      .catch(error => {
        const {code, message} = error;
        console.warn(code, message);
      });
  }, []);

  const potangina = function () {
    fetch('https://kabisigapp.com/api/deployreport/', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formdata,
    })
      .then(res => checkStatus(res))
      .then(res => res.json())
      .then(res => {
        console.log('response' + JSON.stringify(res));
      })
      .catch(e => console.log(e))
      .done();
  };

  const openCamera = () => {
    const options = {
      storageOptions: {
        saveToPhotos: true,
        mediaType: 'photo',
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
        setImgReportUri(response.assets[0].uri);
        setPhoto(response.assets[0]);
        setImgReportType(response.assets[0].type);
        formdata.append('image', {
          uri: response.assets[0].uri,
          name: userFName + locLatitude + locLongitude,
          type: response.assets[0].type,
        });
        formdata.append('Content-Type', 'image/jpg');
        formdata.append('user_id', userId);
        formdata.append(
          'full_name',
          userFName + ' ' + userMName + ' ' + userLName,
        );
        formdata.append('title', reportTitle);
        formdata.append('description', reportDesc);
        formdata.append('status', 'Report Pending');
        formdata.append('loc_lat', locLatitude.toString());
        formdata.append('loc_lng', locLongitude.toString());
        formdata.append('loc_img', userId + userFName + reportTitle);
        console.log(formdata._parts);
      }
    });
  };

  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex: 1.5}}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => {
            navigation.goBack();
          }}>
          <Icon name="arrow-left" color="#fff" size={15} />
          <Text
            style={{
              color: 'white',
              fontSize: 20,
              fontWeight: 'bold',
              marginLeft: 10,
            }}>
            Back
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.contentContainer}>
        <View style={{marginLeft: 10, flex: 1}}>
          <Text style={{fontSize: 24, color: '#004F91', fontWeight: 'bold'}}>
            How does reports work?
          </Text>
          <Text
            style={{
              marginHorizontal: 20,
              color: 'black',
              fontSize: 13,
              flexShrink: 1,
            }}>
            <Text style={{color: '#004F91', fontWeight: 'bold'}}>(1)</Text> Fill
            up the form with title, description, and image
          </Text>
          <Text
            style={{
              marginHorizontal: 20,
              color: 'black',
              fontSize: 13,
              flexShrink: 1,
            }}>
            <Text style={{color: '#004F91', fontWeight: 'bold'}}>(2)</Text> Make
            sure that your location is accessed by the application
          </Text>
          <Text
            style={{
              marginHorizontal: 20,
              color: 'black',
              fontSize: 13,
              flexShrink: 1,
            }}>
            <Text style={{color: '#004F91', fontWeight: 'bold'}}>(3)</Text>{' '}
            After submitting the form, the reports would be reviewed by the
            barangay officials
          </Text>
          <Text
            style={{
              marginHorizontal: 20,
              color: 'red',
              fontWeight: 'bold',
              fontSize: 13,
              flexShrink: 1,
            }}>
            Warning: Submitting a fake report would block you from sending
            reports for several days!
          </Text>
        </View>
        <View style={{flex: 1.8}}>
          <View
            style={{
              marginTop: 15,
              justifyContent: 'space-between',
              flexDirection: 'row',
              height: '12%',
              marginHorizontal: 20,
            }}>
            <Text
              style={{
                marginTop: 4,
                fontSize: 15,
                fontWeight: 'bold',
                color: 'black',
              }}>
              Title:{' '}
            </Text>
            <TextInput
              style={styles.inputTitle}
              onChangeText={setReportTitle}
            />
          </View>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              height: '24%',
              marginHorizontal: 20,
            }}>
            <Text style={{fontSize: 15, fontWeight: 'bold', color: 'black'}}>
              Description:{' '}
            </Text>
            <TextInput
              multiline={true}
              textAlignVertical="top"
              onChangeText={setReportDesc}
              style={styles.inputBody}></TextInput>
          </View>
          <View style={styles.sendImage}>
            <View
              style={{
                flex: 1,
                borderWidth: 2,
                borderColor: '#004F91',
                height: '50%',
                width: '100%',
                justifyContent: 'center',
                marginHorizontal: 10,
              }}>
              <TouchableOpacity
                style={{alignItems: 'center', justifyContent: 'center'}}
                onPress={openCamera}>
                <Icon name="camera" color="#004F91" size={40} />
                <Text
                  style={{fontSize: 15, fontWeight: 'bold', color: 'black'}}>
                  Take a photo
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flex: 1,
                borderWidth: 2,
                borderColor: '#004F91',
                height: '50%',
                width: '100%',
                justifyContent: 'center',
                marginHorizontal: 10,
              }}>
              <Image
                source={{uri: imgReportUri}}
                style={{flex: 1, height: 100, width: 100, alignSelf: 'center'}}
              />
            </View>
          </View>
          <TouchableOpacity style={styles.submitBtn} onPress={potangina}>
            <Text style={{fontSize: 15, fontWeight: 'bold', color: 'white'}}>
              Submit
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backBtn: {
    margin: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '25%',
    height: '100%',
    backgroundColor: '#004F91',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 13,
    paddingTop: 10,
  },
  inputTitle: {
    borderWidth: 1,
    borderColor: '#000',
    width: '75%',
    height: '100%',
    paddingLeft: 5,
    paddingTop: 10,
  },
  inputBody: {
    borderWidth: 1,
    borderColor: '#000',
    width: '75%',
    height: '100%',
    paddingLeft: 5,
    paddingTop: 0,
  },
  sendImage: {
    flex: 3,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: '100%',
    marginHorizontal: 20,
  },
  submitBtn: {
    borderColor: '#004F91',
    borderWidth: 1,
    backgroundColor: '#004F91',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginTop: -80,
    marginBottom: 20,
    width: '35%',
    alignSelf: 'center',
  },
});

export default AddReports;
