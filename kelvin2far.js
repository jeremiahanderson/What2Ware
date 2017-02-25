import React, { Component } from 'react';
import { AppRegistry, Text } from 'react-native';

'use strict'

module.exports = function (kelvin){
     return (1.8 * (kelvin - 273) + 32).toFixed(0)
}




