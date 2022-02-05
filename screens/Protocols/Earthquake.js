import React, {useEffect, useState} from 'react';
import {
  ImageBackground,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Text,
  FlatList,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';

function Earthquake() {
  const [before, setBefore] = useState([]);
  const [during, setDuring] = useState([]);
  const [after, setAfter] = useState([]);
  useEffect(() => {
    axios({
      url: 'https://kabisigapp.com/api/earthquake',
      method: 'GET',
    }).then(function (response) {
      response.data.map(item => {
        if (item.time == 'Before') {
          setBefore(prevItem => [...prevItem, item]);
        }
      });
      response.data.map(item => {
        if (item.time == 'During') {
          setDuring(prevItem => [...prevItem, item]);
        }
      });
      response.data.map(item => {
        if (item.time == 'After') {
          setAfter(prevItem => [...prevItem, item]);
        }
      });
    });
  }, []);
  return (
    <SafeAreaView style={styles.background}>
      <ScrollView>
        <Text style={styles.timeDisater}>BEFORE</Text>
        <FlatList
          data={before}
          style={{marginBottom: 15}}
          keyExtractor={({id}, index) => id}
          renderItem={({item}) => (
            <View style={[styles.card, styles.elevation]}>
              <Text style={styles.guideContent}>{item.guideline}</Text>
            </View>
          )}
        />
        <Text style={styles.timeDisater}>DURING</Text>
        <FlatList
          data={during}
          style={{marginBottom: 15}}
          keyExtractor={({id}, index) => id}
          renderItem={({item}) => (
            <View style={[styles.card, styles.elevation]}>
              <Text style={styles.guideContent}>{item.guideline}</Text>
            </View>
          )}
        />
        <Text style={styles.timeDisater}>AFTER</Text>
        <FlatList
          data={after}
          style={{marginBottom: 15}}
          keyExtractor={({id}, index) => id}
          renderItem={({item}) => (
            <View style={[styles.card, styles.elevation]}>
              <Text style={styles.guideContent}>{item.guideline}</Text>
            </View>
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  timeDisater: {
    fontSize: 25,
    marginTop: 10,
    textTransform: 'uppercase',
    color: '#004F91',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  subHeading: {
    fontSize: 18,
    marginTop: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: '#004F91',
    textAlign: 'center',
    flexShrink: 1,
  },
  detailContainer: {
    flexDirection: 'row',
    marginTop: 5,
    padding: 5,
  },
  icon: {
    color: '#004F91',
    position: 'absolute',
    zIndex: 99,
    left: 9,
    top: 10,
  },
  guideContent: {
    //marginTop: 5,
    padding: 5,
    fontSize: 15,
    color: 'black',
    flexShrink: 1,
    textTransform: 'capitalize',
    marginLeft: 5,
  },
  copyright: {
    color: 'black',
    fontWeight: 'bold',
  },
  card: {
    borderLeftWidth: 3,
    borderLeftColor: '#004F91',
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 10,
    width: '100%',
    marginVertical: 10,
  },
  elevation: {
    elevation: 2,
    shadowColor: '#52006A',
  },
});

export default Earthquake;
