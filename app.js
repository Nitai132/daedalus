const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// const cors = require('cors');
const mysql = require('mysql2/promise');
const mainController = require('./controller/main-controller')
const path = require('path');
const PORT = process.env.PORT || 80

app.use(express.static(path.join(__dirname, 'public')));
// app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'daedalus'
  }).then(connection => {
      global.mysqlConnection = connection;
      app.listen({PORT}, () => {
            console.log(`app is on port: ${PORT}`);
      });
  });

app.use('/', mainController);

process.on('uncaughtException', (err, origin) => {
    console.log(err);
  });
