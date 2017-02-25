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
    
    var weatherInt = parseInt(mainTemp)
    var whatToWear = ''
    //if (humidity > 85){weatherInt = weatherInt+5}
    if (parseInt(wind) > 6){weatherInt = weatherInt-10}

    if(weatherInt < 55){whatToWear = "Way to fucking cold.\nWear a god damn jacket you cold ass piece of dumb shit duck"}
    if(weatherInt >= 55 && weatherInt < 70){whatToWear = "Hoodie weeeeeather babies"}
    if(weatherInt >= 70 && weatherInt < 80){whatToWear = "Jeans and a shirt. Plaid is in"} 
    if(weatherInt >= 80) {whatToWear = "Shirts or/and shorts"}

    return whatToWear
}


