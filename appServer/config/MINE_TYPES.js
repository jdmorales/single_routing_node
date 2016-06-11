
var MIME_types=[];
MIME_types[".html"]="text/html";
MIME_types[".js"]="application/javascript";
MIME_types[".png"]="image/png";
MIME_types[".jpeg"]="image/jpeg";
MIME_types[".jpg"]="image/jpeg";

function getType(extFile){
    return MIME_types[extFile];
}

exports.getType=getType;