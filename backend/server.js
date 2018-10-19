var express = require('express');
var app = express();
var fs = require("fs");

function searchInData(data, key, value) {
    var items = data.filter(function(item) {
        return item[key] == value;
    });
    return items.length > 0 ? items[0] : null;
}

function dataHandler(req, res, filename) {
    fs.readFile("data/" + filename + ".json", 'utf8', function (err, data) {
        data = JSON.parse(data);
        var query = req.query;
        if (Object.keys(req.query).length > 0) {
            var key = Object.keys(req.query)[0];
            var value = req.query[key];
            var searchResult = searchInData(data, key, value);
            if (searchResult == null) {
                res.sendStatus(404);
				return;
            }
            data = searchResult;
        }
        res.json( data );
    });
}

app.get('/getProfiles/:query?', function (req, res) {
   dataHandler(req, res, 'profiles');
});

app.get('/getCaptions/:query?', function (req, res) {
   dataHandler(req, res, 'captions');
});

app.get('/', function(req, res) {
    res.end('Server is running! You are at /');
})

var server = app.listen(8080, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Universal Subtitle Extension Backend listening at http://%s:%s", host, port)

})
