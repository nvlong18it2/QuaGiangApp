import React, { useState, useEffect } from 'react';
import {View,Alert, Button, Text, StyleSheet,RefreshControl, TouchableOpacity, LayoutAnimation, FlatList, Image, Linking} from 'react-native';
import Fire from '../Fire'
require("firebase/firestore");
import firebase from '../config'
const database = firebase.firestore()
function ProfileScreen({navigation}) {
    const[uid, setUid] = useState(Fire.shared.uid)
    const [profile, setProfile] = useState([]);
    useEffect(() => {
        database.collection('users').doc(uid)
        .get().then(function(doc) {
           setProfile(doc.data());
          }    
        )  
   }, [uid])
  return (
    <View style = {styles.container}>
      <View style={{  justifyContent: 'center',
      alignItems: 'center', marginTop: 20}}>
          <Image source={profile.avatar
                    ? {uri: profile.avatar} 
                    : require("../assets/Anonymous.jpg")} style ={styles.avatar}></Image>
         <Text style= {styles.name}>{profile.name}</Text>
         <View style = {styles.infor}>
            <Text style={styles.phone}>{profile.phone}</Text>
            <Text style={styles.phone}>{profile.email}</Text>
         </View>
         <Text style= {styles.city} >{profile.city}</Text>

      </View>
        <View style = {{marginTop: 15}}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Post' , {idPost: profile.uid} )}>
             <Text  style={styles.view}  >View Posts</Text>
         </TouchableOpacity>
         <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Update' , {id: profile.uid} )}>
             <Text  style={styles.view}  >Update Profile</Text>
         </TouchableOpacity>
         <TouchableOpacity style={styles.button} onPress={()=>{firebase.auth().signOut();   navigation.replace("Login")}} >
             <Text  style={styles.view}  >LogOut</Text>
         </TouchableOpacity>
        </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container:{
      flex: 1,
  },
  avatar:{
      width: 150,
      height: 150,
      borderRadius: 100,
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
    marginHorizontal: 20,
    backgroundColor:"#E9446A",
    borderRadius: 5,
    alignItems: "center",
    height:52,
    justifyContent: "center",
    marginVertical: 5
  },
  view:{
   
    fontSize: 30,
    fontWeight: "300"
  }
});
export default ProfileScreen;
