import axios from 'axios';
import { ip } from './ip';

export const instance = axios.create({
    baseURL: `${ip}:7000`,
    timeout: 5000,
    headers: {'X-Custom-Header': 'foobar'}
  });

  export interface IMassage {
    msg: string; 
    username: string;
}