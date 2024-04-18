const { google } = require('google-auth-library');
const axios = require('axios');

const dialogflowAPI = axios.create({
  baseURL: 'https://api.dialogflow.com/v1/query?v=20150910',
});

const getAccessToken = async () => {
  try {
    const key = require('../path/to/your-service-account-file.json');
    const client = new google.auth.JWT({
      email: key.client_email,
      key: key.private_key,
      scopes: ['https://www.googleapis.com/auth/dialogflow'],
    });

    const accessToken = await client.getAccessToken();
    return accessToken.token;
  } catch (error) {
    console.error('Error obtaining access token:', error);
    throw new Error('Failed to obtain access token');
  }
};

exports.sendToDialogflow = async (message, sessionId) => {
  try {
    const token = await getAccessToken();
    const response = await dialogflowAPI.post('/', {
      query: message,
      lang: 'en',
      sessionId: sessionId
    }, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('Dialogflow API error:', error);
    throw new Error('Failed to send message to Dialogflow');
  }
};
