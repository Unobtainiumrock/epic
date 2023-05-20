const axios = require('axios');
const crypto = require('crypto');
const express = require('express');
const app = express();
const port = process.env.PORT || 80;

// Change these from static variables to work for
// various patients, especially state.
const CLIENT_ID = '7015e7d4-06ae-4e65-a40a-c07bc132b156';
const REDIRECT_URI = 'consistent-af.ngrok.io/callback';
// Change the STATE variable later, s.t. it accounts for logging in and
// out to many other users. Don't want some 
// static and globally accessible state. It would
// defeat the purpose of the line where we save state
// data to a session to later be compared during state comparions
// when you could just as well have gotten it from the 
// global static state variable.
const STATE = crypto.randomBytes(20).toString('hex');

app.listen(port, () => console.log(`Server running on port ${port}$`));

// Routes. TODO: Separate out the routes into different folders and or directories
// to keep with best practices I've learned in the past.

// Authorization Route:
app.get('/authorize', (req, res) => {
    req.session.oauth2state = STATE;

    const params = new URLSearchParams({
        response_type: 'code',
        client_id: CLIENT_ID,
        redirect_uri: REDIRECT_URI,
        state: STATE,
    });
    const authURL = `https://fhir.epic.com/interconnect-fhir-oauth/oauth2/authorize?${params}`;
    res.redirect(authURL);
});

// Callback Route:
app.get('/callback', (req, res) => {
    
    const { code, state } = req.query;

    if (state !== req.session.oauth2state) {
       return res.status(403).send('Invalid state parameter');
    }

    const params = new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: REDIRECT_URI,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
    });

    axios.post('https://fhir.epic.com/interconnect-fhir-oauth/oauth2/token', params).then(res => {
        // take access token from response and
        // save it. It will be used to make requests to
        // Epic's FHIR server.
    }).then(res => {
       const { access_token } = res.data;
       // Do stuff with token like make FHIR requests.
       // Maybe save it somewhere secure for a time?
       // Not sure what to do with respect to best security practices.
       res.send('Success! You are now authorized.');
    }).catch(err => {
        // Make a more meaningful error message here for debugging purposes.
        res.status(500).send('An error occurred while trying to get the access token.');
    })
});