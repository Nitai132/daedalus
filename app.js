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
      HOST: 'us-cdbr-east-02.cleardb.com',
      USER: 'b6b84acbfe103d',
      PASSWORD: '2ca1b309',
      DB: 'heroku_4a5144a55c9bce4'
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
