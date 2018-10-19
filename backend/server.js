var express = require('express');
var app = express();
var fs = require("fs");

// parse various different custom JSON types as JSON
app.use(express.json())

function indexForValue(data, key, value) {
    var index;
    data.forEach(function(item, i) {
        if (item[key] == value) {
            index = i;
        }
    });
    return (index !== undefined) ? index: null;
}

function getLargestIDInData(data) {
    var id = 0;
    data.forEach(function(item, _) {
        if (item.id > id) {
            id = item.id;
        }
    });
    return id;
}

function getDataHandler(req, res, filename) {
    // query is optional to filter on. At most one key=value
    fs.readFile("data/" + filename + ".json", 'utf8', function (err, data) {
        data = JSON.parse(data);
        var query = req.query;
        if (Object.keys(req.query).length > 0) {
            var key = Object.keys(req.query)[0];
            var value = req.query[key];
            var index = indexForValue(data, key, value);
            if (index == null) {
                res.sendStatus(404);
				return;
            }
            data = data[index];
        }
        res.json( data );
    });
}

function updateDataHandler(req, res, filename) {
    // Verify contents
    if ( req.body === undefined) {
        res.sendStatus(400);
        return;
    }
    var newData = req.body;
    fs.readFile("data/" + filename + ".json", 'utf8', function (err, data) {
        data = JSON.parse(data);
        if (newData.id) {
            var replaceIndex = indexForValue(data, 'id', newData.id);
            if (replaceIndex === undefined) {
                res.sendStatus(400);
                return;
            }

            // Replace Data
            data[replaceIndex] = newData;

        } else {
            // Append next ID
            var newID = getLargestIDInData(data) + 1;
            newData.id = newID;
            console.log("Inserting data with new ID " + newID + " into " + filename);

            // Insert
            data.push(req.body)
        }
        // Write new data
        fs.writeFile("data/" + filename + ".json", JSON.stringify(data), 'utf8');        
    });

    res.sendStatus(200);
    return;
}

app.get('/getProfiles/:query?', function (req, res) {
   getDataHandler(req, res, 'profiles');
});

app.get('/getCaptions/:query?', function (req, res) {
   getDataHandler(req, res, 'captions');
});

app.post('/updateProfile/:query?', function(req, res) {
	updateDataHandler(req, res, 'profiles');
});

app.post('/updateCaption/:query?', function(req, res) {
	updateDataHandler(req, res, 'captions');
});


app.get('/', function(req, res) {
    res.end('Server is running! You are at /');
})

var server = app.listen(8080, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Universal Subtitle Extension Backend listening at http://%s:%s", host, port)

})
