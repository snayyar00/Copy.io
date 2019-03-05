// const http = require('http');
//
// const hostname = '127.0.0.1';
// const port = 3000;
//
// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   const render = server.reply;
//   res.render('index.html');
//
//   res.end('Hello Wold\n');
// });
//
//
// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });
const app = require("express")();
    const http = require("http").Server(app);
    const io = require("socket.io")(http);
    const port = process.env.PORT || 3000;

    app.get("/", function(req, res) {
        res.sendFile(__dirname + "/index.html");
    });

    io.on("connection", function(socket) {

        socket.on("user_join", function(data) {
            this.username = data;
            socket.broadcast.emit("user_join", data);
        });

        socket.on("chat_message", function(data) {
            data.username = this.username;
            socket.broadcast.emit("chat_message", data);
        });

        socket.on("disconnect", function(data) {
            socket.broadcast.emit("user_leave", this.username);
    	});
    });

    http.listen(port, function() {
        console.log("Listening on *:" + port);
    });
	
