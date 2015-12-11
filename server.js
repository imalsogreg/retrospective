var http = require('http');
var fs   = require('fs');
var url  = require('url');

http.createServer( function (req, res) {
    var pathname = url.parse(req.url).pathname;
    if (pathname == '/data' && req.method == "POST") {

        req.setEncoding('utf8');
        var t     = new Date();
        var body = '';
        req.on('data', function(chunk){ body += chunk; console.log('data!');});
        req.on('end', function () {
            var entry = { ts: t, d: body };
            fs.appendFile('data.json', JSON.stringify(entry));
            console.log("Recorded entry to data.json: " + JSON.stringify(entry));
        });
        res.writeHead(200);
        res.end();

    } else {

        var fn = pathname.substr(1);
        var extn = pathname.slice (pathname.lastIndexOf('.'));
        var mimetype = 'none';

        switch(pathname.slice( pathname.lastIndexOf('.'))) {
        case ".js":
            mimetype = "application/javascript";
            break;
        case ".png":
            mimetype = "image/png";
            break;
        case ".jpg":
            mimetype = "image/jpeg";
            break;
        case ".html":
            mimetype = "text/html";
            break;
        case ".css":
            mimetype = "text/css";
            break;
        }
        fs.readFile(fn, function (err,data) {
            if (err) {
                console.log(err);
                res.writeHead(404,{'Content-Type':'text/html'});
                res.end();
            } else {
                res.writeHead(200, {'Content-Type':mimetype});
                res.write(data);
                res.end();
            }
        });
    }
}).listen(80);
