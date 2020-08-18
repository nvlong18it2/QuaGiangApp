import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, Image } from 'react-native';
export default function LoadingScreen() {
 const [size, setSize] =useState(150)
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', }}>
       
        <Image source ={require('../assets/logo.png')} style= {{height:size, width: size}} ></Image>
        <Text style={{marginVertical: 20, fontSize: 25}}>Loading...</Text>
        <ActivityIndicator ></ActivityIndicator>
      </View>
    );
  }


