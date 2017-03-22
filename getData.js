'use strict';

const { get } = require('http');
// const userInput = process.argv[2];

module.exports = url => {
  return new Promise((resolve, reject) => {
    get(url, (res) => {
      let error;
      if (res.statusCode !== 200) {
        error = new Error(`Request Failed, Status code: ${res.statusCode}`)
      } else if(!/^text\/javascript/.test(res.headers['content-type'])) {
        error = new Error(`Invalid content-type\nExpected javascript but received ${res.headers['content-type']}`)
      }

      if (error) {
        // console.log('Error', error.message);
        res.resume();
        reject(error);
      }

      let fullData = '';
      res.on('error', error => console.log(`error:`, error.message))
      res.on('data', partialData => fullData += partialData);
      res.on('end', () => resolve(JSON.parse(fullData)));
    });
  });
};
