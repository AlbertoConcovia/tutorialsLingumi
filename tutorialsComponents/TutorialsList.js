/**
 * @aconcovia
 * Tutorial List component
 * Show list of video tutorials 
 * Show a input search to the user
 * Show tags list available to select 
 * 
 *
 * @format
 * @flow strict-local
 */

import React , { useState , useEffect }  from 'react';
import { StatusBar, StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import  Video from "react-native-video";

import axios from 'axios';
import { Button, SearchBar  } from 'react-native-elements';

import Icon from 'react-native-vector-icons/Ionicons';

import SelectBox from 'react-native-multi-selectbox';
import { xorBy } from 'lodash';
import AuthenticationWebService from '../tutorialsWebservices/AuthenticationWebService';



const {
  getTopRatedForTags,
  searchForTutorials,
} = require("../tutorialsCore/TutorialService");


 
 const TutorialsList = ({ navigation }) => {
  
    //each video in FlatList
    const Item = ({ item }) => (
      <TouchableOpacity onPress={() => alert('touch the video :)')} style={{width:350,height:300,backgroundColor: 'white'}}>
         <View>
            <Text>{ item.videoTitle }</Text>
            <Text>Categories: { item.tags.toString() }</Text>
            <Text>Teacher: { item.teacherName }</Text>
         </View>
         <View >
             <Video
                 source={{uri: item.videoUrl }}
                 //poster for audioOnly=true and visualization by default
                 poster='https://cdn.shopify.com/s/files/1/2018/8867/files/play-button.png?422609932170209736'
                 controls={true}
                 audioOnly={false}
                 style={styles.video}
                 muted={false}
                 repeat={false}
                 resizeMode={"cover"}
                 rate={1.0}
                 ignoreSilentSwitch={"obey"}
                 onFullScreen={false}
             />
         </View>
     </TouchableOpacity>
    );
  
    const renderItem = ({ item }) => (
      <Item item={item} />
    );
  
    const [selectedTags, setselectedTags] = useState([])

    const [selectedTag, setSelectedTag] = useState({})
    

    const [videoList, setVideoList]  = useState([]);

    const [videoListFiltered, setVideoListFiltered]  = useState([]);

    const [uniqueTags, setUniqueTags] = useState([]);

    const [uniqueMultipleTags, setUniqueMultipleTags] = useState([]);
 
    const [words, setWords] = useState('');
 
    const logout = () => {
      AuthenticationWebService.logout();
      navigation.navigate('Login');

    }
    const onMultiChange = (selectedTags) => {
     
      return (item) => setselectedTags(xorBy(selectedTags, [item], 'id'))

    }
  

    //filter videos according tags selected
    const handleFilterByTags = () => {
        // selectedTags is array of { label, value } and I need only array of string
        let tags =  selectedTags.map(s => s.id);
        
        if(tags.length>0){
           let listVideos = videoList;
           setVideoListFiltered(getTopRatedForTags(listVideos,tags));
           setWords('');
           
        }
    }
 

    //match videos with the entered words
    const handleFilterByKeyWords = (wordstr) => {
        
        let userwords = wordstr.split(' ');
        let listVideos = videoList;
        
        setVideoListFiltered(searchForTutorials(listVideos,userwords));   

        setWords(wordstr);
    }
 
    /*call to Lingumi Service and save videos, videos to visualize 
    and unique tags useful to filter in handleFilterByTags
    */
    const uponload = async () => {
        
        const res = await axios.get("https://lingumi-take-home-test-server.herokuapp.com/videoTutorials");
        let listvideos= res.data;
        let listtags = listvideos.map(v => v.tags);
        let uniqueTags = [...new Set(listtags.map(a => a.toString()).toString().split(','))];
        
        //component SelectBox needs objects with { item: , id: }
        let uniqueMultipleTags = uniqueTags.map( t => JSON.parse( '{ "item": "'.concat(t).concat('", "id": "').concat(t).concat('" }')));

        setVideoList(listvideos);
        setVideoListFiltered(listvideos);
        setUniqueTags(uniqueTags);
        setUniqueMultipleTags(uniqueMultipleTags);
        setWords('');
        
    };
 
 
 
    useEffect( () =>{
      uponload();
    },[videoList]);
 
    return (
         <View>   
            
            <Icon
              name="log-out-outline"
              size={50}
              color="grey"
              label="Logout"
              onPress={logout}
            />
            <View>
            <SearchBar
              placeholder="Enter teacher, tittle, tags"
              onChangeText={e => handleFilterByKeyWords(e)}
              value={words}
              showLoading={true}
            />
            
                  
              
            
           </View>


            <View style={styles.separator}>     
           
              <SelectBox
                label="Get Top Rated For Tags"
                options={uniqueMultipleTags}
                selectedValues={selectedTags}
                onMultiSelect={onMultiChange()}
                onTapClose={onMultiChange()}
                isMulti
              />

              <Button style={styles.input}
                  title="Get Top Rated For Tags"
                  onPress={handleFilterByTags}
              />

          </View>
          

            <View  style={styles.separator}>  
              <Button style={styles.btntxt}
                  title="Reload complete List"
                  onPress={uponload}
                  icon={
                      <Icon
                        name="reload"
                        size={15}
                        color="grey"
                      />
                  }
              />
            
              <FlatList
                  data={videoListFiltered}
                  renderItem={renderItem}
                  keyExtractor={item => item.id}
                  numColumns={1}
                  ItemSeparatorComponent={
                    () => { return (<View style={styles.separator} />) }
                  }
              />

          </View>  
         
         </View>
        
        
    );
 
 
  };
  
  const styles = StyleSheet.create({
   
    btntxt: {
      backgroundColor: '#00FF00',
      padding: 10,
      width: '45%',
      justifyContent: 'center',
      alignItems: 'center',
    },
  
    btn: {
      backgroundColor: '#00FF00',
      padding: 10,
      width: '45%',
      justifyContent: 'center',
      alignItems: 'center',
    },

    container: {
      flex: 1,
      backgroundColor: '#E5E530',
      alignItems: 'center',
      justifyContent: 'center',
    },

    backgroundVideo: {
      height: 1000,
      position: "absolute",
      top: 0,
      left: 0,
      alignItems: "stretch",
      bottom: 0,
      right: 0
    },
    videoContainer: {
      flex: 1,
      backgroundColor: 'yellow',
    },
    video: {
      marginTop: 0,
      height: 200,
      position: "absolute",
      top: 0,
      left: 0,
      alignItems: "stretch",
      bottom: 0,
      right: 0,
      backgroundColor: 'white',
  
    },
  
    flatListContainer: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 8,
    },

    item: {
      backgroundColor: '#9e2dd6',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },

    title: {
      fontSize: 32,
    },

    input: {
      backgroundColor:'#fff',
      width:10,
      margin: 1,
      width: '90%',
      padding: 50, 
    },
  
   
  
    separator: {
     
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },

  });
  
  export default TutorialsList;
  