import Clarifai from 'clarifai';
require('dotenv').config()

const app = new Clarifai.App({
  apiKey: process.env.REACT_APP_API_KEY
});

const API_MODEL_ID = 'a403429f2ddf4b49b307e318f00e528b';

const predict = async (url) => {
  try {
    const response = await app.models.predict(API_MODEL_ID, url);
    console.log('[*] Predict')
    return response;
  } catch (error) {
    console.log('[!] API error.', error);
  }
}

export default predict;