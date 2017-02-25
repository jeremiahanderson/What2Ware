import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  StatusBar,
  Image,
  AlertIOS,
  View
} from 'react-native';

'use strict'

var apiKey = "4283894c1c5f09a6539ca5dca7606966"
var getWeather = require('./weatherClass')

export default class What2Ware extends Component {
    state = {  
        personsLatitude: 'unknown',
        personsLongitude: 'unknown',
        weather: 'unkown',
        ip: 'unkown',
        fun: '',
    };
    
    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                var personsLatitude = position.coords.latitude.toFixed(0)
                var personsLongitude = position.coords.longitude.toFixed(0)
                this.setState({personsLatitude});
                this.setState({personsLongitude});
                var ip = "http://api.openweathermap.org/data/2.5/weather?lat=" + this.state.personsLatitude + "&lon=" + this.state.personsLongitude + "&APPID=" + apiKey
                this.setState({ip});
                fetch(this.state.ip)
                .then((response) => response.json())
                .then((responseJson) => {
                    var weather = responseJson
                    this.setState({weather});
                    var fun = getWeather(weather)
                    this.setState({fun});
                    AlertIOS.alert('yay');
                })
                .catch((error) => {
                    console.error(error);
                });
            },
            (error) => alert(JSON.stringify(error)),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
        );
    }

    render() {
        return (
            <Image source={require('./images/niceBlue.jpg')} style={styles.container}>
              <Text style = {styles.bigblue} >
              {((this.state.fun))}
              </Text>
            </Image>            
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

    width: null,
    height: null,
    backgroundColor: 'rgba(0,0,0,0)',
    resizeMode: 'stretch',
  },
  bigblue: {
    color: 'black',
    fontWeight: 'bold',
    margin: 35,
    fontSize: 30,
    //fontFamily: 'sans-serif-condensed',
  },
  red: {
    color: 'red',
  },
});

AppRegistry.registerComponent('What2Ware', () => What2Ware);
