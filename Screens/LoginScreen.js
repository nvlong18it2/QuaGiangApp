import React, { useState, useEffect } from 'react';
import {View, Text, StyleSheet, Button, StatusBar} from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import Fire from '../Fire'
import firebase from '../config'

export default function  LoginScreen ({route, navigation}){
    
    const [email, setEmai]= useState()
    const [password, setPassword]= useState()
    const [errorMessage, setError]= useState()
    function handleLogin(){
       ( email == null || password == null) ? (setError('Email or Password is null'))
        : (
            firebase.auth().signInWithEmailAndPassword(email, password)
            .then(()=>{navigation.replace('Mytabs')})
            .catch(error => {setError(error.message); navigation.replace('Login')})

        )
       
    }
       return(
           <View style = {styles.container}>
               <Text style = {styles.greeting}>{'Welcome back!  \n QuaGiang app \n Long không mlem'}</Text>
               <View style = {styles.errorMessage}>
              {errorMessage && <Text style= {styles.error}>{errorMessage}</Text>}
                </View>
                <View style= {styles.form}>
                    <Text style= {styles.inputTitle}>Email Address</Text>
                    <TextInput style = {styles.input} autoCapitalize="none" 
                         value={email}
                         onChangeText={(email)=>{setEmai(email)}}
                    ></TextInput>
                </View>
                <View style= {styles.form}>
                    <Text style= {styles.inputTitle}>Password</Text>
                      <TextInput style = {styles.input} secureTextEntry  autoCapitalize="none"
                        value={password}
                        onChangeText={(password)=>{setPassword(password)}}
                    ></TextInput>
                </View>
                <TouchableOpacity style= {styles.button} onPress={()=>handleLogin()}>
                    <Text style= {{color:"#fff", fontWeight: "500"}}>Sign in</Text>
                </TouchableOpacity>
                <TouchableOpacity style= {{alignSelf:"center", marginTop: 32}} 
                onPress={()=> navigation.navigate("Register")}>
                    <Text style = {{color: "#414959", fontSize:13}}>
                        New to QuaGiang? <Text style = {{fontWeight: "500", color:"#E9466A"}}>Sign Up</Text>
                    </Text>
                </TouchableOpacity>
              
           </View>
           
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
    }
});