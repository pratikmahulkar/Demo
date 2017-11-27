var nodecsv = require('node-csv').createParser();
var csvtojson = require('csvtojson');
var http = require('https');
var fs = require('fs');
var unzip = require("unzip");
var test = false;
var express = require('express');
var app = express();
app.listen(process.env.PORT || 5000, function () { console.log('Example app listening on port 3000!') });

app.get('/', function (req, res) {
    res.sendfile('./index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

app.get('/app.js', function (req, res) {
    res.sendfile('./app.js'); // load the single view file (angular will handle the page changes on the front-end)
});
app.get('/main.css', function (req, res) {
    res.sendfile('./main.css'); // load the single view file (angular will handle the page changes on the front-end)
});

app.get('/angular.js', function (req, res) {
    res.sendfile('./angular.js'); // load the single view file (angular will handle the page changes on the front-end)
});
app.get('/angular-touch.js', function (req, res) {
    res.sendfile('./angular-touch.js'); // load the single view file (angular will handle the page changes on the front-end)
});
app.get('/angular-animate.js', function (req, res) {
    res.sendfile('./angular-animate.js'); // load the single view file (angular will handle the page changes on the front-end)
});
app.get('/csv.js', function (req, res) {
    res.sendfile('./csv.js'); // load the single view file (angular will handle the page changes on the front-end)
});
app.get('/pdfmake.js', function (req, res) {
    res.sendfile('./pdfmake.js'); // load the single view file (angular will handle the page changes on the front-end)
});

app.get('/vfs_fonts.js', function (req, res) {
    res.sendfile('./vfs_fonts.js'); // load the single view file (angular will handle the page changes on the front-end)
});
app.get('/ui-grid.js', function (req, res) {
    res.sendfile('./ui-grid.js'); // load the single view file (angular will handle the page changes on the front-end)
});
app.get('/ui-grid.css', function (req, res) {
    res.sendfile('./ui-grid.css'); // load the single view file (angular will handle the page changes on the front-end)
});
app.get('/ui-grid.woff', function (req, res) {
    res.sendfile('./ui-grid.woff'); // load the single view file (angular will handle the page changes on the front-end)
});
var getFormattedDate = function (selectedDate) {
    var formattedDate = "";
    var months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    formattedDate = selectedDate.getDate() < 10 ? "0" + selectedDate.getDate() : selectedDate.getDate();
    formattedDate += months[selectedDate.getMonth()];
    formattedDate += selectedDate.getFullYear();
    return formattedDate;
};
var prepareURL = function (selectedDate) {
    var formattedDate = "";
    var months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    formattedDate = selectedDate.getDate() < 10 ? "0" + selectedDate.getDate() : selectedDate.getDate();
    formattedDate += months[selectedDate.getMonth()];
    formattedDate += selectedDate.getFullYear();
    return "https://www.nseindia.com/content/historical/EQUITIES/" + selectedDate.getFullYear() + "/" + months[selectedDate.getMonth()] + "/cm" + formattedDate + "bhav.csv.zip";
};

app.get('/api/:date', function 
(req, res) {
    var date = req.params['date'];
    console.log(req.params);
    var url = prepareURL(new Date(date));
    var header = null;
    var rows = [];
    var formattedDate = getFormattedDate(new Date(date));

    if (test) {
        fs.createReadStream(formattedDate + '.zip')
            .pipe(unzip.Parse())
            .on('entry', function (entry) {
                var fileName = entry.path;
                var type = entry.type; // 'Directory' or 'File'
                var size = entry.size;
                entry.pipe(fs.createWriteStream(formattedDate + '.csv'));
                entry.autodrain();
            })
            .on('close', function () {
                csvtojson()
                .fromFile(formattedDate + ".csv")
                .on('json', function (data) {
                    rows.push(data);
                })
                .on('done', function () {
                    res.json(rows);
                    console.log('end');
                });
            });
    } else {
        var file = fs.createWriteStream(formattedDate + ".zip");
        var request = http.request(url);
        request.setHeader('Content-Type', 'text/zip');
        request.setHeader('User-Agent', 'Mozilla/5.0 (X11; Linux x86_64; rv:12.0) Gecko/20100101 Firefox/12.0');
        request.end();
        request.once('response', function (response) {
            response.pipe(file).on('close', function () {
                fs.createReadStream(formattedDate + '.zip')
            .pipe(unzip.Parse())
            .on('entry', function (entry) {
                var fileName = entry.path;
                var type = entry.type; // 'Directory' or 'File'
                var size = entry.size;
                entry.pipe(fs.createWriteStream(formattedDate + '.csv'));
                entry.autodrain();
            })
            .on('close', function () {
                csvtojson()
                .fromFile(formattedDate + ".csv")
                .on('json', function (data) {
                    rows.push(data);
                })
                .on('done', function () {
                    res.json(rows);
                    console.log('end');
                });
            });
            });
        });
    }

});