var http = require('http');
var fs = require('fs');

// function onRequest(reqeust, response) {
//     response.writeHead(200, {'Content-Type': 'text/html'});
//     fs.readFile('./test.html', null, function(error, data) {
//         if(error)
//         {
//             reqeust.writeHead(404);
//             response.write('File not found!');
//         } else {
//             response.write(data);
//         }
//         response.end()
//     });
// }

// http.createServer(onRequest).listen(8000);

var server = http.createServer(function(req, res){
    console.log('request was made: ' + req.url);
    res.writeHead(200, {'Content-Type': 'text/html'});
    var myReadStream = fs.createReadStream('./test.html', 'utf8');
    myReadStream.pipe(res);
});

server.listen(3000, '127.0.0.1');
console.log("k try it");