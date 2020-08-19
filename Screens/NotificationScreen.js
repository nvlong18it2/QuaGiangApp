import React, { useState, useEffect } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image, ScrollView} from 'react-native';
import moment from 'moment'
import {Ionicons} from "@expo/vector-icons";
import { CheckBox } from 'react-native-elements'
import LoadingScreen from './LoadingScreen'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
require("firebase/firestore");
import Fire from '../Fire'
import firebase from '../config'
import YourPost from './YourPost';
const database = firebase.firestore()

function NotificationScreen({ navigation }) {
   const  [uid, setuid] = useState(Fire.shared.uid);
   const [post, setPost] = useState([]);
   const [cus, setCus] = useState([]);
   const [booked, setBooked] = useState([]);
   useEffect(() => {
     database.collection('users').doc(uid)
     .get().then(function(doc) {
        setPost(doc.data());
       
        doc.data().cusUid ?  (
          database.collection('users').doc(doc.data().cusUid)
          .get().then(function(doc1) {
            setCus(doc1.data())    
            })
        )
        : (
          console.log('no')
        )
        doc.data().yourBooked ?  (
          database.collection('users').doc(doc.data().yourBooked)
          .get().then(function(doc2) {
            setBooked(doc2.data())    
       })
        )
        : (
          console.log('no')
        )
       
       
         
       }    
     )  
}, [])

  return (
    <ScrollView>
       <View style = {styles.header}>
         <TouchableOpacity onPress={() => navigation.navigate('Post', {idPost: post.uid})}>
        <View style={styles.time}>
           <Text style= {styles.yourpost} >Your Post </Text>
           <Text style={styles.timestamp}>{moment(post.timestamp).fromNow()}</Text>
        </View>

            <View style={{flexDirection: "row", justifyContent: 'space-around' }}>
                <CheckBox size ={14} title='Find Driver' checked={post.findcar} />
                <CheckBox size ={14} title='Have Car'checked={!post.findcar} />    
            </View>
            
             <Text style={styles.post}><Ionicons name="md-arrow-round-forward" size={25} color="#454D65" />  {post.from}</Text>
            <Text style={styles.post}><Ionicons name="md-arrow-round-forward" size={25} color="#454D65" />  {post.to} </Text>
         </TouchableOpacity>
       </View>
       <View style = {styles.header}>
         <TouchableOpacity onPress={() => navigation.navigate('User' , {user: post.cusUid} )} disabled = {post.cusUid ? false : true }>
        <View style={styles.time}>
           <Text style= {styles.yourpost} >Your Customer </Text>
           {post.cusUid ?  ( 
            <View style = {styles.yourpost}>
                 <Image source={cus.avatar
                    ? {uri: cus.avatar} 
                    : require("../assets/Anonymous.jpg")} style ={styles.avatar}></Image>
                 <Text style= {styles.name}>{cus.name}</Text>
                 <Text style ={styles.note}>Note: {post.noteCus}</Text>
            </View>
            
           )
              : (<Text>No customer</Text>) 
          }
        </View>
         </TouchableOpacity>
       </View>
       <View style = {styles.header}>
       <TouchableOpacity onPress={() => navigation.navigate('Post', {idPost: booked.uid})} disabled = {booked.uid ? false : true }>
          <View style={styles.time}>
           <Text style= {styles.yourpost} >Your Booked </Text>
         
        </View>

            <View style={{flexDirection: "row", justifyContent: 'space-around' }}>
                 <Text  style={styles.post}>{booked.date}</Text>
                 <Text  style={styles.post}>{booked.time}</Text>
            </View>
            
             <Text style={styles.post}><Ionicons name="md-arrow-round-forward" size={25} color="#454D65" />  {booked.from}</Text>
            <Text style={styles.post}><Ionicons name="md-arrow-round-forward" size={25} color="#454D65" />  {booked.to} </Text>
         </TouchableOpacity>
       
       </View>
           
   </ScrollView>     
     
  );
}
const styles = StyleSheet.create({
  yourpost:{
    marginTop: 10,
    fontSize: 30,
    marginHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
 time:{
  
  alignItems: "center",
  justifyContent: 'center'
 },
  timestamp:{
      fontSize: 15,
      marginHorizontal: 20,
  }, 
  post:{
      marginTop: 10,
      fontSize: 23,
      marginHorizontal: 20,
      marginBottom:15
  },
  avatar:{
    width: 90,
    height: 90,
    borderRadius: 50,
    marginRight: 16
},
name: {
   fontSize: 30,
   marginVertical: 10
},
note: {
  fontSize: 25,
  marginBottom: 20
},
  header: {
   backgroundColor:  "#C4C6CE",
   borderRadius: 20,
   marginHorizontal: 15,
   marginVertical: 5
  }
});
export default NotificationScreen;
