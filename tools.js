//var csv = require('node-csv').createParser();
var csvtojson = require('csvtojson');
//var csv_str = "1,2,3\n4,5,6";

//csv.parse(csv_str, function (err, data) {

//    console.log(data); //Outputs: [[1,2,3],[4,5,6]]

//});

// or

//csv.parseFile('14NOV2017.csv', function (err, data) {
//    data.forEach(function (row, index) {
//        if (index == 0) {
//        } else {
//        }
//        console.log(row + "-" + index);
//    });
//});

var csvFilePath = '14NOV2017.csv';

csvtojson()
.fromFile(csvFilePath)
.on('json', function (data) {
    console.log(data);
})
.on('done', function () {
    console.log('end')
});