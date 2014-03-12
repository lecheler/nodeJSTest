var express = require('express'),
    app = express(),
    http = require('http').createServer(app),
    io = require('socket.io').listen(http);

// express.get('/', function(req, res){
//  // res.send('id: ' + req.query.id);
//  console.log("get handled");
// });


// Send message to single client: http://stackoverflow.com/questions/7954510/sending-message-to-a-unique-socket
app.get("/api", function(req, res) // make a call to the /api folder from a php file to update certain data
{
     res.writeHead(200, {'Content-Type': 'text/html'});
     res.end();

     console.log("CLIENTS="+io.sockets.clients());

   	 io.sockets.emit("apiCalled", req.query.name);
     console.log(req.query.name);
});

http.listen(4444);


// set the socket name: http://stackoverflow.com/questions/7954510/sending-message-to-a-unique-socket
io.sockets.on('connection', function(socket)
{
//	io.sockets.emit("newLogin", 'Luke');
    socket.on('send msg', function(data){
        io.sockets.emit('get msg', data);
    })
})
// With MySQL: http://nodejsdb.org/

// http://jnjnjn.com/113/node-js-for-noobs-grabbing-post-content/
// http://blog.frankgrimm.net/2010/11/howto-access-http-message-body-post-data-in-node-js/
// http://www.sitepoint.com/creating-a-http-server-in-node-js/
// http://stackoverflow.com/questions/12310000/send-post-request-to-node-js-with-php-curl


// Watch for file change
// Require the file system
//   fs = require("fs");
// // Watch the sim directory
// fs.watch("ok.txt", { persistent: true }, function (event, fileName) {
//   console.log("Event: " + event);
//   console.log(fileName + "\n");
// });

app.use(express.static(__dirname+'/public'));
app.use(express.static(__dirname+'/bower_components'));