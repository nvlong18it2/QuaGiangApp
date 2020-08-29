import React, { useState, useEffect, useReducer } from 'react';
import { View, Text, Platform, KeyboardAvoidingView, SafeAreaView } from 'react-native';
import Fire from '../Fire'
require("firebase/firestore");
import firebase from '../config'
const database = firebase.firestore()
import {GiftedChat} from "react-native-gifted-chat"

export default class MessengerScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      messages: [],
      name: '',
      avatar: '',
    };
  }
      get user() {
          return{
            _id: Fire.shared.uid,
            name: this.state.name,
            avatar: this.state.avatar
          } 
      }
      getName(){
        database.collection('users').doc(Fire.shared.uid)
        .get().then(doc => { 
           this.setState({
             name: doc.data().name,
             avatar: doc.data().avatar
           })
        }
          )  
      }
      componentDidMount(){
        this.getName();
        Fire.shared.get(message => {
          this.setState(previous => ({
            messages: GiftedChat.append(previous.messages, message)
          }))
         
        })
      }
      componentWillMount(){
        Fire.shared.off()
      }
render(){
  const chat = <GiftedChat messages = {this.state.messages} onSend = {Fire.shared.send} user= {this.user}></GiftedChat>
          if (Platform.OS ==="android"){
              return(
                <KeyboardAvoidingView style= {{flex:1}} behavior="padding" keyboardVerticalOffset={30} enabled>
                  {chat}
                </KeyboardAvoidingView>
              )
          }
  return(
    
      <SafeAreaView style ={{flex: 1}}>{chat}</SafeAreaView>
  )
}
}

