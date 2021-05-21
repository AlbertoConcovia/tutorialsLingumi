import axios from 'axios';
import { fetchVideoTutorialsData, API } from '../tutorialsWebservices/videoTutorialsService';
/**
 * @aconcovia
 * Unit Test for call get of Ligumi webservice using mock implementation
 * @format
 */

jest.mock('axios');
 
describe('fetchVideoTutorialsData', () => {
  //Test to retrieve the data form Lingumi webservice
  it('fetches successfully data from Lingumi API', async () => {
    const data = {};
 
    axios.get.mockImplementationOnce(() => Promise.resolve(data));
 
    await expect(fetchVideoTutorialsData('react')).resolves.toEqual(data);
 
    expect(axios.get).toHaveBeenCalledWith(
      `${API}`,
    );
  });
 
});