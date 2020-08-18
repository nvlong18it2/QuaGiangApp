import React, { useState, useEffect } from 'react';
import {Text, View, StyleSheet, Modal, TouchableOpacity, Image, TextInput, ActivityIndicator} from 'react-native'
import Contants from "expo-constants"
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment"
import LoadingScreen from './LoadingScreen'
import Fire from '../Fire'
import firebase from '../config'
require("firebase/firestore");
const database = firebase.firestore()
function  UpdateScreen({route, navigation}){
    const [isLoading, setLoading] = useState(false)
    const [name, setName]= useState()
    const [phone, setPhone]= useState()
    const [avatar, setAvatar]= useState()
    const [city, setCity]= useState()
    const [errorMessage, setError]= useState()
    const { id } = route.params;
    useEffect(() => {
        async() => {
            if (Contants.platform.ios) {
                
                const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
                if(status!= "granted") {
                    alert("Assess your camera roll");
                }
            }}

        database.collection('users').doc(id)
          .get().then(function(doc) {
           setName(doc.data().name)
           setPhone(doc.data().phone)
           setAvatar(doc.data().avatar)
           setCity(doc.data().city)
          }    
        )  
   }, [])


    pickImage = async () =>{
       
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect:[4,3]
            })
            if(!result.cancelled) {
               setAvatar(result.uri)
            }
        
    }  
 
    handleUpdate = ()=>{
              setLoading(true)
              Fire.shared.updateProfile({
              name: name.trim(),
              phone: phone.trim(),
              city: city.trim(),
              localUri: avatar
       })
       .then(ref=>{
           setLoading(false)
           navigation.navigate('Home');
       })
       .catch(error=>{
           console.log(error);
           setLoading(false)
       })   
    }
       return(

                
                    isLoading ? (
                        <LoadingScreen></LoadingScreen>
                    )
                    :
                    (
                        <View style = {styles.container}>      
               <View style = {styles.viewAvatar}>
               <TouchableOpacity  onPress={()=>pickImage()}>

            <Image source={
                  avatar ? {uri: avatar}
                  : require('../assets/Anonymous.jpg')
               
               }   style ={styles.avatar}
              ></Image>
               </TouchableOpacity>
     
           </View>
          
            <View style= {styles.form}>
                <Text style= {styles.inputTitle}>Name</Text>
                  <TextInput style = {styles.input}   autoCapitalize="none"
                    value={name}
                    onChangeText={(name)=>{setName(name)}}
                ></TextInput>
            </View>
            <View style= {styles.form}>
                <Text style= {styles.inputTitle}>Phone number</Text>
                <TextInput style = {styles.input} autoCapitalize="none" 
                     value={phone}
                     onChangeText={(phone)=>{setPhone(phone)}}
                ></TextInput>
            </View>
            <View style= {styles.form}>
                <Text style= {styles.inputTitle}>City</Text>
                <TextInput style = {styles.input} autoCapitalize="none" 
                     value={city}
                     onChangeText={(city)=>{setCity(city)}}
                ></TextInput>
            </View>
            <TouchableOpacity style= {styles.button} onPress={()=>handleUpdate()}>
                <Text style= {{color:"#fff", fontWeight: "500"}}>Update!</Text>
            </TouchableOpacity>
            </View>

                    )
                
                
              
          
           
       );
   }


const styles = StyleSheet.create({
    container:{
        flex:1,
        
    },
    greeting: {
        marginTop:52,
        fontSize: 18,
        fontWeight: "400",
        textAlign: "center"
    },
    error: {
        color: "#E9446A",
        fontWeight: "600",
        fontSize:13,
        textAlign: "center"
    },
    errorMessage: {
        height:72,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 30
    },
    form: {
        marginBottom:48, 
        marginHorizontal: 30
    },
    inputTitle: {
        color: "#8A8F9E",
        fontSize: 10,
        textTransform: "uppercase"
    },
    input: {
        borderBottomColor: "#8A8F9E",
        borderBottomWidth: StyleSheet.hairlineWidth,
        height:40,
        fontSize: 15,
        color: "#161F3D"
    },
    button: {
        marginHorizontal: 30,
        backgroundColor:"#E9446A",
        borderRadius: 5,
        alignItems: "center",
        height:52,
        justifyContent: "center"
    }, 
    avatar:{
        width: 130,
        height: 130,
        borderRadius: 100,
        marginRight: 16
    },
    viewAvatar:{
        marginVertical: 20,
        justifyContent: "center",
        alignItems: 'center'
    }
});
export default UpdateScreen;