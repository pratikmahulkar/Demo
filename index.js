var express = require('express');
var app = express();
app.listen(process.env.PORT || 5000, function () { console.log('Example app listening on port 3000!') });

app.get('/', function (req, res) {
    res.send('hello' + req); // load the single view file (angular will handle the page changes on the front-end)
});