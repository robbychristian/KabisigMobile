import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {TextInput} from 'react-native-gesture-handler';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import {useRoute} from '@react-navigation/native';
import {useValidation} from 'react-native-form-validator';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';

const SecondRegisterScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const fname = route.params.fname;
  const mname = route.params.mname;
  const lname = route.params.lname;
  const email = route.params.email;
  const pass = route.params.pass;
  const cpass = route.params.cpass;
  const [loading, setLoading] = useState(false);
  const [photo, setPhoto] = useState();
  const [imgType, setImgType] = useState();
  const [imgUri, setImgUri] = useState();
  const [imgName, setImgName] = useState();

  const [home_add, sethome_add] = useState(null);
  const [brgy, setSelectedBrgy] = useState(null);
  const [mbday, setmbday] = useState(null);
  const [dbday, setdbday] = useState(null);
  const [ybday, setybday] = useState(null);
  const [cnum, setcnum] = useState(null);
  const formdata = new FormData();
  const {validate, isFieldInError, getErrorsInField, getErrorMessages} =
    useValidation({
      state: {brgy, mbday, dbday, ybday, cnum},
    });

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
        setImgType(response.assets[0].type);
        setImgUri(response.assets[0].uri);
        setImgName(response.assets[0].fileName);
      }
    });
  };
  const submitForm = function () {
    if (
      home_add == null ||
      brgy == null ||
      mbday == null ||
      dbday == null ||
      ybday == null ||
      cnum == null
    ) {
      Alert.alert('Field(s) are empty', 'Fill up all the forms');
    } else if (
      (mbday == '2' && (dbday == 29 || dbday == 30 || dbday == 31)) ||
      ((mbday == 4 || mbday == 6 || mbday == 8 || mbday == 10 || mbday == 12) &&
        dbday == 31)
    ) {
      Alert.alert('Invalid Date', 'The day you chose is invalid.');
    } else if (
      validate({
        brgy: {required: true},
        mbday: {required: true},
        dbday: {required: true},
        ybday: {required: true},
        cnum: {required: true, minlength: 11, maxlength: 11},
      })
    ) {
      setLoading(true);
      let file = {
        uri: imgUri,
        type: 'multipart/form-data',
        name: imgName,
      };
      formdata.append('file', file);
      formdata.append('fname', fname);
      formdata.append('mname', mname);
      formdata.append('lname', lname);
      formdata.append('home_add', home_add);
      formdata.append('brgy', brgy);
      formdata.append('mbday', mbday);
      formdata.append('dbday', dbday);
      formdata.append('ybday', ybday);
      formdata.append('email', email);
      formdata.append('cnum', cnum);
      formdata.append('pass', pass);
      formdata.append('cpass', cpass);
      formdata.append('cbox', true);
      axios({
        url: 'https://kabisigapp.com/api/register',
        method: 'POST',
        data: formdata,
        headers: {
          Accept: 'application/form-data',
          'Content-Type': 'multipart/form-data',
        },
      })
        .then(function (response) {
          Alert.alert('Success!', 'Account has been registered!');
          setLoading(false);
          navigation.navigate('Login');
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      isFieldInError('cnum') &&
        getErrorsInField('cnum').map(e => {
          Alert.alert('A field is not properly field', e);
        });
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Modal transparent={true} visible={loading}>
        <View style={styles.modalBackground}>
          <View style={styles.activityIndicatorWrapper}>
            <ActivityIndicator animating={loading} color="blue" />
          </View>
        </View>
      </Modal>
      <View style={styles.textContainer}>
        <Text style={styles.textStyle}>Profile Information</Text>
      </View>
      <View style={styles.formContainer}>
        <TextInput
          onChangeText={sethome_add}
          style={styles.formInput}
          returnKeyType="next"
          placeholder="Home Address"
          placeholderTextColor="gray"
        />
        <TouchableOpacity style={styles.pickerContainer}>
          <Picker
            style={{marginLeft: -13, fontSize: 20, color: 'black'}}
            selectedValue={brgy}
            itemStyle={{fontSize: 20}}
            onValueChange={setSelectedBrgy}>
            <Picker.Item label="Choose a barangay" value="" />
            <Picker.Item label="Barangay Santolan" value="Barangay Santolan" />
            <Picker.Item label="Barangay Dela Paz" value="Barangay Dela Paz" />
            <Picker.Item
              label="Barangay Manggahan"
              value="Barangay Manggahan"
            />
            <Picker.Item label="Barangay Maybunga" value="Barangay Maybunga" />
            <Picker.Item label="Barangay Rosario" value="Barangay Rosario" />
          </Picker>
        </TouchableOpacity>
        <TouchableOpacity style={styles.pickerContainer}>
          <Picker
            style={{marginLeft: -13, fontSize: 20, color: 'black'}}
            selectedValue={mbday}
            itemStyle={{fontSize: 20}}
            onValueChange={setmbday}>
            <Picker.Item label="Birth Month" value="" />
            <Picker.Item label="January" value="1" />
            <Picker.Item label="February" value="2" />
            <Picker.Item label="March" value="3" />
            <Picker.Item label="April" value="4" />
            <Picker.Item label="May" value="5" />
            <Picker.Item label="June" value="6" />
            <Picker.Item label="July" value="7" />
            <Picker.Item label="August" value="8" />
            <Picker.Item label="September" value="9" />
            <Picker.Item label="October" value="10" />
            <Picker.Item label="November" value="11" />
            <Picker.Item label="December" value="12" />
          </Picker>
        </TouchableOpacity>
        <TouchableOpacity style={styles.pickerContainer}>
          <Picker
            style={{marginLeft: -13, fontSize: 20, color: '#000'}}
            selectedValue={dbday}
            itemStyle={{fontSize: 20}}
            onValueChange={setdbday}>
            <Picker.Item label="Birth Day" value="" />
            <Picker.Item label="1" value="1" />
            <Picker.Item label="2" value="2" />
            <Picker.Item label="3" value="3" />
            <Picker.Item label="4" value="4" />
            <Picker.Item label="5" value="5" />
            <Picker.Item label="6" value="6" />
            <Picker.Item label="7" value="7" />
            <Picker.Item label="8" value="8" />
            <Picker.Item label="9" value="9" />
            <Picker.Item label="10" value="10" />
            <Picker.Item label="11" value="11" />
            <Picker.Item label="12" value="12" />
            <Picker.Item label="13" value="13" />
            <Picker.Item label="14" value="14" />
            <Picker.Item label="15" value="15" />
            <Picker.Item label="16" value="16" />
            <Picker.Item label="17" value="17" />
            <Picker.Item label="18" value="18" />
            <Picker.Item label="19" value="19" />
            <Picker.Item label="20" value="20" />
            <Picker.Item label="21" value="21" />
            <Picker.Item label="22" value="22" />
            <Picker.Item label="23" value="23" />
            <Picker.Item label="24" value="24" />
            <Picker.Item label="25" value="25" />
            <Picker.Item label="26" value="26" />
            <Picker.Item label="27" value="27" />
            <Picker.Item label="28" value="28" />
            <Picker.Item label="29" value="29" />
            <Picker.Item label="30" value="30" />
            <Picker.Item label="31" value="31" />
          </Picker>
        </TouchableOpacity>
        <TouchableOpacity style={styles.pickerContainer}>
          <Picker
            style={{marginLeft: -13, fontSize: 20, color: 'black'}}
            selectedValue={ybday}
            itemStyle={{fontSize: 20}}
            onValueChange={setybday}>
            <Picker.Item label="Birth Year" value="" />
            <Picker.Item label="1920" value="1920" />
            <Picker.Item label="1921" value="1921" />
            <Picker.Item label="1922" value="1922" />
            <Picker.Item label="1923" value="1923" />
            <Picker.Item label="1924" value="1924" />
            <Picker.Item label="1925" value="1925" />
            <Picker.Item label="1926" value="1926" />
            <Picker.Item label="1927" value="1927" />
            <Picker.Item label="1928" value="1928" />
            <Picker.Item label="1929" value="1929" />
            <Picker.Item label="1930" value="1930" />
            <Picker.Item label="1931" value="1931" />
            <Picker.Item label="1932" value="1932" />
            <Picker.Item label="1933" value="1933" />
            <Picker.Item label="1934" value="1934" />
            <Picker.Item label="1935" value="1935" />
            <Picker.Item label="1936" value="1936" />
            <Picker.Item label="1937" value="1937" />
            <Picker.Item label="1938" value="1938" />
            <Picker.Item label="1939" value="1939" />
            <Picker.Item label="1940" value="1940" />
            <Picker.Item label="1941" value="1941" />
            <Picker.Item label="1942" value="1942" />
            <Picker.Item label="1943" value="1943" />
            <Picker.Item label="1944" value="1944" />
            <Picker.Item label="1945" value="1945" />
            <Picker.Item label="1946" value="1946" />
            <Picker.Item label="1947" value="1947" />
            <Picker.Item label="1948" value="1948" />
            <Picker.Item label="1949" value="1949" />
            <Picker.Item label="1950" value="1950" />
            <Picker.Item label="1951" value="1951" />
            <Picker.Item label="1952" value="1952" />
            <Picker.Item label="1953" value="1953" />
            <Picker.Item label="1954" value="1954" />
            <Picker.Item label="1955" value="1955" />
            <Picker.Item label="1956" value="1956" />
            <Picker.Item label="1957" value="1957" />
            <Picker.Item label="1958" value="1958" />
            <Picker.Item label="1959" value="1959" />
            <Picker.Item label="1960" value="1960" />
            <Picker.Item label="1961" value="1961" />
            <Picker.Item label="1962" value="1962" />
            <Picker.Item label="1963" value="1963" />
            <Picker.Item label="1964" value="1964" />
            <Picker.Item label="1965" value="1965" />
            <Picker.Item label="1966" value="1966" />
            <Picker.Item label="1968" value="1968" />
            <Picker.Item label="1969" value="1969" />
            <Picker.Item label="1970" value="1970" />
            <Picker.Item label="1971" value="1971" />
            <Picker.Item label="1972" value="1972" />
            <Picker.Item label="1973" value="1973" />
            <Picker.Item label="1974" value="1974" />
            <Picker.Item label="1975" value="1975" />
            <Picker.Item label="1976" value="1976" />
            <Picker.Item label="1977" value="1977" />
            <Picker.Item label="1978" value="1978" />
            <Picker.Item label="1979" value="1979" />
            <Picker.Item label="1980" value="1980" />
            <Picker.Item label="1981" value="1981" />
            <Picker.Item label="1982" value="1982" />
            <Picker.Item label="1983" value="1983" />
            <Picker.Item label="1984" value="1984" />
            <Picker.Item label="1985" value="1985" />
            <Picker.Item label="1986" value="1986" />
            <Picker.Item label="1987" value="1987" />
            <Picker.Item label="1988" value="1988" />
            <Picker.Item label="1989" value="1989" />
            <Picker.Item label="1990" value="1990" />
            <Picker.Item label="1991" value="1991" />
            <Picker.Item label="1992" value="1992" />
            <Picker.Item label="1993" value="1993" />
            <Picker.Item label="1994" value="1994" />
            <Picker.Item label="1995" value="1995" />
            <Picker.Item label="1996" value="1996" />
            <Picker.Item label="1997" value="1997" />
            <Picker.Item label="1998" value="1998" />
            <Picker.Item label="1999" value="1999" />
            <Picker.Item label="2000" value="2000" />
            <Picker.Item label="2001" value="2001" />
            <Picker.Item label="2002" value="2002" />
            <Picker.Item label="2003" value="2003" />
            <Picker.Item label="2004" value="2004" />
            <Picker.Item label="2005" value="2005" />
            <Picker.Item label="2006" value="2006" />
            <Picker.Item label="2007" value="2007" />
            <Picker.Item label="2008" value="2008" />
            <Picker.Item label="2009" value="2009" />
            <Picker.Item label="2010" value="2010" />
            <Picker.Item label="2011" value="2011" />
            <Picker.Item label="2012" value="2012" />
            <Picker.Item label="2013" value="2013" />
            <Picker.Item label="2014" value="2014" />
            <Picker.Item label="2015" value="2015" />
            <Picker.Item label="2016" value="2016" />
            <Picker.Item label="2017" value="2017" />
            <Picker.Item label="2018" value="2018" />
            <Picker.Item label="2019" value="2019" />
            <Picker.Item label="2020" value="2020" />
            <Picker.Item label="2021" value="2021" />
          </Picker>
        </TouchableOpacity>
        <TextInput
          style={styles.formInput}
          returnKeyType="next"
          placeholder="Contact Number"
          placeholderTextColor="gray"
          keyboardType="number-pad"
          onChangeText={setcnum}
        />
        <View
          style={{
            flex: 1,
            borderWidth: 2,
            borderColor: '#004F91',
            height: '30%',
            width: '80%',
            justifyContent: 'center',
            marginHorizontal: 10,
            marginVertical: 20,
            backgroundColor: '#004F91',
          }}>
          <TouchableOpacity
            style={{alignItems: 'center', justifyContent: 'center'}}
            onPress={openCamera}>
            <Icon name="camera" color="#fff" size={40} />
            <Text style={{fontSize: 15, fontWeight: 'bold', color: 'white'}}>
              Take a photo
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.nextBtn} onPress={submitForm}>
          <Text style={{color: '#FFF'}}>Submit</Text>
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
    paddingTop: 2,
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
  pickerContainer: {
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    marginTop: 15,
    width: '80%',
    paddingLeft: -30,
  },
  nextBtn: {
    backgroundColor: '#007ADE',
    color: '#004F91',
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    height: '10%',
    bottom: 10,
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

export default SecondRegisterScreen;
