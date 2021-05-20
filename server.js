//set up dependencies
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

app.use(bodyParser.json());
app.use(morgan('tiny'));


let fs = require('fs');
const { Pool } = require('pg');

const port = 8000;
const pool = new Pool({
  database:'chess_players',
  port:5432
});
app.use(cors());
app.use(express.static('public'));
app.get('/api/:id', (req, res)=>{

  const {id} = req.params;
  pool.query('SELECT * FROM players WHERE playerId = $1', [id], (err,data)=>{
    if(err) {
      res.append('Content-Type', 'plain/text');
      res.status(400).send('An error has occurred!');
    } else {
        if(data.rows.length < 1) {
            res.append('Content-Type', 'plain/text');
            res.status(404).send(`Sorry a chess player with an id of ${id} could not be found. Please try a different index.`);
        } else {
            res.status(200);
            res.append('Content-Type', 'application/json');
            res.json(data.rows);
        }
    }
  });
  
});

app.post('/api', function (req, res) {
    const newPlayer = req.body;
    pool.query('INSERT INTO players (firstName, lastName, playerId, countryId) VALUES ($1, $2, $3, $4);', [newPlayer.firstName, newPlayer.lastName, newPlayer.playerId, newPlayer.countryId], (err,data)=>{
        if(err) {
          res.append('Content-Type', 'plain/text');
          res.status(400).send('An error has occurred!');
        } else {
          res.append('Content-Type', 'application/json');
          res.status(200).send(`Your chess player ${newPlayer.firstName} ${newPlayer.lastName} has been successfully added to the database.`);
        }
    });  
});

app.put('/api/:id', function (req, res) {
    let {id} = req.params;
    let playerAttributes = req.body;

    // check user inputs integer as id
    if(Number.isNaN(parseInt(id))) {
        res.append('Content-Type', 'text/plain');
        res.status(400).send('Please enter a valid chess player id you wish to modify');
    }
    
    pool.query("UPDATE players SET firstName=$1, lastName=$2, playerId=$3, countryId=$4 WHERE playerId=$5;", [playerAttributes.firstName, playerAttributes.lastName, playerAttributes.playerId, playerAttributes.countryId, id], (err,data)=>{
        if(err) {
            console.log('here is the error message: ', error);
            res.append('Content-Type', 'plain/text');
            res.status(404).send('An erorr has occurred could not find that chess player to update.');
        } else {
            res.append('Content-type', 'application/json');
            res.status(200).send(`Congrats your chess player ${playerAttributes.firstName} ${playerAttributes.lastName} has successfully
            been updated!`);
        }
    });
});


app.delete('/api/:id', (req, res)=>{
    const {id} = req.params;
    
    // check user inputs integer as id
    if(Number.isNaN(parseInt(id))) {
        res.append('Content-Type', 'text/plain');
        res.status(400).send('Please enter a valid chess player id you wish to delete');
    }

    pool.query('DELETE FROM players WHERE playerId=$1;', [id], (err,data)=>{
        if(err) {
            res.append('Content-Type', 'plain/text');
            res.status(404).send('An error has occurred.');
        } else {
            res.append('Content-Type', 'application/json');
            res.status(200).send(`Successfully deleted chess player with an id of ${id}.`);
        }
    });
});

// checks that user is using proper syntax and providing id to delete
app.delete('/api', (req, res)=>{
    const {id} = req.params;
   
    res.append('Content-Type', 'plain/text');
    res.status(404).send(`Please enter a chess player id you wish to delete.`);
});

//listen on a port
app.listen(4004, function(){
    console.log('server is running');
});

module.exports = app;