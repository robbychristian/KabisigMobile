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

function Tsunami() {
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
            Know if your area has potential threat of tsunami.
          </Text>
        </View>
        <View style={styles.detailContainer}>
          <View style={{position: 'relative'}}>
            <Icon name="circle" color="#004F91" size={47}></Icon>
            <Icon name="map-marked" style={styles.icon} size={24} />
          </View>
          <Text style={styles.guideContent}>
            Know the location of the evacuation site and the fastest and safest
            way to go there.
          </Text>
        </View>
        <View style={styles.detailContainer}>
          <View style={{position: 'relative'}}>
            <Icon name="circle" color="#004F91" size={47}></Icon>
            <Icon name="hands-helping" style={styles.icon} size={24} />
          </View>
          <Text style={styles.guideContent}>
            Participate in community tsunami preparedness actions and drills.
          </Text>
        </View>
        <View style={styles.detailContainer}>
          <View style={{position: 'relative'}}>
            <Icon name="circle" color="#004F91" size={47}></Icon>
            <Icon
              name="seedling"
              style={{position: 'absolute', zIndex: 99, left: 12, top: 13}}
              size={24}
              color="#004F91"
            />
          </View>
          <Text style={styles.guideContent}>
            Plant mangroves and trees near the shore.
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

        <Text style={styles.timeDisater}>During</Text>
        <Text style={styles.subHeading}>
          KNOW THE SIGNS OF AN INCOMING TSUNAMI
        </Text>
        <View style={styles.detailContainer}>
          <View style={{position: 'relative'}}>
            <Icon name="circle" color="#004F91" size={47}></Icon>
            <Icon
              name="chart-line"
              style={{position: 'absolute', zIndex: 99, left: 12, top: 13}}
              size={24}
              color="#004F91"
            />
          </View>
          <Text style={styles.guideContent}>
            Earthquake that is strong enough to be felt.
          </Text>
        </View>
        <View style={styles.detailContainer}>
          <View style={{position: 'relative'}}>
            <Icon name="circle" color="#004F91" size={47}></Icon>
            <Icon
              name="sun"
              style={{position: 'absolute', zIndex: 99, left: 12, top: 13}}
              size={24}
              color="#004F91"
            />
          </View>
          <Text style={styles.guideContent}>
            Sudden drop or rise of sea water level.
          </Text>
        </View>
        <View style={styles.detailContainer}>
          <View style={{position: 'relative'}}>
            <Icon name="circle" color="#004F91" size={47}></Icon>
            <Icon name="volume-up" style={styles.icon} size={24} />
          </View>
          <Text style={styles.guideContent}>
            Roaring sound of incoming tsunami.
          </Text>
        </View>
        <Text style={styles.subHeading}>STAY ON HIGHER GROUNDS.</Text>
        <View style={styles.detailContainer}>
          <View style={{position: 'relative'}}>
            <Icon name="circle" color="#004F91" size={47}></Icon>
            <Icon name="mountain" style={styles.icon} size={24} />
          </View>
          <Text style={styles.guideContent}>
            Do not stay in low-lying coastal area after a strong earthquake.
            Move to higher ground immediately.
          </Text>
        </View>
        <View style={styles.detailContainer}>
          <View style={{position: 'relative'}}>
            <Icon name="circle" color="#004F91" size={47}></Icon>
            <Icon
              name="camera"
              style={{position: 'absolute', zIndex: 99, left: 12, top: 13}}
              size={24}
              color="#004F91"
            />
          </View>
          <Text style={styles.guideContent}>
            Never go down the beach to watch or take pictures of the tsunami.
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
            <Icon name="search-location" style={styles.icon} size={24} />
          </View>
          <Text style={styles.guideContent}>
            Check for missing persons and report it to authorities.
          </Text>
        </View>
        <View style={styles.detailContainer}>
          <View style={{position: 'relative'}}>
            <Icon name="circle" color="#004F91" size={47}></Icon>
            <Icon name="ambulance" style={styles.icon} size={24} />
          </View>
          <Text style={styles.guideContent}>
            Bring the injured and sick to the nearest hospital.
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
            <Icon name="house-damage" style={styles.icon} size={24} />
          </View>
          <Text style={styles.guideContent}>
            Check your house for possible damages and repair as necessary.
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

export default Tsunami;
