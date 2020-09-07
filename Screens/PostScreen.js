import React, { useState, useEffect } from 'react';
import {Text, View, StyleSheet, SafeAreaView, TouchableOpacity, Image, TextInput, Keyboard, ScrollView} from 'react-native'
import {Ionicons} from "@expo/vector-icons";
import Contants from "expo-constants"
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment"
import LoadingScreen from './LoadingScreen'
import { CheckBox } from 'react-native-elements'
import Fire from '../Fire'
import firebase from '../config'
require("firebase/firestore");
const database = firebase.firestore()
export default function  PostScreen({navigation}){
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [money, setMoney] = useState('')
  const [note, setNote] = useState('')
  const [image, setImage] = useState('')
  const [findcar, setFindcar] = useState(true)
  const [isVisible, setVisible] = useState(false)
  const [type, setType] = useState('')
  const [canladar, setCanladar] = useState('')
  const [isLoading, setLoading] = useState(false)

    useEffect( ()=>{
        async() => {
            if (Contants.platform.ios) {
                const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
                if(status!= "granted") {
                    alert("Assess your camera roll");
                }
            }}
    }
      )

    pickImage = async () =>{
       
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect:[4,3]
            })
            if(!result.cancelled) {
               setImage(result.uri)
            }
        
    }  
 
    handlePost = ()=>{
        setLoading(true)
        Fire.shared.addPost({
           from: from.trim(),
           to: to.trim(),
           date: date.trim(),
           time: time.trim(),
           note: note.trim(),
           money: money.trim(),
           findcar: findcar,
           localUri: image.trim()
       })
       .then(ref=>{
           setLoading(false)
            navigation.navigate('Home');
       })
       .catch(error=>{
           setLoading(false)
           console.log(error);
       })   
    }
    handlePicker=(datetime)=>{
     setVisible(false)
     setDate(moment(datetime).format('LL'))
     setTime(moment(datetime).format('LT'))
   }
   
   hidePicker=()=>{
    setVisible(false)
   }
   showDate=()=>{
    setVisible(true)
    setType('date')
    setCanladar('Pick a Date')
   }
   showClock=()=>{
    setVisible(true)
    setType('time')
    setCanladar('Pick a Time')
   }
   
        return(
           isLoading ? (
               <LoadingScreen></LoadingScreen>
           )
           :
           (
            <SafeAreaView style = {styles.container}>
            <View style= {styles.header}>
            <TouchableOpacity onPress= {Keyboard.dismiss} >
                 <Ionicons name="md-arrow-back" size= {24} color="#D8D9DB"></Ionicons>
             </TouchableOpacity>
             <Text style = {styles.greeting}>{'Make chuyến đi new'}</Text>
             <TouchableOpacity onPress={()=>handlePost()}>
                 <Text style={{fontWeight:"500"}}>Post</Text>
             </TouchableOpacity>
            </View>
            <ScrollView>
           
            <CheckBox
                 title='Find Driver'
                  checked={findcar}
                  onPress={() => setFindcar(true)}
            />
             <CheckBox
                 title='I have a motobike'
                  checked={!findcar}
                  onPress={() =>  setFindcar(false)}
            />
                <View style= {styles.form}>
                   <Text style= {styles.inputTitle}>From: </Text>
                   <TextInput style = {styles.input} autoCapitalize="none" 
                   value={from}
                   onChangeText={(from)=>{setFrom(from)}}
                   ></TextInput>
                  </View>
                  <View style= {styles.form}>
                   <Text style= {styles.inputTitle}>To: </Text>
                   <TextInput style = {styles.input} autoCapitalize="none" 
                    value={to}
                    onChangeText={(to)=>{setTo(to)}}
                   ></TextInput>
                  </View>
                  <View style= {styles.form}>
                   <Text style= {styles.inputTitle}>money: </Text>
                   <TextInput style = {styles.input} autoCapitalize="none" 
                     value={money}
                     onChangeText={(money)=>{setMoney(money)}}
                   ></TextInput>
                  </View>
                  <View style= {styles.form}>
                   <TouchableOpacity onPress={()=>showDate()}>
                    <Text style= {styles.inputTitle}>date 
                      <Ionicons name="ios-calendar" size={30} color="#8A9F9E"  />
                      : <Text style = {styles.input} >{date}</Text> 
                     </Text>
                  </TouchableOpacity>
                  </View>
                  <View style= {styles.form}>
                  <TouchableOpacity onPress={()=>showClock()}>
                    <Text style= {styles.inputTitle}>time 
                      <Ionicons name="ios-clock" size={30} color="#8A9F9E" />
                      : <Text style = {styles.input} >{time}</Text> 
                     </Text>
                  </TouchableOpacity>
                  </View>
  
                  <View style= {styles.form}>
                   <Text style= {styles.inputTitle}>note </Text>
                   <TextInput  style = {styles.input} autoCapitalize="none" 
                   value={note}
                   onChangeText={(note)=>{setNote(note)}}
                   ></TextInput>
                  </View>
            <TouchableOpacity style={styles.photo} onPress={()=> pickImage()}> 
                <Ionicons name="md-camera" size={24} color="#D8D9DB"></Ionicons>
            </TouchableOpacity>
            <View style={{marginHorizontal: 32, marginTop: 32, height: 250}}>
                <Image source={{uri: image}} style={{width: "100%", height: "100%"}}></Image>
            </View>
            </ScrollView>
            <DateTimePickerModal
                isVisible={isVisible}
                mode={type}
                onConfirm={()=>handlePicker()}
                onCancel={()=>hidePicker()}
                headerTextIOS={canladar}
                />
          </SafeAreaView>
           )
        )
    
}

const styles = StyleSheet.create({
    container:{
        flex:1,
       marginHorizontal: 10
    },
     header:{
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 32,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#B8B9BD",
        alignItems: 'center'
    },
    greeting: {
      
        fontSize: 20,
        fontWeight: "500",
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
        marginBottom:34, 
        marginHorizontal: 30
    },
    inputTitle: {
        marginTop: 10,
        color: "#8A8F9E",
        fontSize: 17,
        textTransform: "uppercase"
    },
    input: {
        borderBottomColor: "#8A8F9E",
        borderBottomWidth: StyleSheet.hairlineWidth,
        height:35,
        fontSize: 20,
        color: "#161F3D"
        
    },
    avatarPlaceholder:{
        width: 100,
        height: 100,
        backgroundColor: "#E1E2E6",
        borderRadius: 50,
        marginTop: 48,
        justifyContent: "center",
        alignItems: "center"
    },
    avatar: {
        position: "absolute",
        width:100,
        height:100,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center"
        
    },
    button: {
        marginHorizontal: 30,
        backgroundColor:"#E9446A",
        borderRadius: 5,
        alignItems: "center",
        height:52,
        justifyContent: "center",
        marginTop: 0
    },

    photo:{
        alignItems: "flex-end",
        marginHorizontal: 32
        
    }
});