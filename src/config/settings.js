export default {
  HOST_URL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    language: 1
  },
  headersImage: {
    'Content-Type': 'multipart/form-data',
    Accept: 'application/json',
  },
};

