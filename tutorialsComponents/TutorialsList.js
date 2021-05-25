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
import { ActivityIndicator, StatusBar, StyleSheet, View, FlatList, Text} from 'react-native';


import axios from 'axios';
import { Button, SearchBar  } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

import SelectBox from 'react-native-multi-selectbox'
import { xorBy } from 'lodash';

import AuthenticationWebService from '../tutorialsWebservices/AuthenticationWebService';




const {
  getTopRatedForTags,
  searchForTutorials,
} = require("../tutorialsCore/TutorialService");


 
const {
  Item,
  renderItem
} = require("../tutorialsCommons/tutorialsCommons");

const TutorialsList = ({ navigation }) => {
  

    const [videoList, setVideoList]  = useState([]);

    const [videoListFiltered, setVideoListFiltered]  = useState([]);

    const [uniqueMultipleTags, setUniqueMultipleTags] = useState([]);
 
    const [words, setWords] = useState('');

    const [loading, setLoading] = useState(true);
 
    const [selectedTags, setselectedTags] = useState([])


    /*call to Lingumi Service and save videos, videos to visualize 
    and unique tags useful to filter in handleFilterByTags
    */
    const uponload = async () => {
        
      setLoading(true);
      setselectedTags([]);
      const res = await axios.get("https://lingumi-take-home-test-server.herokuapp.com/videoTutorials");
      let listvideos= res.data;
      let listtags = listvideos.map(v => v.tags);
      let uniqueTags = [...new Set(listtags.map(a => a.toString()).toString().split(','))];
      
      //component SelectBox needs objects with { item: , id: }
      let taglist = uniqueTags.map( t => JSON.parse( '{ "item": "'.concat(t).concat('", "id": "').concat(t).concat('" }')));

      setVideoList(listvideos);
      setVideoListFiltered(listvideos);
      
      setUniqueMultipleTags(taglist);
      setWords('');
      setLoading(false);
      
    };

    //filter videos according tags selected
    const handleFilterByTags = () => {
            
      // selectedTags is array of { label, value } and I need only array of string
      setLoading(true);
      let tags =  selectedTags.map(s => s.id);
      
      if(tags.length>0){
        let listVideos = videoList;
        setVideoListFiltered(getTopRatedForTags(listVideos,tags));
        setWords('');
        
      }
      setLoading(false);
    }


    //match videos with the entered words
    const handleFilterByKeyWords = (wordstr) => {
     
      let userwords = wordstr.split(' ');
      let listVideos = videoList;
      setselectedTags([]);
      setLoading(true);
      setVideoListFiltered(searchForTutorials(listVideos,userwords));   
      setWords(wordstr);
      setLoading(false);
      
    }

    const onMultiChange = () => {
      return (item) => setselectedTags(xorBy(selectedTags, [item], 'id'))
    }      

    const logout = () => {
      AuthenticationWebService.logout();
      navigation.navigate('Login');
  
  }

    useEffect( () =>{
      uponload();      
    
    },[]);
 
    return (
         <View>  
                     
            <Icon name="log-out-outline" size={50} color="grey" label="Logout" onPress={logout} />
            
            <View>
              <SearchBar placeholder="Enter teacher, tittle, tags"
                         onChangeText={e => handleFilterByKeyWords(e)}
                         value={words}
                         lightTheme={true}
                         showLoading={true}/>
            </View>


            <View style={styles.separator}>     
              <Text style={{ fontSize: 20, paddingBottom: 10 }}>Top Rated</Text>
              <SelectBox
                label="Select multiple"
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

              <Button style={styles.btntxt} title="Reload complete List"  onPress={uponload}
                      icon={<Icon name="reload" size={15} color="grey" />} />
            
             
              {loading ? 
                <ActivityIndicator size="large" color="#A930E5" />
               : 
              
                <FlatList
                    data={videoListFiltered}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    numColumns={1}
                    ItemSeparatorComponent={
                      () => { return (<View style={styles.separator} />) }
                    }
                />
              }

            </View>  

         </View>
        
        
    );
 
        
  };
  
const styles = StyleSheet.create({
  
  btntxt: {
    color: '#9e2dd6',
    padding: 10,
    width: '45%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  btn: {
    backgroundColor: '#9e2dd6',
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
    backgroundColor:'#9e2dd6',
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
  