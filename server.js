var http = require('http');
var fs   = require('fs');
var url  = require('url');
var JSON = require('json');

http.createServer( function (req, res) {
    var pathname = url.parse(req.url).pathname;
    if (pathname == 'data') {
        var t     = new Date();
        var entry = {ts: x, data: req.data};
        fs.appendFile('data.json', JSON.stringify(entry));
        console.log("Recorded entry to data.json: " + JSON.stringify(entry));
        res.writeHead(200);
    } else {
        console.log("Serve file " + pathname);
        fs.readFile(pathname.substr(1), function (err,data) {
            if (err) {
                console.log(err);
                res.writeHead(404,{'Content-Type':'text/html'});
            } else {
                res.writeHead(200, {'Content-Type':'text/html'});
                res.write(data.toString());
            }
        });
    }
    res.end();
}).listen(80);
