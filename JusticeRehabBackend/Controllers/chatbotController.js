const { sendToDialogflow } = require('../utils/dialogflow');

exports.handleMessage = async (req, res) => {
  const { message, sessionId } = req.body;
  try {
    const dialogflowResponse = await sendToDialogflow(message, sessionId);
    res.json(dialogflowResponse);
  } catch (error) {
    console.error('Error handling message:', error);
    res.status(500).json({ error: 'Error processing your message' });
  }
};
