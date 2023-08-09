//fetchData.js
import axios from 'axios';
import wrapPromise from './wrapPromise';

/**
* 用wrapPromise函数包装Axios请求
* @param {string} 要获取的URL
* @returns {Promise} 包装的promise
*/
function fetchData(url) {
     const promise = axios.get(url).then(({data}) => data);

     return wrapPromise(promise);
}

export default fetchData;
