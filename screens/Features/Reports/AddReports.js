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
  ActivityIndicator,
  Modal,
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
import axios from 'axios';
//import FormData from 'form-data';

function AddReports() {
  const context = useContext(UserContext);
  const user_id = context.id;
  const full_name = context.fname + ' ' + context.mname + ' ' + context.lname;
  const status = 'Not Confirmed';
  const brgyLoc = context.brgy;
  const [title, setReportTitle] = useState('');
  const [description, setReportDesc] = useState('');
  const [loc_imgUri, setImgReportUri] = useState('no_Image.jpg');
  const [loc_imgName, setImgReportName] = useState('no_Image.jpg');
  const [imgReportType, setImgReportType] = useState('');
  const [photo, setPhoto] = useState();
  const [loc_lat, setLocLatitude] = useState('');
  const [loc_lng, setLocLongitude] = useState('');

  const [loading, setLoading] = useState(false);
  const {validate, isFieldInError, getErrorsInField, getErrorMessages} =
    useValidation({
      state: {title, description, loc_lat, loc_lng},
    });

  const formdata = new FormData();
  const submit = () => {
    if (title != '' || description != '' || loc_lat != '' || loc_lng != '') {
      //formdata.append('image', {
      //  uri: loc_img,
      //  name: full_name + loc_lat + loc_lng,
      //  type: imgReportType,
      //});
      setLoading(true);
      let file = {
        uri: loc_imgUri,
        type: 'multipart/form-data',
        name: loc_imgName,
      };
      formdata.append('photo', file);
      formdata.append('user_id', user_id);
      formdata.append('full_name', full_name);
      formdata.append('title', title);
      formdata.append('description', description);
      formdata.append('brgy_loc', brgyLoc);
      formdata.append('status', status);
      formdata.append('loc_lat', loc_lat);
      formdata.append('loc_lng', loc_lng);
      formdata.append('loc_img', loc_imgName);
      axios({
        url: 'https://kabisigapp.com/api/uploadimage',
        method: 'POST',
        data: formdata,
        headers: {
          Accept: 'application/form-data',
          'Content-Type': 'multipart/form-data',
        },
      })
        .then(function (response) {
          setLoading(false);
          Alert.alert(
            'Report Sent',
            'Your report is pending and will be reviewed.',
          );
          navigation.navigate('ShowReports');
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

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
        console.log(photo);
        setImgReportType(response.assets[0].type);
        setImgReportUri(response.assets[0].uri);
        setImgReportName(response.assets[0].fileName);
      }
    });
  };

  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <Modal transparent={true} visible={loading}>
        <View style={styles.modalBackground}>
          <View style={styles.activityIndicatorWrapper}>
            <ActivityIndicator animating={loading} color="blue" />
          </View>
        </View>
      </Modal>
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
        <View style={{flex: 2}}>
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
              Desc:{' '}
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
                source={{uri: loc_imgUri}}
                style={{flex: 1, height: 100, width: 100, alignSelf: 'center'}}
              />
            </View>
          </View>
          <TouchableOpacity style={styles.submitBtnGray} onPress={submit}>
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
    color: '#000',
  },
  inputBody: {
    color: '#000',
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
  submitBtnGray: {
    borderColor: '#202020',
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
