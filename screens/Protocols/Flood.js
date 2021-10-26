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

function Flood() {
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
            <Icon name="map-marked" style={styles.icon} size={24} />
          </View>
          <Text style={styles.guideContent}>
            Know the flood early warning and evacuation plan of the community.
          </Text>
        </View>
        <View style={styles.detailContainer}>
          <View style={{position: 'relative'}}>
            <Icon name="circle" color="#004F91" size={47}></Icon>
            <Icon name="hands-helping" style={styles.icon} size={24} />
          </View>
          <Text style={styles.guideContent}>
            Participate in community flood preparedness actions and drills.
          </Text>
        </View>
        <View style={styles.detailContainer}>
          <View style={{position: 'relative'}}>
            <Icon name="circle" color="#004F91" size={47}></Icon>
            <Icon name="couch" style={styles.icon} size={24} />
          </View>
          <Text style={styles.guideContent}>
            Secure your home. Move essential furniture and items to the upper
            floor.
          </Text>
        </View>
        <View style={styles.detailContainer}>
          <View style={{position: 'relative'}}>
            <Icon name="circle" color="#004F91" size={47}></Icon>
            <Icon
              name="bolt"
              style={{position: 'absolute', zIndex: 99, left: 16, top: 13}}
              size={24}
              color="#004F91"
            />
          </View>
          <Text style={styles.guideContent}>
            Before evacuating, turn off all main switches of electricity, water
            and LPG tanks.
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
              name="running"
              style={{position: 'absolute', zIndex: 99, left: 14, top: 13}}
              size={24}
              color="#004F91"
            />
          </View>
          <Text style={styles.guideContent}>
            When order is received, immediately evacuate to higher and safer
            grounds.
          </Text>
        </View>

        <Text style={styles.timeDisater}>During</Text>
        <Text style={styles.subHeading}>STAY ON HIGHER GROUNDS</Text>
        <View style={styles.detailContainer}>
          <View style={{position: 'relative'}}>
            <Icon name="circle" color="#004F91" size={47}></Icon>
            <Icon name="door-closed" style={styles.icon} size={24} />
          </View>
          <Text style={styles.guideContent}>
            Stay indoors and stay tuned for latest news and weather updates.
          </Text>
        </View>
        <View style={styles.detailContainer}>
          <View style={{position: 'relative'}}>
            <Icon name="circle" color="#004F91" size={47}></Icon>
            <Icon
              name="plug"
              style={{position: 'absolute', zIndex: 99, left: 14, top: 13}}
              size={24}
              color="#004F91"
            />
          </View>
          <Text style={styles.guideContent}>
            DO NOT touch electrical equipment if you are wet or standing in
            floodwater.
          </Text>
        </View>
        <View style={styles.detailContainer}>
          <View style={{position: 'relative'}}>
            <Icon name="circle" color="#004F91" size={47}></Icon>
            <Icon name="swimmer" style={styles.icon} size={24} />
          </View>
          <Text style={styles.guideContent}>
            DO NOT go swimming or boating in swollen rivers.
          </Text>
        </View>
        <View style={styles.detailContainer}>
          <View style={{position: 'relative'}}>
            <Icon name="circle" color="#004F91" size={47}></Icon>
            <Icon name="water" style={styles.icon} size={24} />
          </View>
          <Text style={styles.guideContent}>
            DO NOT cross streams when water level is already above the knee.
          </Text>
        </View>
        <View style={styles.detailContainer}>
          <View style={{position: 'relative'}}>
            <Icon name="circle" color="#004F91" size={47}></Icon>
            <Icon
              name="car"
              style={{position: 'absolute', zIndex: 99, left: 12, top: 13}}
              size={24}
              color="#004F91"
            />
          </View>
          <Text style={styles.guideContent}>
            DO NOT walk or drive through flooded areas.
          </Text>
        </View>

        <Text style={styles.timeDisater}>After</Text>
        <Text style={styles.subHeading}>STAY ALERT AND KEEP SAFE</Text>
        <View style={styles.detailContainer}>
          <View style={{position: 'relative'}}>
            <Icon name="circle" color="#004F91" size={47}></Icon>
            <Icon name="door-open" style={styles.icon} size={24} />
          </View>
          <Text style={styles.guideContent}>
            Leave the evacuation area only when authorities say it is safe to
            return home.
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
            Report fallen trees and electric posts to proper authorities.
          </Text>
        </View>
        <View style={styles.detailContainer}>
          <View style={{position: 'relative'}}>
            <Icon name="circle" color="#004F91" size={47}></Icon>
            <Icon
              name="bolt"
              style={{position: 'absolute', zIndex: 99, left: 16, top: 13}}
              size={24}
              color="#004F91"
            />
          </View>
          <Text style={styles.guideContent}>
            Check for wet or submerged electrical outlets and applicances before
            turning on electricity.
          </Text>
        </View>
        <View style={styles.detailContainer}>
          <View style={{position: 'relative'}}>
            <Icon name="circle" color="#004F91" size={47}></Icon>
            <Icon name="house-damage" style={styles.icon} size={24} />
          </View>
          <Text style={styles.guideContent}>
            Check your house for possible damages and repair as necessary.
          </Text>
        </View>
        <View style={styles.detailContainer}>
          <View style={{position: 'relative'}}>
            <Icon name="circle" color="#004F91" size={47}></Icon>
            <Icon
              name="skull-crossbones"
              style={{position: 'absolute', zIndex: 99, left: 13, top: 13}}
              size={24}
              color="#004F91"
            />
          </View>
          <Text style={styles.guideContent}>
            Make sure that the food and water for drinking are not contaminated
            by flood water.
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
            Throw away rainwater in cans, pots, and tires to prevent breeding of
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

export default Flood;
