/**
 * @aconcovia
 * Bussiness logic for tutorialsLingumi functionalities
 * 
 * @format
 */
const getAll = (videos) => {
    if (videos === undefined) throw new Error("videos is required"); 
    return videos;
};


const getTopRatedForTags = (videos,tagsList) => {
    if (videos === undefined) throw new Error("videos is required");
    let videosobj = videos;
    //filter videos with some tag in tagsList and trunk the result in 20 elements 
    return  videosobj.filter( v => hasTag(v,tagsList)).slice(0, 20);
};

const searchForTutorials = (videos,wordsList) => {
    if (videos === undefined) throw new Error("videos is required");
    // Your code here!
    let videosobj = videos;
    //filter videos that match with the words in wordsList: includes title,teacher and tags
    return  videosobj.filter( v => matcher(v,wordsList));
};


//internal functions 

/*BEGIN - UTIL functions to find tag*/
const checkTag = (e, tagstr) => {
    if(tagstr!==undefined){
        return e.toUpperCase() ===tagstr.toUpperCase();
    }else{ return false;}
    
 };

const checkTagsList = (w, tagsList) => {
    
    let found = false;
    found = tagsList.find( e => e.toUpperCase()===w.toUpperCase());
    if (found===undefined) {
        found= false;
    }else{
        found =true;
    }
    return found;
};
 
const hasTag = (el,tags) => {
     let found = false;
     let size = el.tags.length;
     let currenttags = Object.values(el.tags);
     let i =0;
    
     //loop until finding a matcher tag or end of array
     while(!found && i<size){
         let value = currenttags.find( e => checkTag(e,tags[i]));
         if (value!==undefined){
             found=true;
         }
         i++;
     }
    
     return found;
     
 };
/*END - UTIL functions to find tag*/


/*BEGIN - UTIL functions to find matches with user terms*/
const checkTitle = (e,titlestr) => {
    return titlestr.toUpperCase().includes(e.toUpperCase());
};

const checkTeacherName = (e,teacherStr) => {
    return teacherStr.toUpperCase().includes(e.toUpperCase());
};

const matcher = (el,words) => {
    let found = false;
    let size = words.length;
    let i =0;
    let titlestr = el.videoTitle;
    let teacherstr = el.teacherName;
    let tags =el.tags;
   
    //loop until finding a matcher a word with the title or end of array
    while(!found && i<size){
        found = words.find(w => checkTitle(w,titlestr) || checkTeacherName(w,teacherstr) || checkTagsList(w,tags));
        i++;
    }
    if (found===undefined) {
        found= false;
    }else{
        found =true;
    }
    return found ;
    
};

/*END - UTIL functions to find matches with user terms*/


//visualizables to test and app
module.exports = {
    getAll,
    getTopRatedForTags,
    searchForTutorials,
};


