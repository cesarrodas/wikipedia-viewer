var express = require('express');
var favicon = require('serve-favicon');
var path = require('path');

var app = express();
const PORT = process.env.PORT || 4015;

app.use(favicon(path.join(__dirname, 'public', 'assets', 'world_icon.ico')));
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, function(){
  console.log('Listening on port ' + PORT);
});
