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
import {format, formatDistance, formatRelative, subDays} from 'date-fns';
import {Dimensions} from 'react-native';

function AddReports() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
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
      <View style={styles.contentContainer}>
        <Text>content</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  backBtn: {
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
  },
});

export default AddReports;
