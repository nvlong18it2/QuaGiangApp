import React, { useState, useEffect } from 'react';
import {View, Alert, Button, Text, StyleSheet,RefreshControl, TouchableOpacity, LayoutAnimation, FlatList, Image, Linking, Modal} from 'react-native';
import moment from 'moment'
import {Ionicons} from "@expo/vector-icons";
import { CheckBox } from 'react-native-elements'
import DialogInput from 'react-native-dialog-input';
require("firebase/firestore");
import Fire from '../Fire'
import firebase from '../config'
const database = firebase.firestore()

function MoreScreen({route, navigation}){
    
    const { post } = route.params;
    const [noteCus, setNoteCus] = useState()
    const [isVisible, setIsVisible] = useState(false)
    function handleBook(input){
         
        database.collection("users").doc(post.uid).update({
            cusUid: Fire.shared.uid,
            noteCus : input,
            book: 'Booked'
         })
          database.collection("users").doc(Fire.shared.uid).update({
            yourBooked: post.uid 
         })
         setIsVisible(false)
         Alert.alert('Book Done!')
        navigation.goBack()
    }
   
    return(
        
        <View  style= {styles.feedItem}      onPress={() => navigation.navigate('More', {post: post})}
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
               
           
            
            </View>
            
           </View>
                <Text style={styles.post}><Ionicons name="md-arrow-round-forward" size={25} color="#454D65" />  {post.from}</Text>
                <Text style={styles.post}><Ionicons name="md-arrow-round-forward" size={25} color="#454D65" />  {post.to} </Text>
            <View style={{justifyContent: 'space-around', flexDirection:"row"}}>
                <Text style={{fontSize: 20 }}><Ionicons name="ios-calendar" size={27} color="#454D65"  />{post.date}</Text>
                <Text style={{fontSize: 20}}><Ionicons name="ios-clock" size={27} color="#454D65"  />{post.time}</Text>
            </View>

            <Text  style={styles.post} >Money: {post.money}</Text>
            <Text  style={styles.post} >Note: {post.note}</Text>
           <Image source={{uri: post.image}} style={styles.postImage} resizeMode="cover"></Image>
           <View style={{flexDirection:"row", justifyContent: 'space-around'}}>
                <TouchableOpacity onPress={()=>Linking.openURL(`tel:${post.phone}`)}>
                    <Ionicons name="ios-call" size={25}  style={{marginRight: 16}} >Call</Ionicons>
                </TouchableOpacity>
                <TouchableOpacity>
                      <Ionicons name="ios-chatboxes" size={25} >Message</Ionicons>
                </TouchableOpacity>
                
            </View>
            <TouchableOpacity  style = {styles.button} onPress={()=> setIsVisible(true)} disabled = {post.book == 'Book Now' ? false : true }>
               <Text style={{fontSize: 30}}>{post.book}</Text>
                </TouchableOpacity>
                <DialogInput isDialogVisible={isVisible}
                     title={"Confirm Book"}
                     message={"Write some note"}
                     hintInput ={""}
                     submitInput={ (input) => { handleBook(input)}  }
                     closeDialog={ () =>setIsVisible(false)}>
              </DialogInput>
             
       
      </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
    
        
    },
  

    feedItem:{
      
        borderRadius:5,
        padding: 5,
       
       
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
        marginLeft: 20
    },
    postImage:{
        width: undefined,
        height: 170,
        borderRadius: 1,
        marginVertical: 16,
        
    },
    button: {
      
        backgroundColor:"#E9446A",
        borderRadius: 5,
        alignItems: "center",
        height:52,
        justifyContent: "center",
        marginTop: 0
    }
  });
export default MoreScreen;