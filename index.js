var http = require('http');
var net = require('net');
var fs = require('fs');
var uuid = require('uuid');

var server = http.createServer(function(req, res) {
  if (req.url == "/text.json") {
    fs.readFile('./data/text.json', function (err, data) {
      if (err) throw err;
      var parsed = data.toString();

      res.writeHead(200, {
        'Content-Type': 'text/plain'
      });
      res.write(parsed);
      return res.end();
    });
  }
  else if (req.method === 'POST') {
    //Some of this code comes from mscdex at stackoverflow.com/questions/24356481/is-there-a-way-to-synchronously-read-the-contents-of-http-request-body-in-node-j
    var buffer = "";
    req.on('data', function (data) {
      buffer += data;
    }).on('end', function() {
      var result = JSON.parse(buffer.toString());
      fs.writeFile("./data/" + uuid.v1() + ".json", buffer.toString(), function (err) {
        if (err) throw err;
      });
      console.log(result);
      res.writeHead(200, {
        'Content-Type': 'text/plain'
      });
      res.write(result.noteBody);
      return res.end();
    });
    return;
  }
  else {
    res.writeHead(404, {
      'Content-Type': 'text/plain'
    });
    res.write('page not found');
    console.log('page not found');
    return res.end();
  }
});

server.listen(3000, function() {
  console.log('server up');
});