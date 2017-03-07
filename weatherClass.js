import React, { Component } from 'react';
import { AppRegistry, Text } from 'react-native';

'use strict'
var convert = require('./kelvin2far')

module.exports = function (response){
    var mainTemp = convert(response['main']['temp'])
    var humidity = response['main']['humidity']
    var tempMin = convert(response['main']['temp_min'])
    var tempMax = convert(response['main']['temp_max'])
    var wind = response['wind']['speed'].toFixed(0)
    //var conditions = response['weather']
    // for (var element in conditions){
    //     if(element == "Clouds"){
    //         return JSON.stringify(element)
    //     }
    // }
    // not good
    // var rain3h = response['rain']['3h']
    
    //weatherInt will determine our final recommendation.
    //We want to update it to account for things like humidity and wind chill as well, right now it's just the temperature
    var weatherInt = parseInt(mainTemp)
    //if (humidity > 85){weatherInt = weatherInt+5}
    //if (parseInt(wind) > 6){weatherInt = weatherInt-10}

    //For Debugging
    var whatToWear = "Temp: " + weatherInt + "\n"

    if(weatherInt <= 35){whatToWear += "We'd go with some heavy clothes and a warm jacket."}
    if(weatherInt > 35 && weatherInt < 50){whatToWear += "Sweater weather, never better. \nYou might want a medium jacket as well."}
    if(weatherInt >= 50 && weatherInt < 69){whatToWear += "Hoodie weather baby. Jeans and a long sleeve would cut it."} 
    if (weatherInt > 69 && weatherInt < 80){whatToWear += "Summer vibes. T-shirt and jeans or shorts today."}
    if(weatherInt >= 80) {whatToWear += "Probably wear as few clothes as is socially acceptable."}

    return whatToWear
}


