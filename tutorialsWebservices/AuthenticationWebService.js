import users from '../tutorialsResources/usersdb';
import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthenticationWebService {
  login(username, password) {

    let user =  users.find(e => e.username===username);

    if(user!= undefined && user.pwd===password){
       AsyncStorage.setItem("user", JSON.stringify(username));
      return true;
    }else{ return false;}
        
  }

  logout() {
    AsyncStorage.removeItem('user');
  }


  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthenticationWebService();