/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React , { useState ,useRef}  from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  FlatList,
  TouchableOpacity
} from 'react-native';
import  Video from "react-native-video";

import { Colors} from 'react-native/Libraries/NewAppScreen';
const videoList = require('./tutorialsResources/case001.json');

const Section = ({children, title}): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};



const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const Item = ({ item }) => (
    <TouchableOpacity onPress={() => alert('touch the video :)')} style={{width:350,height:300,backgroundColor: 'white'}}>
      <View>
      <Text>{ item.videoTitle }</Text>
          <Text>Categories: { item.tags }</Text>
      </View>
      <View >
         
          <Video
              source={{uri: item.videoUrl }}
              poster="https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/English_Cocker_Spaniel_4.jpg/800px-English_Cocker_Spaniel_4.jpg"
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

  return (

          <FlatList
          data={videoList}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          numColumns={1}
          ItemSeparatorComponent={() => { return (<View style={styles.separator} />) }}
          >


          </FlatList>


  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
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
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default App;
