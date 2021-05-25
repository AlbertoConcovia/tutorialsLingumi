/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React , { useState ,useRef}  from 'react';
 import 'react-native-gesture-handler';
 import {SafeAreaView, StyleSheet, Text, View, Dimensions, TextInput, Button, TouchableOpacity, StatusBar } from 'react-native';
 import TutorialsList from './tutorialsComponents/TutorialsList';
 import Login from './tutorialsComponents/Login';
 
 import { NavigationContainer } from '@react-navigation/native';
 import { createStackNavigator } from '@react-navigation/stack';
 
 const Stack = createStackNavigator();
 
 const App = () => {
 
    return (
       
           
           <NavigationContainer>
             <Stack.Navigator initialRouteName="Login" >
               <Stack.Screen name="Login" component={Login} options={{
                 headerShown: false }}/>
               <Stack.Screen name="Tutorials"
               component={TutorialsList}
               options={{
                 title: 'Video Tutorials',
                 headerStyle: {
                   backgroundColor: '#E5E530',
                 },
                 headerTintColor: '#fff',
                 headerTitleStyle: {
                 fontWeight: 'bold',
                 },
               }}
               />
             </Stack.Navigator>
           </NavigationContainer>
 
    );
  };
  
  const styles = StyleSheet.create({
   container: {
     flex: 1,
     backgroundColor: '#9e2dd6',
     alignItems: 'center',
     justifyContent: 'center',
   },
 
   welcome: {
     fontSize: 30,
     justifyContent: 'center',
     margin: 10,
     textAlign: 'center',
     fontFamily: "sans-serif-medium",
     fontWeight: 'bold',
     color: '#fff',
   },
 
   logintext: {
     fontSize: 30,
     justifyContent: 'center',
     margin: 10,
     textAlign: 'center',
     fontStyle: 'italic',
     fontFamily: "sans-serif-condensed",
     color: '#fff',
   },
 
   input: {
     backgroundColor:'#fff',
     margin: 15,
     width: '90%',
     padding: 10, 
   },
 
   btntxt: {
     fontSize: 25,
     textAlign: 'center',
     fontWeight: 'bold',
   },
 
   btn: {
     backgroundColor: '#00FF00',
     padding: 10,
     width: '45%',
     justifyContent: 'center',
     alignItems: 'center',
   },
 
   mapStyle: {
     width: Dimensions.get('window').width,
     height: Dimensions.get('window').height,
   },
  });
  
  export default App;
  