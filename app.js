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


// const connection = mysql.createConnection({
//       HOST: 'us-cdbr-east-02.cleardb.com',
//       PORT: 3006,
//       USER: 'b6b84acbfe103d',
//       PASSWORD: '2ca1b309',
//       DB: 'heroku_4a5144a55c9bce4'
// });
    
// connection.connect();
let db_config = {
      host: 'us-cdbr-east-02.cleardb.com',
      user: 'b6b84acbfe103d',
      password: '2ca1b309',
      database: 'heroku_4a5144a55c9bce4'
}


let connection;

function handleDisconnect() {
    console.log('1. connecting to db:');
    connection = mysql.createConnection(db_config); 
											

    connection.connect(function(err) {             
        if (err) {                                 
            console.log('2. error when connecting to db:', err);
            setTimeout(handleDisconnect, 1000); 
        }                
    });                           
    connection.on('error', function(err) {
        console.log('3. db error', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleDisconnect();     
        } else {                                    
            throw err;                   
        }
    });
}

handleDisconnect();


app.use('/', mainController);

app.listen({port}, () => {
      console.log(`app is on port: ${port}`);
});

process.on('uncaughtException', (err, origin) => {
    console.log(err);
  });
