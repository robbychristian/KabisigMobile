import React, {useState, useEffect} from 'react';
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
import {SafeAreaView} from 'react-native-safe-area-context';
import {format, formatDistance, formatRelative, subDays} from 'date-fns';
import {Dimensions} from 'react-native';

import {useRoute} from '@react-navigation/native';

var width = Dimensions.get('window').width; //full width
function Announcements() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch('https://kabisigapp.com/api/announcements')
      .then(response => response.json())
      .then(json => {
        setData(json);
      })
      .catch(error => {
        Alert.alert('Error', 'There is an error fetching announcements.');
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <View>
          <FlatList
            data={data}
            keyExtractor={({id}, index) => id}
            renderItem={({item}) => (
              <View style={styles.content}>
                <Icon
                  name="bullhorn"
                  color="#004F91"
                  size={25}
                  style={{paddingLeft: 15}}></Icon>
                <View style={styles.announceContainer}>
                  <Text style={styles.announceTextTitle}>{item.title}</Text>
                  <Text style={styles.announcedate}>
                    Posted at:{' '}
                    {format(
                      new Date(item.created_at),
                      'EEEE, MMMM d, y, h:mm:ss a',
                    )}
                  </Text>
                </View>
              </View>
            )}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //padding: 30,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#ececec',
    borderBottomWidth: 2,
  },
  announceContainer: {
    backgroundColor: '#fff',
  },
  announceTextTitle: {
    color: '#333333',
    fontSize: 25,
    fontWeight: 'bold',
    paddingRight: 15,
    paddingTop: 15,
    paddingLeft: 15,
    paddingBottom: 5,
    textTransform: 'capitalize',
    flexShrink: 1,
  },
  announcedate: {
    color: 'gray',
    fontSize: 13,
    paddingLeft: 15,
    paddingBottom: 5,
    fontWeight: 'bold',
    flexShrink: 1,
  },
});

export default Announcements;
