/**
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
import { StatusBar, StyleSheet, Text, View, FlatList, TouchableOpacity,TextInput} from 'react-native';
import  Video from "react-native-video";
import SelectMultiple from 'react-native-select-multiple'
import axios from 'axios';
import { Button} from 'react-native-elements';


const {
  getTopRatedForTags,
  searchForTutorials,
} = require("../tutorialsCore/TutorialService");


 
 const TutorialsList = () => {
  
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
  
    const [selectedTags, setSelectedTags] = useState([]);
 
    const [videoList, setVideoList]  = useState([]);

    const [videoListFiltered, setVideoListFiltered]  = useState([]);

    const [uniqueTags, setUniqueTags] = useState([]);
 
    const [words, setWords] = useState('');
 
    
    const onSelectionsChange = (selectedTags) => {
   
     setSelectedTags(selectedTags);
    }

    //filter videos according tags selected
    const handleFilterByTags = () => {
        // selectedTags is array of { label, value } and I need only array of string
        let tags =  selectedTags.map(s => s.value);
        if(tags.length>0){
           let listVideos = videoList;
           setVideoListFiltered(getTopRatedForTags(listVideos,tags));
           setWords('');
           
        }
    }
 

    //match videos with the entered words
    const handleFilterByKeyWords = () => {
        let userwords = words.split(' ');
        let listVideos = videoList;
        setVideoListFiltered(searchForTutorials(listVideos,userwords));   
        setSelectedTags([]);
    }
 
    /*call to Lingumi Service and save videos, videos to visualize 
    and unique tags useful to filter in handleFilterByTags
    */
    const uponload = async () => {
        
        const res = await axios.get("https://lingumi-take-home-test-server.herokuapp.com/videoTutorials");
        let listvideos= res.data;
        let listtags = listvideos.map(v => v.tags);
        let uniqueTags = [...new Set(listtags.map(a => a.toString()).toString().split(','))];
        setVideoList(listvideos);
        setVideoListFiltered(listvideos);
        setUniqueTags(uniqueTags);
        setWords('');
        setSelectedTags([]);
    };
 
 
 
    useEffect( () =>{
      uponload();
    },[]);
 
    return (
         <View>
            
           <View>
             <TextInput style={{ height: 80,
                         borderColor: 'gray',
                         borderWidth: 1,
                         
                         }}
                     defaultValue={words}
                     onChangeText={setWords}
                     placeholder="Enter key words to filter: teacher, tittle, tags" 
                     
             />  
             <Button style={{ height: 10,with:5,
                         backgroundColor: 'grey',
                         borderWidth: 1,
                        
                         }}
                 title="Search Tutorials"
                 onPress={handleFilterByKeyWords}
             />
 
           </View>
           <View>     
             <SelectMultiple
                 items={uniqueTags}
                 selectedItems={selectedTags}
                 onSelectionsChange={onSelectionsChange} 
                 style={{ height: 200,
                     borderColor: 'gray',
                     borderWidth: 1,
                     
                     }}            
                 />
       
            <Button style={{ height: 10,with:5,
                         backgroundColor: 'grey',
                         borderWidth: 1,
                        
                         }}
                 title="Get Top Rated For Tags"
                 onPress={handleFilterByTags}
             />
          </View>
           <View>
            <Button style={styles.btntext}
                 title="Refresh"
                 type="clear"
                 onPress={uponload}
            />

             <FlatList
                 data={videoListFiltered}
                 renderItem={renderItem}
                 keyExtractor={item => item.id}
                 numColumns={1}
                 ItemSeparatorComponent={() => { return (<View style={styles.separator} />) }}
                 
             />

        </View>  
         </View>
        
        
 
    );
  };
  
  const styles = StyleSheet.create({
   
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

    container: {
      flex: 1,
      backgroundColor: '#9e2dd6',
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
  });
  
  export default TutorialsList;
  