const http = require('http');
const fs = require("fs");
const path = require("path");
const url = require("url");

const hostname = '0.0.0.0';
const port = 8000;

const server = http.createServer(function(req, res){
    var pathname = url.parse(req.url).pathname;
    console.log("-GET [" + pathname + "]");
    var pathRelative= path.join(process.cwd(),'/appServer/templates/index.html');
    fs.readFile(pathRelative, function(error, data){
        if(!error){
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            res.write(data, "utf8");
            res.end();
        }
    });
});

server.listen(port, hostname, function() {
    console.log("Server running at http:", hostname, port);
});
