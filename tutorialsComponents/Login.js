import React , { useState }  from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import AuthenticationWebService from '../tutorialsWebservices/AuthenticationWebService';

//Function to input credentials 
// if user is ok, it redirects to tutorialsList that works a home after login
// else it shows a message 'Bad Credentials'

const Login = ({ navigation }) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errormessage, setErrorMessage] = useState('');

    //submit the data and call the api to authenticate user and password
    const submitLogin = () => {
      let loginok = AuthenticationWebService.login(username,password);
      
      if(loginok){
        setErrorMessage('') 
       
        navigation.navigate('Tutorials');
      }else{
        setErrorMessage('Bad Credentials')
      }
    }


    return (

      <View style={styles.container}>
        <StatusBar  backgroundColor="#03070E" barStyle="light-content"/>
        
        <Text style={styles.welcome}>Welcome to Lingumi Tutorials</Text>
        <Text style={styles.logintext}>Please Login to watch your videos!</Text>

        <Text> {errormessage} </Text>
        <Input placeholder='enter email'
               leftIcon={ <Icon name='user' size={15} color='grey' />}
               style={styles.input}
               onChangeText={setUsername} />

        <Input placeholder='enter password'
               leftIcon={ <Icon name='lock' size={15} color='grey' />}
               style={styles.input}
               secureTextEntry={true}
               onChangeText={setPassword} />

      
        <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '90%'}}>
          <TouchableOpacity style={styles.btn} onPress={submitLogin}>
            <Text style={styles.btntext}>Login</Text>
          </TouchableOpacity>
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