import React, {Component} from 'react';
import {Text, View, PermissionsAndroid} from 'react-native';
import Geolocation from '@react-native-community/geolocation';

export async function requestLocationPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('granted', granted);
    } else {
      alert('Hak akses ditolak');
    }
  } catch (err) {
    console.warn(err);
  }
}

export default class MapScreen extends React.Component {
  state = {
    location: null,
  };

  async componentDidMount() {
    await requestLocationPermission();

    await Geolocation.getCurrentPosition(position => {
      const location = JSON.stringify(position);
      console.log(location);
      this.setState({location: location});
    });
  }

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{textAlign: 'center'}}>
          Location:{' '}
          {this.state.location
            ? this.state.location
            : 'lat long tidak ditemukan'}
        </Text>
      </View>
    );
  }
}
