/* eslint-disable */
import axios from 'axios';

export default (): any => {
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache'
  };
  return axios.create({
    baseURL: 'https://picsum.photos/v2',
    withCredentials: false,
    headers: headers
  });
}
