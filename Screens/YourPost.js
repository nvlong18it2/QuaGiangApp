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
function YourPost({route, navigation }) {
const { idPost } = route.params;
const [post, setPost] = useState([]);

useEffect(() => {
   database.collection('users').doc(idPost)
   .get().then(function(doc) {
      setPost(doc.data());
     }    
   )  
}, [])
  return (
    <View>
    <View  style= {styles.feedItem}
    >
       <View style= {{flexDirection: 'row'}}>
       <Image source={post.avatar
        ? {uri: post.avatar} 
        : require("../assets/Anonymous.jpg")} style ={styles.avatar}></Image>
        <View style={{flex:1}}>
            <View style={{flexDirection: "row", justifyContent: "space-between", alignItems:"center"}}>
                <View>
                    <Text style={styles.name}>{post.name}</Text>
                    <Text style={styles.timestamp}>{moment(post.timestamp).fromNow()}</Text>
                </View>
                    <Ionicons name="ios-more" size={24} color="#73788B"></Ionicons>
            </View>
        <View style={{flexDirection: "row" }}>
        <CheckBox
        size ={14}
        title='Find Driver'
        checked={post.findcar} />
        <CheckBox
        size ={14}
        title='Have Car'
        checked={!post.findcar} />
        </View>
            <Text style={styles.post}><Ionicons name="md-arrow-round-forward" size={25} color="#454D65" />  {post.from}</Text>
            <Text style={styles.post}><Ionicons name="md-arrow-round-forward" size={25} color="#454D65" />  {post.to} </Text>
        <View style={{justifyContent: 'space-between', flexDirection:"row"}}>
            <Text style={{fontSize: 20, justifyContent: "space-between"}}><Ionicons name="ios-calendar" size={27} color="#454D65"  />{post.date}</Text>
            <Text style={{fontSize: 20, justifyContent: "space-between"}}><Ionicons name="ios-clock" size={27} color="#454D65"  />{post.time}</Text>
        </View>

        <Text style={{fontSize: 20}} >Money: {post.money}</Text>
        <Text style={{fontSize: 20}} >Note: {post.note}</Text>
       
        
        </View>
        
       </View>
       <Image source={{uri: post.image}} style={styles.postImage} resizeMode="cover"></Image>
      
  </View>
    </View>
             
         
         
     
  );
}
const styles = StyleSheet.create({
  container:{
      flex:1,
      backgroundColor: "#EFECF4"
      
  },

  feed:{
      marginHorizontal: 10
  },
  feedItem:{
      backgroundColor: "#fff",
      borderRadius:5,
      padding: 5,
     
      marginVertical: 8
  },
  avatar:{
      width: 36,
      height: 36,
      borderRadius: 18,
      marginRight: 16
  },
  name: {
      fontSize: 15,
      fontWeight: "500",
      color: "#454D65",

  },
  timestamp:{
      fontSize: 11,
      color: "#C4C6CE",
      marginTop: 4
  }, 
  post:{
      marginTop: 10,
      fontSize: 23,
  },
  postImage:{
      width: undefined,
      height:250,
      borderRadius: 5,
      marginVertical: 16,
  }
});
export default YourPost;
