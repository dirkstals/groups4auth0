const express = require('express');
const metadata = require('../webtask.json');

module.exports = function() {

  const app = express();

  app.all('*', function(req, res){
    if(req.path === '/meta'){
      res.status(200).send({
        webtaskContext: req.webtaskContext || {},
        metadata
      });
    } else {
      res.redirect(process.env.CDN);
    };
  });
  
  return app;
};
