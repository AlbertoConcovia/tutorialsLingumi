import AuthenticationWebService from '../tutorialsWebservices/AuthenticationWebService';

const logout = () => {
    AuthenticationWebService.logout();
    navigation.navigate('Login');

}

//visualizables to the app
module.exports = {
    logout
    
};