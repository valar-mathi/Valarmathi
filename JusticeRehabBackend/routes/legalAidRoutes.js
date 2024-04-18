const express = require('express');
const axios = require('axios');
const router = express.Router();

const dialogflowAPI = axios.create({
    baseURL: 'https://api.dialogflow.com/v1/query?v=20150910',
    headers: {
        'Authorization': `Bearer ${process.env.DIALOGFLOW_TOKEN}`,  // Access the token securely
        'Content-Type': 'application/json'
    }
});


// POST route to handle chat messages using Dialogflow
router.post('/chatbot', async (req, res) => {
    const { message } = req.body;

    try {
        const dialogflowResponse = await dialogflowAPI.post('/', {
            lang: 'en',
            sessionId: '123456', // Use a unique session ID for each user session
            query: message
        });

        if (dialogflowResponse.data && dialogflowResponse.data.result) {
            res.json({ reply: dialogflowResponse.data.result.fulfillment.speech });
        } else {
            throw new Error('No response from Dialogflow');
        }
    } catch (error) {
        console.error('Error communicating with Dialogflow:', error);
        res.status(500).send('Failed to communicate with Dialogflow');
    }
});

module.exports = router;
