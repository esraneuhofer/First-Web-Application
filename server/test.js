var http = require('http');
var fs = require('fs');
var PORT = process.env.PORT || 3000;

http.createServer(function(req, res){
    fs.readFile(__dirname +'/../public/html/index.html',function (err, data){
        res.writeHead(200, {'Content-Type': 'text/html','Content-Length':data.length});
        res.write(data);
        res.end();
    });
}).listen(PORT);