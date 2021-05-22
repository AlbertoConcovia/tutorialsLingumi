import axios from 'axios';

export const API = 'https://lingumitake-home-test-server.herokuapp.com/videoTutorials';
 
export const fetchVideoTutorialsData = async query => {
  const url = `${API}`;
  return await axios.get(url);
};
 
