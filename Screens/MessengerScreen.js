import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Fire from '../Fire'
import firebase from '../config'
function MessengerScreen({navigation}) {
const [uid, setUid] = useState()
  useEffect(()=>{
     setUid(firebase.auth().currentUser.uid)
  })
  
    return (
      
      <View style={{ flex:1, alignItems: 'center', justifyContent: 'center'}}>
       <TouchableOpacity   onPress={() => navigation.navigate('Tingg', {post: 'long'})}>
            <Text> {uid} </Text>
       </TouchableOpacity>
      </View>
    );
  
}

export default MessengerScreen;
