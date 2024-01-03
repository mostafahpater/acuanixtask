import {
  Button,
  FlatList,
  PermissionsAndroid,
  Linking,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect} from 'react';
import {UseContext} from '../../components/UseContext';
import Icon from 'react-native-vector-icons/AntDesign';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import AddUser from '../../components/AddUser';
import {
  isLocationEnabled,
  promptForEnableLocationIfNeeded,
} from 'react-native-android-location-enabler';
const HomeScreen = () => {
  const {userData, setUserData} = useContext(UseContext);
  useEffect(() => {
    axios.get('https://retoolapi.dev/bEyBWr/data').then(res => {
      setUserData(res.data);
    });
  }, []);
  const deleteUser = id => {
    setUserData(prev => {
      return [...userData.filter(item => item.id !== id)];
    });
  };
  async function handleCheckPressed() {
    if (Platform.OS === 'android') {
      const checkEnabled = await isLocationEnabled();
      if (checkEnabled) {
        console.log('enabled');
        return checkEnabled;
      } else {
        const enableResult = await promptForEnableLocationIfNeeded();
        return enableResult;
      }
    }
  }

  const openAddressOnMap = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Geolocation Permission',
            message: 'Can we access your location?',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          handleCheckPressed().then(() => {
            Geolocation.getCurrentPosition(position => {
              const scheme = Platform.select({
                ios: 'maps:0,0?q=',
                android: 'geo:0,0?q=',
              });
              const latLng = `${position.coords.latitude},${position.coords.longitude}`;
              const label = 'You can use the location';
              const url = Platform.select({
                ios: `${scheme}${label}@${latLng}`,
                android: `${scheme}${latLng}(${label})`,
              });
              Linking.openURL(url);
            });
          });
          console.log('You can use the location');
        } else {
          console.log('location permission denied');
          alert('Location permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    } else {
      await Geolocation.requestAuthorization();
      Geolocation.getCurrentPosition(position => {
        const scheme = Platform.select({
          ios: 'maps:0,0?q=',
          android: 'geo:0,0?q=',
        });
        const latLng = `${position.coords.latitude},${position.coords.longitude}`;
        const label = 'Your location';
        const url = Platform.select({
          ios: `${scheme}${label}@${latLng}`,
          android: `${scheme}${latLng}(${label})`,
        });
        Linking.openURL(url);
      });
    }
  };
  return (
    <View>
      <View>
      <Button title="Show Location" onPress={openAddressOnMap} />
        <AddUser />
      </View>
      <FlatList
        data={userData}
        renderItem={({item, index}) => {
          let lastItemStyle;
          if (index === userData.length - 1) {
            lastItemStyle = styles.lastItem;
          }
          return (
            <View style={[styles.listItem, lastItemStyle]}>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.title}>{item.id}</Text>
                <Text style={styles.title}>{item['Column 1']}</Text>
              </View>
              <TouchableOpacity onPress={() => deleteUser(item.id)}>
                <Icon name="delete" size={30} color="#f00" />
              </TouchableOpacity>
            </View>
          );
        }}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  lastItem: {
    marginBottom: 70,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 10,
  },
  number: {
    fontSize: 14,
    color: '#666',
  },
});
