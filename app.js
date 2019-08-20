const express = require('express');

const app = express();
const port = 5000;

app.get('/', function(req, res){
  res.send('first app');
});

app.listen(port, function(){
  console.log('Express listening on port', port);
});