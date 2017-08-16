const router = require('express').Router();
const request = require('request'); 

let api = ['mailGun', 'spark', 'sendGrid'];
let mail = 2;

let wrapper = {
  mailGun: (queryObj) => {
    return new Promise(function(resolve, reject) {

        let requestString = `https://api:key-c17fee24c910cdb22a62a2a6939137fa@api.mailgun.net/v3/sandbox7d375c036ed04f0489fd6673d99f2595.mailgun.org/messages`;

        request.post(requestString, {form: queryObj}, function(error, response) {
          if (error) {
            console.log(error);
            reject(error);
          } else {
            if (response.statusCode !== 200 || response.statusCode !== '200') {
              reject(response.body);
            } else {
              resolve(response.body);
            }

          }
        });
      });
  },
  sendGrid: (queryObj) => {
    let user ='wdku5791';
    let key = 'password10';
    let {from, to, subject, text} = queryObj;

    return new Promise(function(resolve, reject) {
      let requestString = `https://api.sendgrid.com/api/mail.send.json?api_user=${user}&api_key=${key}&to=${to}&from=${from}&text=${text}&subject=${subject}`
        request.post(requestString, function(error, response) {

          if (error) {
            console.log(error);
            reject(error);
          } else {
            if (response.statusCode === 200 || response.statusCode === '200') {
              resolve(response.body);
            } else {
              reject(response.body);
            }

          }
        });
      });
  },

  spark: (queryObj) => {
    let {from, to, subject, text} = queryObj;
    
    let options = {
      url: "https://api.sparkpost.com/api/v1/transmissions",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "6e40c23e10a391d5d3f36d9aad898b5ea0bf92c8",
      },
      "json": {
        "options": {
          "sandbox": true,
        },
        "content": {
          "from": 'sandbox@sparkpostbox.com', //insert domain name here.
          "subject": subject,
          "text": text,
        },
        "recipients": [{address: to}]
      }
    };

    return new Promise(function(resolve, reject) {
        request.post(options, function(error, response) {
          if (error) {
            console.log(error);
            reject(error);
          } else {
            if (response.statusCode !== 200 || response.statusCode !== '200') {
              reject(response.body);
            } else {
              resolve(response.body);
            }

          }
        });
      });
  }
}

router.post('/', (req, res) => {
  let {from, to, subject, text} = req.query;

  if (!to || !subject || !text) {
    res.status(400).send('please send a complete email')
  } else {

    wrapper[api[mail]](req.query)
    .then((result) => {
      res.status(201).send('message sent');
    })
    .catch((error) => {
      
      if (mail >= api.length-1) {
        mail = 0;
      } else {
        mail++;
      }
      res.status(400).send(error);
    })
  }
});

module.exports = router;
