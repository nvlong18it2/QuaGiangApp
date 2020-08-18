import React, { Component } from 'react';
import {View,Alert, Button, Text, StyleSheet,RefreshControl, TouchableOpacity, LayoutAnimation, FlatList, Image, Linking} from 'react-native';
import moment from 'moment'
import {Ionicons} from "@expo/vector-icons";
import { CheckBox } from 'react-native-elements'
function TinggScreen({route, navigation}){
    const { post } = route.params;
    return(
        <View>
            <Text>Long</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
    
        
    },
 
  });
export default TinggScreen;