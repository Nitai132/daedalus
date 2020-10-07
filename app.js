const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// const cors = require('cors');
const mysql = require('mysql2/promise');
const mainController = require('./controller/main-controller')
const path = require('path');
const port = process.env.PORT || 80

app.use(express.static(path.join(__dirname, 'public')));
// app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

mysql.createConnection({
      host: 'us-cdbr-east-02.cleardb.com',
      port: 3006,
      user: 'b6b84acbfe103d',
      password: '2ca1b309',
      database: 'daedalus1'
    }).then(connection => {
        global.mysqlConnection = connection;
        app.listen({port}, () => {
              console.log(`app is on port: ${port}`);
        });
});

app.use('/', mainController);

process.on('uncaughtException', (err, origin) => {
    console.log(err);
  });
