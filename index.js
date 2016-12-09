const express = require('express');
const app = express();
const request = require('request');

// Set up bodyParser.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.post('/new-app', (req, res, next) => {
  if (!req.body.githubURL || !req.body.subdomain || !req.body.userId) {
    console.log('POST request is missing something important');
    console.log('req.body', req.body);
    return res.status(400).end();
  }

  console.log('got data in /new-app');
  console.log('req.body.githubURL', req.body.githubURL);
  console.log('req.body.subdomain', req.body.subdomain);
  console.log('req.body.userId', req.body.userId);

  const url = 'http://bart.usb.cs.purdue.edu:3000/new-app';

  request.post(url, {
    form: {
      githubURL: req.body.githubURL,
      subdomain: req.body.subdomain,
      userId: req.body.userId
    }
  }, (error, response, body) => {
    if (!error) {
      console.log('response body', body);
      res.status(200).end();
    } else {
      console.log('Error!', error);
      res.status(500).end();
    }
  });
});

app.listen(8080, () => {
  console.log("I'm alive!");
});
