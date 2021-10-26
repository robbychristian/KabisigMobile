import React from 'react';
import {
  ImageBackground,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';

function TropicalCyclone() {
  return (
    <SafeAreaView style={styles.background}>
      <ScrollView>
        <Text style={styles.timeDisater}>Before</Text>
        <Text style={styles.subHeading}>KNOW THE HAZARDS IN YOUR AREA</Text>
        <View style={styles.detailContainer}>
          <View style={{position: 'relative'}}>
            <Icon name="circle" color="#004F91" size={47}></Icon>
            <Icon name="bullhorn" style={styles.icon} size={24} />
          </View>
          <Text style={styles.guideContent}>
            Monitor the news for weather updates, warnings, and advisories.
          </Text>
        </View>
        <View style={styles.detailContainer}>
          <View style={{position: 'relative'}}>
            <Icon name="circle" color="#004F91" size={47}></Icon>
            <Icon
              name="clipboard-list"
              style={{position: 'absolute', zIndex: 99, left: 14, top: 13}}
              size={24}
              color="#004F91"
            />
          </View>
          <Text style={styles.guideContent}>
            Know the early warning and evacuation plan of the community.
          </Text>
        </View>
        <View style={styles.detailContainer}>
          <View style={{position: 'relative'}}>
            <Icon name="circle" color="#004F91" size={47}></Icon>
            <Icon name="hammer" style={styles.icon} size={24} />
          </View>
          <Text style={styles.guideContent}>
            Check the integrity of your house and repair weak parts.
          </Text>
        </View>
        <View style={styles.detailContainer}>
          <View style={{position: 'relative'}}>
            <Icon name="circle" color="#004F91" size={47}></Icon>
            <Icon
              name="suitcase"
              style={{position: 'absolute', zIndex: 99, left: 12, top: 13}}
              size={24}
              color="#004F91"
            />
          </View>
          <Text style={styles.guideContent}>
            Prepare your family's GO BAG containing items needed for survival.
          </Text>
        </View>
        <View style={styles.detailContainer}>
          <View style={{position: 'relative'}}>
            <Icon name="circle" color="#004F91" size={47}></Icon>
            <Icon name="dog" style={styles.icon} size={24} />
          </View>
          <Text style={styles.guideContent}>
            Put livestock and pets in a safe area or designed evacuation sites
            for animals.
          </Text>
        </View>
        <View style={styles.detailContainer}>
          <View style={{position: 'relative'}}>
            <Icon name="circle" color="#004F91" size={47}></Icon>
            <Icon
              name="map-pin"
              style={{position: 'absolute', zIndex: 99, left: 16, top: 13}}
              size={24}
              color="#004F91"
            />
          </View>
          <Text style={styles.guideContent}>
            When notified, immediately go to the designated evacuation center.
          </Text>
        </View>

        <Text style={styles.timeDisater}>During</Text>
        <Text style={styles.subHeading}>STAY ALERT AND STAY TUNED</Text>
        <View style={styles.detailContainer}>
          <View style={{position: 'relative'}}>
            <Icon name="circle" color="#004F91" size={47}></Icon>
            <Icon name="door-closed" style={styles.icon} size={24} />
          </View>
          <Text style={styles.guideContent}>
            Stay calm. Stay indoors and tune in for latest news and weather
            updates.
          </Text>
        </View>
        <View style={styles.detailContainer}>
          <View style={{position: 'relative'}}>
            <Icon name="circle" color="#004F91" size={47}></Icon>
            <Icon
              name="charging-station"
              style={{position: 'absolute', zIndex: 99, left: 13, top: 13}}
              size={24}
              color="#004F91"
            />
          </View>
          <Text style={styles.guideContent}>
            Turn off main electrical switch and water valve.
          </Text>
        </View>
        <View style={styles.detailContainer}>
          <View style={{position: 'relative'}}>
            <Icon name="circle" color="#004F91" size={47}></Icon>
            <Icon
              name="lightbulb"
              style={{position: 'absolute', zIndex: 99, left: 16, top: 13}}
              size={24}
              color="#004F91"
            />
          </View>
          <Text style={styles.guideContent}>
            Use flashlight or emergency lamp. Be cautious in using candles and
            gas lamps.
          </Text>
        </View>
        <View style={styles.detailContainer}>
          <View style={{position: 'relative'}}>
            <Icon name="circle" color="#004F91" size={47}></Icon>
            <Icon
              name="border-all"
              style={{position: 'absolute', zIndex: 99, left: 13, top: 13}}
              size={24}
              color="#004F91"
            />
          </View>
          <Text style={styles.guideContent}>Stay away from glass windows.</Text>
        </View>

        <Text style={styles.timeDisater}>After</Text>
        <Text style={styles.subHeading}>REMAIN ALERT AND BE CAUTIOUS.</Text>
        <View style={styles.detailContainer}>
          <View style={{position: 'relative'}}>
            <Icon name="circle" color="#004F91" size={47}></Icon>
            <Icon name="user-check" style={styles.icon} size={24} />
          </View>
          <Text style={styles.guideContent}>
            Wait for authorities to declare that it is safe to return home.
          </Text>
        </View>
        <View style={styles.detailContainer}>
          <View style={{position: 'relative'}}>
            <Icon name="circle" color="#004F91" size={47}></Icon>
            <Icon
              name="tree"
              style={{position: 'absolute', zIndex: 99, left: 14, top: 13}}
              size={24}
              color="#004F91"
            />
          </View>
          <Text style={styles.guideContent}>
            Stay away from fallen trees, damaged structures and power lines.
          </Text>
        </View>
        <View style={styles.detailContainer}>
          <View style={{position: 'relative'}}>
            <Icon name="circle" color="#004F91" size={47}></Icon>
            <Icon
              name="hiking"
              style={{position: 'absolute', zIndex: 99, left: 15, top: 13}}
              size={24}
              color="#004F91"
            />
          </View>
          <Text style={styles.guideContent}>
            Do not go sightseeing as you may hinder the work of emergency
            services.
          </Text>
        </View>
        <View style={styles.detailContainer}>
          <View style={{position: 'relative'}}>
            <Icon name="circle" color="#004F91" size={47}></Icon>
            <Icon name="house-damage" style={styles.icon} size={24} />
          </View>
          <Text style={styles.guideContent}>
            Be cautious in checking and repairing the damaged parts of your
            house..
          </Text>
        </View>
        <View style={styles.detailContainer}>
          <View style={{position: 'relative'}}>
            <Icon name="circle" color="#004F91" size={47}></Icon>
            <Icon
              name="charging-station"
              style={{position: 'absolute', zIndex: 99, left: 13, top: 13}}
              size={24}
              color="#004F91"
            />
          </View>
          <Text style={styles.guideContent}>
            Check for wet or submerged electrical outlets and appliances before
            turning on electricity.
          </Text>
        </View>

        <View style={styles.detailContainer}>
          <View style={{position: 'relative'}}>
            <Icon name="circle" color="#004F91" size={47}></Icon>
            <Icon
              name="database"
              style={{position: 'absolute', zIndex: 99, left: 14, top: 13}}
              size={24}
              color="#004F91"
            />
          </View>
          <Text style={styles.guideContent}>
            Throw away rainwater in cans, pots and tires to prevent breeding of
            mosquitoes.
          </Text>
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.copyright}>
            {' '}
            {'\u00A9'} Republic of the Philippines - Office of Civil Defense
          </Text>
        </View>
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
    color: 'black',
    textAlign: 'center',
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
  },
  copyright: {
    color: 'black',
    fontWeight: 'bold',
  },
});

export default TropicalCyclone;
