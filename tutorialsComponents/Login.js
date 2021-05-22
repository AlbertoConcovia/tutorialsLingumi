import React , { useState , useEffect }  from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput, Button, TouchableOpacity, StatusBar } from 'react-native';



const Login = ({ navigation }) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (

      <View style={styles.container}>
        <StatusBar 
          backgroundColor="#03070E"
          barStyle="light-content"
        />
        <Text style={styles.welcome}>Welcome to Lingumi Tutorials</Text>
        <Text style={styles.logintext}>Please Login to watch your videos!</Text>

        <TextInput 
            placeholder="enter email" 
            style={styles.input}
            onChangeText={setUsername} 
        />
        <TextInput 
            placeholder="enter password" 
            style={styles.input} 
            secureTextEntry 
            onChangeText={setPassword} 
            />
        <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '90%'}}>
          <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Tutorials')}>
            <Text style={styles.btntext}>Login</Text>
          </TouchableOpacity>
        
        </View>
        <View style= {{margin: 5}}>
       
        </View>
      </View>
    ); 
  }

  export default Login;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#E5E530',
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
      color: '#A930E5',
    },
  
    logintext: {
      fontSize: 30,
      justifyContent: 'center',
      margin: 10,
      textAlign: 'center',
      fontStyle: 'italic',
      fontFamily: "sans-serif-condensed",
      color: '#F28EEE',
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
      backgroundColor: '#8FB7F5',
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