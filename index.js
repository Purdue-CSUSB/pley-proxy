const express = require('express');
const app = express();
const request = require('request');

app.post('/new-app', (req, res, next) => {
  if (!req.body.githubURL || !req.body.subdomain || !req.body.userId) {
    res.status(400).end();
  }

  const url = 'bart.usb.cs.purdue.edu:3000';

  request.post(url, {
    form: {
      githubURL: req.body.githubURL,
      subdomain: req.body.subdomain,
      userId: req.body.userId
    }
  }, (error, response, body) => {
    if (!error) {
      res.status(200).end();
    } else {
      res.status(500).end();
    }
  });
});

app.listen(8080, () => {
  console.log("I'm alive!");
});
