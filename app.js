const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// const cors = require('cors');
const mysql = require('mysql');
const mainController = require('./controller/main-controller')
const path = require('path');
const port = process.env.PORT || 80

app.use(express.static(path.join(__dirname, 'public')));
// app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


const connection = mysql.createConnection({
      HOST: 'us-cdbr-east-02.cleardb.com',
      PORT: 3006,
      USER: 'b6b84acbfe103d',
      PASSWORD: '2ca1b309',
      DB: 'heroku_4a5144a55c9bce4'
});
    
connection.connect();

// mysql.createConnection({
//       HOST: 'us-cdbr-east-02.cleardb.com',
//       USER: 'b6b84acbfe103d',
//       PASSWORD: '2ca1b309',
//       DB: 'heroku_4a5144a55c9bce4'
//     }).then(connection => {
//         global.mysqlConnection = connection;

// });



app.use('https://gentle-caverns-40728.herokuapp.com/', mainController);

app.listen({port}, () => {
      console.log(`app is on port: ${port}`);
});

process.on('uncaughtException', (err, origin) => {
    console.log(err);
  });
