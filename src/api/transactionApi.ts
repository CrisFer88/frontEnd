import axios from 'axios';

const transactionApi = axios.create({
  baseURL: process.env.REACT_APP_BASIC_URL as string
});

// TODO: configurar interceptores

transactionApi.interceptors.request.use(
  (config: any ) => {
    config.headers = {
      ...config.headers,
      'x-token': localStorage.getItem('token')
    }
      return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default transactionApi;