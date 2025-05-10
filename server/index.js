var express = require("express");
const { Server } = require("socket.io");
const Manager = require("./Backend/manager.js");
var cors = require("cors");
const fs = require("fs");
const session = require("express-session");

var app = express();
app.use(express.static("public"));
app.use(
	cors({
		origin: "http://localhost:3000",
		credentials: true,
	})
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
	session({
		secret: "secret",
		resave: false,
		saveUninitialized: true,
	})
);

const http = require("http");
const s = http.createServer(app);
const io = new Server(s, {
	cors: {
		origin: "http://localhost:3000",
	},
});

io.on("connection", (socket) => {
	console.log('Client Connected !!!');
    Manager.init(socket);
});

s.listen(8082, function () {
	console.log("ExpressJS is running on port 8082");
});
