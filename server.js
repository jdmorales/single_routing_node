const http = require('http');
const fs = require("fs");
const path = require("path");
const url = require("url");
const mimeTypes = require("./appServer/config/MINE_TYPES.js");

const hostname = '0.0.0.0';
const port = 8000;


var handle = {
    templates:{
        baseUrl:"/appServer/templates/",
        URLs:[]
    }
};

handle.templates.URLs["/"]="index.html";
handle.templates.URLs["/about"]="about.html";
handle.templates.URLs["error404"]="error404.html";


function getData(response,pathRelative){
    var extFile=path.extname(pathRelative);
    var Content_Type=mimeTypes.getType(extFile);

    fs.readFile(pathRelative, function(error, data){
        if(!error){
            response.writeHead(200, {"Content-Type":Content_Type});
            response.write(data, "utf8");
            response.end();
        }
    });
}

function joinPath(handleType,pathname){
    var baseUrl=handleType.baseUrl;
    var file=handleType.URLs[pathname];
    var pathRelative = path.join(process.cwd(),baseUrl,file);
    return pathRelative;
}

const server = http.createServer(function(req, res){
    var pathname = url.parse(req.url).pathname;
    console.log("-GET [" + pathname + "]");

    if(typeof handle.templates.URLs[pathname] === 'string'){
        var pathRelative=joinPath(handle.templates,pathname);
        getData(res,pathRelative);
    }else{
        var pathRelative=joinPath(handle.templates,"error404");
        getData(res,pathRelative);
    }
});

server.listen(port, hostname, function() {
    console.log("Server running at http:", hostname, port);
});

