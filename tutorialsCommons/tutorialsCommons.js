import React  from 'react';
import { Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import  Video from "react-native-video";

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

const styles = StyleSheet.create({
  
   
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
  
    }
  
  });
//visualizables to test and app
module.exports = {
    Item,
    renderItem
};