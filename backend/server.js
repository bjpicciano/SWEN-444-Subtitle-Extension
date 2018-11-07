const express = require('express');
const app = express();
const fs = require("fs");

// parse const ious different custom JSON types as JSON
app.use(express.json());
app.use(express.static("client"));

// Serve all content from /video at ./video
app.use("/video", express.static("video"))


function indexForValue(data, key, value) {
    let index;
    data.forEach(function(item, i) {
        if (item[key] === value) {
            index = i;
        }
    });
    return (index !== undefined) ? index: null;
}

function getLargestIDInData(data) {
    let id = 0;
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
        const query = req.query;
        if (Object.keys(query).length > 0) {
            const key = Object.keys(query)[0];
            const value = query[key];
            const index = indexForValue(data, key, value);
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
    const newData = req.body;
    fs.readFile("data/" + filename + ".json", 'utf8', function (err, data) {
        data = JSON.parse(data);
        if (newData.id) {
            const replaceIndex = indexForValue(data, 'id', newData.id);
            if (replaceIndex === undefined) {
                res.sendStatus(400);
                return;
            }

            // Replace Data
            data[replaceIndex] = newData;

        } else {
            // Append next ID
            const newID = getLargestIDInData(data) + 1;
            newData.id = newID;
            console.log("Inserting data with new ID " + newID + " into " + filename);

            // Insert
            data.push(req.body)
        }
        // Write new data
        fs.writeFile("data/" + filename + ".json", JSON.stringify(data), 'utf8');
    });

    res.sendStatus(200);
}

function formatVTT(data){
    var vttData = "WEBVTT";
    var recentSubs = data[data.length - 1].captions;
    for(let idx = 0; idx < recentSubs.length; idx++){
        vttData += "\n\n" + recentSubs[idx].start + ".000 --> " + recentSubs[idx].end + ".000\n" + recentSubs[idx].caption;
    }
    return vttData;
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
    const data = req.body;
    fs.writeFile("data/captions.json", JSON.stringify(data), 'utf8', e => {
        if (!e) {
            res.send("200");
        } else {
            console.log(e)
        }
    });
    // update vtt file with caption data from update post
    fs.writeFile("./video/real-subs.vtt", formatVTT(data), 'utf8', function(err, data) {
        if(err) console.log(err);
        else{
            console.log("Successfully updated VTT file");
        }
    });
});

app.get('/', function(req, res) {
    res.end('Server is running! You are at /');
});

const server = app.listen(8080, function () {

  const host = server.address().address;
  const port = server.address().port;

  console.log("Universal Subtitle Extension Backend listening at http://%s:%s", host, port)

});
