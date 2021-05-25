# lingumitutorials
@Author: Alberto Concovia Email: concovia@gmail.com


<h2>About</h2>
This is a solution for Lingumi Take Home Task using React Native

This application provides a simple login. The users and passwords are available in 
/tutorialsResources/usersdb.json

After login succesful, the home is a page with a complete list of videos by default. 
Also there is an image to logout application

About searches:
a) by default it shows the complete list retrieved after call the Lingumi Webservice
b) The user can use the search bar to input words or terms and retrieve the list
c) The user can select one or more tags to filter and retrieve top 20 videos that match with the tags 
  and then press the button Get Top Rated For Tags
d) The user can reload the complete list using the button Reload Complete List



<h2>Technologies and Modules</h2>

    react-native-cli
    hooks

    @react-navigation/native
    @react-navigation/stack
    @react-native-async-storage/async-storage

    react-native-vector-icons
    react-native-elements
    react-native-multi-selectbox
    react-native-video
    
    axios
   

<h2>Project structure</h2>
    tutorialsCommons: utils js to share in all project
    tutorialsComponents: main pages/components 
    tutorialsCore: bussines logic
    tutorialsResources: resources. In this case I use a simple .json to retrieve users data
    tutorialsWebservices: integration with external apis.

<h2>Pre-conditions/Assumptions</h2>
 Search operations work are independent each other.

<h2>Unit Test</h2>
Unit tests are  in __tests__ folder using different cases for:
* Bussiness-test.js
  To test bussiness functionalities: Upon load, getTopRatedTutorialsForTags and searchForTutorials

<h2>Integration Test</h2>

* rest calls: call API https://lingumitake-home-test-server.herokuapp.com/videoTutorials

<h2>Follow these steps to install and run the application</h2>

clone the project from https://github.com/AlbertoConcovia/tutorialsLingumi.git

run npm install

configure a emulator for android where it will be installed the app

run npx react-native run-android






