import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import PostScreen from './Screens/PostScreen';
import ProfileScreen from './Screens/ProfileScreen';

import NotificationScreen from './Screens/NotificationScreen';
import RegisterScreen from './Screens/RegisterScreen';
import LoginScreen from './Screens/LoginScreen';
import LoadingScreen from './Screens/LoadingScreen';
import HomeScreen from './Screens/HomeScreen';
import MessengerScreen from './Screens/MessengerScreen';
import MoreScreen from './Screens/MoreScreen'
import TinggScreen from './Screens/TinggScreen'
import UserScreen from './Screens/UserScreen'
import YourPost from './Screens/YourPost'
import UpdateScreen from './Screens/UpdateScreen'
import Fire from './Fire'
import firebase from './config'
const AuthContext = React.createContext();
const Stack = createStackNavigator();

function MyAuth() {
  return (
    <Stack.Navigator >
      <Stack.Screen name="Login" component={LoginScreen} options= {{headerShown: false}} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Mytabs" component={MyTabs}  options= {{headerShown: false}} />
    </Stack.Navigator>
  );
}       
function MyMessenger() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Messenger" component={MessengerScreen} />
      <Stack.Screen name="Tingg" component={TinggScreen} />
    </Stack.Navigator>
  );
}
function MyHome(){
  return(
    <Stack.Navigator>
    <Stack.Screen name="QuaGiangApp" component={HomeScreen} />
    <Stack.Screen name="More" component={MoreScreen} />
  </Stack.Navigator>
  )
}

function MyNotification(){
  return(
    <Stack.Navigator>
    <Stack.Screen name="Notification" component={NotificationScreen} />
    <Stack.Screen name="Post" component={YourPost} />
    <Stack.Screen name="User" component={UserScreen} />
  </Stack.Navigator>
  )
}
function MyProfile(){
  return(
    <Stack.Navigator>
    <Stack.Screen name="Profile" component={ProfileScreen} />
    <Stack.Screen name="Post" component={YourPost} />
    <Stack.Screen name="Update" component={UpdateScreen} />
    
  </Stack.Navigator>
  )
}
const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
   
    
    <Tab.Navigator> 
      
      <Tab.Screen
        name="Home"
        component={MyHome}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Messenger"
        component={MyMessenger}
        options={{
          tabBarLabel: 'Messenger',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="message" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Post"
        component={PostScreen}
        options={{
          tabBarLabel: 'Post',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="post-outline" color={color}  size= {size} 
            />
          ),
        }}
      />
       <Tab.Screen
        name="Notification"
        component={MyNotification}
        options={{
          tabBarLabel: 'Notification',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="bell" color={color} size={size} />
          ),
        }}
      />
      
      <Tab.Screen
        name="Profile"
        component={MyProfile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const [uid, setUid] = useState()
    useEffect(()=>{
      try {
        setUid(firebase.auth().currentUser.uid)
      } catch (error) {
        setUid(null)
      }
    },[])
  return (
  
    <NavigationContainer >
       <StatusBar style='auto'></StatusBar>
        {   uid ? (<MyTabs></MyTabs>)
        :
        (<MyAuth></MyAuth>)}
       
    </NavigationContainer>
   
  );
}