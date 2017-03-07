
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  StatusBar,
  Image,
  View
} from 'react-native';

'use strict'

var apiKey = "4283894c1c5f09a6539ca5dca7606966"
var getWeather = require('./weatherClass')

export default class What2Ware extends Component {
    state = {  
        personsLatitude: 'unknown',
        personsLongitude: 'unknown',
        apiCall: 'unknown',
        weather: 'unknown',
        whatToWear: '',
    };
    
    componentDidMount() {
        
        navigator.geolocation.getCurrentPosition(
            (position) => {
                var personsLatitude = position.coords.latitude.toFixed(0)
                var personsLongitude = position.coords.longitude.toFixed(0)
                this.setState({personsLatitude});
                this.setState({personsLongitude});
                
                var apiCall = "http://api.openweathermap.org/data/2.5/weather?lat=" + this.state.personsLatitude 
                	+ "&lon=" + this.state.personsLongitude + "&APPID=" + apiKey
                this.setState({apiCall});
                fetch(this.state.apiCall)
                .then((response) => response.json())
                .then((responseJson) => {
                    var weather = responseJson
                    this.setState({weather});
                    var whatToWear = getWeather(weather)
                    this.setState({whatToWear});
                })
                .catch((error) => {
                    console.error(error);
                });
            },
            (error) => alert(JSON.stringify(error)),
            {enableHighAccuracy: false, timeout: 20000}
        );
    }

    render() {
        return (
            <Image source={require('./images/niceBlue.jpg')} style={styles.container}>
              <Text style = {styles.bigblue} >
              {((this.state.whatToWear))}
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
    fontFamily: 'sans-serif-condensed',
  },
  red: {
    color: 'red',
  },
});

AppRegistry.registerComponent('What2Ware', () => What2Ware);
