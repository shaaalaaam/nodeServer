const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

// Endpoint to handle slash command requests
app.post('/stockbot', async (req, res) => {
    const { text } = req.body;

    // Validate and extract stockName and targetCurrency
    const [stockName, targetCurrency] = text.split(' ');

    if (!stockName || !targetCurrency) {
        return res.status(400).json({ error: 'Missing stockName or targetCurrency' });
    }

    // Create a payload to send to the API
    const payload = {
        sn: stockName,
        tc: targetCurrency
    };

    try {
        // Send the payload to the API and get the response
        const response = await axios.post('https://test-task-8.blitzi.co/blitz57fd8bc452fe45b59ae91841b883a538', payload);
        console.log(response);
        // Process the API response as needed
        // ...

        // Create a response payload to send back to Slack
        const slackResponse = {
            response_type: 'in_channel',
            text: `Stock Name: ${stockName}\nTarget Currency: ${targetCurrency}\nAPI Response: ${response.data}`,
        };

        // Send the response back to Slack
        res.json(slackResponse);
        // res.response.data;
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
});

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
