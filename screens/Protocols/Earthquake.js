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

function Earthquake() {
  return (
    <SafeAreaView style={styles.background}>
      <ScrollView>
        <Text style={styles.timeDisater}>Before</Text>
        <Text style={styles.subHeading}>KNOW THE HAZARDS IN YOUR AREA</Text>
        <View style={styles.detailContainer}>
          <View style={{position: 'relative'}}>
            <Icon name="circle" color="#004F91" size={47}></Icon>
            <Icon
              name="medkit"
              style={{position: 'absolute', zIndex: 99, left: 12, top: 13}}
              size={24}
              color="#004F91"
            />
          </View>
          <Text style={styles.guideContent}>
            Familiarize yourself with the following:
            <View>
              <Text
                style={{
                  fontSize: 15,
                  color: 'black',
                  flexShrink: 1,
                }}>
                Fire Extinguisher
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  color: 'black',
                  flexShrink: 1,
                }}>
                Medical Kit
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  color: 'black',
                  flexShrink: 1,
                }}>
                Exit Routes
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  color: 'black',
                  flexShrink: 1,
                }}>
                Evacuation Plan
              </Text>
            </View>
          </Text>
        </View>
        <View style={styles.detailContainer}>
          <View style={{position: 'relative'}}>
            <Icon name="circle" color="#004F91" size={47}></Icon>
            <Icon
              name="tools"
              style={{position: 'absolute', zIndex: 99, left: 12, top: 13}}
              size={24}
              color="#004F91"
            />
          </View>
          <Text style={styles.guideContent}>
            Check your house and have it repaired if necessary.
          </Text>
        </View>
        <View style={styles.detailContainer}>
          <View style={{position: 'relative'}}>
            <Icon name="circle" color="#004F91" size={47}></Icon>
            <Icon
              name="fire"
              style={{position: 'absolute', zIndex: 99, left: 15, top: 13}}
              size={24}
              color="#004F91"
            />
          </View>
          <Text style={styles.guideContent}>
            Store harmful chemicals and flammable materials properly.
          </Text>
        </View>
        <View style={styles.detailContainer}>
          <View style={{position: 'relative'}}>
            <Icon name="circle" color="#004F91" size={47}></Icon>
            <Icon name="couch" style={styles.icon} size={24} />
          </View>
          <Text style={styles.guideContent}>
            Secure heavy furniture and hanging objects.
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
            <Icon name="hands-helping" style={styles.icon} size={24} />
          </View>
          <Text style={styles.guideContent}>
            Participate in office and community earthquake drills.
          </Text>
        </View>

        <Text style={styles.timeDisater}>During</Text>
        <Text style={styles.subHeading}>
          WHEN INSIDE A BUILDING, STAY CALM AND DO THE:
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginLeft: 30,
            marginRight: 30,
          }}>
          <Text style={styles.duckcoverhold}>DUCK</Text>
          <Text style={styles.duckcoverhold}>COVER</Text>
          <Text style={styles.duckcoverhold}>HOLD</Text>
        </View>
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
            <Icon name="exclamation-triangle" style={styles.icon} size={24} />
          </View>
          <Text style={styles.guideContent}>
            Duck under a strong table and hold on to it. Stay alert for
            potential threats.
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
          <Text style={styles.guideContent}>
            Stay away from glass windows, shelves and heavy objects.
          </Text>
        </View>
        <View style={styles.detailContainer}>
          <View style={{position: 'relative'}}>
            <Icon name="circle" color="#004F91" size={47}></Icon>
            <Icon name="door-open" style={styles.icon} size={24} />
          </View>
          <Text style={styles.guideContent}>
            After shaking stops, exit the building and go to designated
            evacuation centers.
          </Text>
        </View>

        <Text style={styles.subHeading}>
          WHEN YOU ARE OUTSIDE, MOVE TO AN OPEN AREA!
        </Text>
        <View style={styles.detailContainer}>
          <View style={{position: 'relative'}}>
            <Icon name="circle" color="#004F91" size={47}></Icon>
            <Icon
              name="building"
              style={{position: 'absolute', zIndex: 99, left: 13, top: 13}}
              size={24}
              color="#004F91"
            />
          </View>
          <Text style={styles.guideContent}>
            Stay away from buildings, trees, electric posts and landslide prone
            areas.
          </Text>
        </View>
        <View style={styles.detailContainer}>
          <View style={{position: 'relative'}}>
            <Icon name="circle" color="#004F91" size={47}></Icon>
            <Icon name="car-side" style={styles.icon} size={24} />
          </View>
          <Text style={styles.guideContent}>
            If you're in a moving vehicle, stop and exit the vehicle.
          </Text>
        </View>

        <Text style={styles.timeDisater}>After</Text>
        <Text style={styles.subHeading}>STAY ALERT FOR AFTERSHOCKS!</Text>
        <View style={styles.detailContainer}>
          <View style={{position: 'relative'}}>
            <Icon name="circle" color="#004F91" size={47}></Icon>
            <Icon name="band-aid" style={styles.icon} size={24} />
          </View>
          <Text style={styles.guideContent}>
            Assess yourself and others for injuries. Provide first aid if
            necessary.
          </Text>
        </View>
        <View style={styles.detailContainer}>
          <View style={{position: 'relative'}}>
            <Icon name="circle" color="#004F91" size={47}></Icon>
            <Icon
              name="wheelchair"
              style={{position: 'absolute', zIndex: 99, left: 13, top: 13}}
              size={24}
              color="#004F91"
            />
          </View>
          <Text style={styles.guideContent}>
            Prioritize the needs of older persons, pregnant women, PWDs and
            children.
          </Text>
        </View>
        <View style={styles.detailContainer}>
          <View style={{position: 'relative'}}>
            <Icon name="circle" color="#004F91" size={47}></Icon>
            <Icon name="water" style={styles.icon} size={24} />
          </View>
          <Text style={styles.guideContent}>
            If in a coastal area and there is a threat of a tsunami, evacuate to
            higher ground immediately.
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
            Check for spills of toxic and flammable chemicals.
          </Text>
        </View>

        <View style={styles.detailContainer}>
          <View style={{position: 'relative'}}>
            <Icon name="circle" color="#004F91" size={47}></Icon>
            <Icon name="house-damage" style={styles.icon} size={24} />
          </View>
          <Text style={styles.guideContent}>
            Stay out of the building until advised that it is safe to return.
          </Text>
        </View>

        <View style={styles.detailContainer}>
          <View style={{position: 'relative'}}>
            <Icon name="circle" color="#004F91" size={47}></Icon>
            <Icon
              name="faucet"
              style={{position: 'absolute', zIndex: 99, left: 13, top: 13}}
              size={24}
              color="#004F91"
            />
          </View>
          <Text style={styles.guideContent}>
            Check for damages in water and electrical lines, and gas or LPG
            leaks.
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

  duckcoverhold: {
    fontSize: 20,
    color: '#004F91',
    fontWeight: 'bold',
  },
});

export default Earthquake;
