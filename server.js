const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const http = require('http');
const io = require('./config/io');
const app = express();

require('dotenv').config();
require('./config/database');

const profileRouter = require('./routes/api/profiles');


const server = http.createServer(app);
io.attach(server);
app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'build')));

// Put API routes here, before the "catch all" route
app.use('/api/users', require('./routes/api/users'));
// Mount the Auth middleware that processes JWTs token
app.use(require('./config/auth'));
app.use('/api/profiles', profileRouter);

// "catch all" route
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 3001;

server.listen(port, function() {
  console.log(`Server has started on port ${port}`);
});