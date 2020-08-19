import React, { useState, useEffect } from 'react';
import {View,Alert, Button, Text, StyleSheet,RefreshControl, TouchableOpacity, LayoutAnimation, FlatList, Image, Linking} from 'react-native';
import moment from 'moment'
import {Ionicons} from "@expo/vector-icons";
import { CheckBox } from 'react-native-elements'
import LoadingScreen from './LoadingScreen'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
require("firebase/firestore");
import firebase from '../config'
const database = firebase.firestore()
function UserScreen({route, navigation }) {
    const [profile, setProfile] = useState([]);
    const { user } = route.params;
    useEffect(() => {
        database.collection('users').doc(user)
        .get().then(function(doc) {
           setProfile(doc.data());
          }    
        )  
   }, [])
  return (
    <View style = {styles.container}>
          <Image source={profile.avatar
                    ? {uri: profile.avatar} 
                    : require("../assets/Anonymous.jpg")} style ={styles.avatar}></Image>
         <Text style= {styles.name}>{profile.name}</Text>
         <View style = {styles.infor}>
            <Text style={styles.phone}>{profile.phone}</Text>
            <Text style={styles.phone}>{profile.email}</Text>
         </View>
         <Text style= {styles.city} >{profile.city}</Text>
         <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Post' , {idPost: profile.uid} )}>
             <Text  style={styles.view}  >View Posts</Text>
         </TouchableOpacity>
    </View>
             
         
         
     
  );
}
const styles = StyleSheet.create({
  container:{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
  
  },
  avatar:{
      width: 150,
      height: 150,
      borderRadius: 80,
      marginRight: 16
  },
  infor:{
   flexDirection: 'row'
  },
  name: {
      fontSize: 30,
      fontWeight: "500",
      color: "#454D65",
      marginVertical: 15

  },
  phone:{
      marginHorizontal: 15,
      fontSize: 20,
      fontWeight: "300"
  },
  city:{
    marginVertical: 15,
    fontSize: 25,
    fontWeight: "400"
  },
  button:{
      backgroundColor: 'red',
      height: 70,
      width: 170,
      borderRadius: 50,
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 20
  },
  view:{
    marginVertical: 15,
    fontSize: 30,
    fontWeight: "400"
  }
});
export default UserScreen;
