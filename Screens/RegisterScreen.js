import React, { useState, useEffect } from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import Fire from '../Fire'
import firebase from '../config'

export default function RegisterScreen ({navigation}){
    const [mlem, setMlem]= useState(0)
    const [email, setEmail]= useState()
    const [password, setPassword]= useState()
    const [name, setName]= useState()
    const [phone, setPhone]= useState()
    const [city, setCity]= useState()
    const [errorMessage, setError]= useState()
    function handleCreate(){
          ( email == null || password == null || name == null || phone == null ||city == null) 
        ? (setError('Still empty'))
        : ( 
          
                Fire.shared.creaeUser({
                    name: name,
                    email: email,
                    password: password,
                    phone: phone,
                    city: city
                }),
                navigation.replace("Login")
            

        )
       
    }
       return(
           <View style = {styles.container}>
               <Text style = {styles.greeting}>{'Sign In to start'}</Text>
               <View style = {styles.errorMessage}>
                     {errorMessage && <Text style= {styles.error}>{errorMessage}</Text>}
                </View>
                <ScrollView style={{marginTop: mlem}}>
                <View style= {styles.form}>
                    <Text style= {styles.inputTitle}>Name</Text>
                    <TextInput style = {styles.input} autoCapitalize="none" 
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
                <View style= {styles.form}>
                    <Text style= {styles.inputTitle}>Email Address</Text>
                    <TextInput style = {styles.input} autoCapitalize="none" 
                         value={email}
                         onChangeText={(email)=>{setEmail(email)}}
                    ></TextInput>
                </View>
                <View style= {styles.form}>
                    <Text style= {styles.inputTitle}>Password</Text>
                      <TextInput style = {styles.input} secureTextEntry  autoCapitalize="none"
                        value={password}
                        onChangeText={(password)=>{setPassword(password) }}
                    ></TextInput>
                </View>
                <TouchableOpacity style= {styles.button} onPress={()=>handleCreate()}>
                    <Text style= {{color:"#fff", fontWeight: "500"}}>Sign in</Text>
                </TouchableOpacity>
                  <TouchableOpacity style= {{alignSelf:"center", marginTop: 32}} 
                     onPress={()=> navigation.replace("Login")}>
                    <Text style = {{color: "#414959", fontSize:13,}}>
                        Have account? <Text style = {{fontWeight: "500", color:"#E9466A"}}>SignIn</Text>
                    </Text>
                </TouchableOpacity>
                <View style={{height: 150 }}></View>
                </ScrollView>
              
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