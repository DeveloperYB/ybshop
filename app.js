const express = require('express');

const admin = require('./routes/admin');

const app = express();
const port = 5000;

app.get('/', function(req, res){
  res.send('first app !!');
});

app.use('/admin', admin);

app.listen(port, function(){
  console.log('Express listening on port', port);
});
