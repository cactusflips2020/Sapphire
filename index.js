import express from "express";
import http from "node:http";
import path from "path";
import ejs from "ejs";
import { createBareServer } from '@tomphttp/bare-server-node';

const port = process.env.PORT || 3000;
const app = express();
const __dirname = process.cwd();
const server = http.createServer();
const bareServer = createBareServer("/bare/");

app.use(express.static("public"));
app.use(express.urlencoded({extended: false}));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.get('/', (req, res) => {
  res.render("index", { title: "Home" });
});

app.get('/gxmes', (req, res) => {
  res.render("gxmes", { title: "Games" });
});

app.get('/apps', (req, res) => {
  res.render("apps", { title: "Apps" });
});

app.get('/settings', (req, res) => {
  res.render("settings", { title: "Settings" });
});

app.get('/extra', (req, res) => {
  res.render('extra',  { title: "Extra" });
});

app.get('/textbook', (req, res) => {
  res.render('loader',  { title: "Loading..." });
});

app.get('/learning', (req, res) => {
  res.render('learning');
});

app.get('/e/e/e/testingfortnite012948', (req, res) => {
  res.render('extra/testing');
});

app.use((req, res) => {
  res.statusCode = 404;
  res.render("404", { title: "Sapphire | 404", error: "It looks like the page you were looking for doesn't exist.",});
});

server.on("request", (req, res) => {
  if (bareServer.shouldRoute(req)) {
    bareServer.routeRequest(req, res);
  } else {
    app(req, res);
  }
});

server.on("upgrade", (req, socket, head) => {
  if (bareServer.shouldRoute(req)) {
    bareServer.routeUpgrade(req, socket, head);
  } else {
    socket.end();
  }
});

server.on("listening", () => {
  console.log(`Sapphire is running on: http://localhost:${port}`);
});

server.listen({
  port: 3000,
});
