var express = require('express');
var router = express.Router();
var koalas = [];

var pg = require('pg');
var config = {
    database: 'deneb',
    host: 'localhost',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000
}

var pool = new pg.Pool(config);

//GET route
router.get('/', function (req, res) {
    // Attempt to connect to the database
    pool.connect(function (errorConnectingToDb, db, done) {
        if (errorConnectingToDb) {
            // There was an error and no connection was made
            console.log('Error connecting', errorConnectingToDb);
            res.sendStatus(500);
        } else {
            // We connected to the db!!!!! pool -1
            var queryText = 'SELECT * FROM "koalas";';
            db.query(queryText, function (errorMakingQuery, result) {
                // We have received an error or result at this point
                done(); // pool +1
                if (errorMakingQuery) {
                    console.log('Error making query', errorMakingQuery);
                    res.sendStatus(500);
                } else {
                    res.send(result.rows);
                }
            }); // END QUERY
        }
    }); // END POOL
});


//POST route
router.post('/', function (req, res) {
    var koala = req.body; // This the data we sent
    console.log(koala); // Has a name and cost
    
    // Attempt to connect to the database
    pool.connect(function (errorConnectingToDb, db, done) {
        if (errorConnectingToDb) {
            // There was an error and no connection was made
            console.log('Error connecting', errorConnectingToDb);
            res.sendStatus(500);
        } else {
            // We connected to the db!!!!! pool -1
            var queryText = 'INSERT INTO "koalas" ("name", "age", "gender", "transfer", "notes") VALUES ($1, $2, $3 , $4 , $5 );';
            db.query(queryText, [koala.name, koala.age, koala.gender, koala.readyForTransfer, koala.notes], function (errorMakingQuery, result) {
                // We have received an error or result at this point
                done(); // pool +1
                if (errorMakingQuery) {
                    console.log('Error making query', errorMakingQuery);
                    res.sendStatus(500);
                } else {
                    // Send back success!
                    res.sendStatus(201);
                }
            }); // END QUERY
        }
    }); // END POOL
});

//DELETE route


router.delete('/:id', function (req, res) {
    var koalaId = req.params.id; //only getting the id from the client I'm deleting
    console.log(koala); // Has a name and cost
    
    // Attempt to connect to the database
    pool.connect(function (errorConnectingToDb, db, done) {
        if (errorConnectingToDb) {
            // There was an error and no connection was made
            console.log('Error connecting', errorConnectingToDb);
            res.sendStatus(500);
        } else {
            // We connected to the db!!!!! pool -1
            //var queryText = 'INSERT INTO "koalas" ("name", "age", "gender", "transfer", "notes") VALUES ($1, $2, $3 , $4 , $5 );';
            var queryText = 'DELETE FROM "koalas" WHERE "id" = $1;';
            db.query(queryText, [koalaId], function (errorMakingQuery, result) {
                // We have received an error or result at this point
                done(); // pool +1
                if (errorMakingQuery) {
                    console.log('Error making query', errorMakingQuery);
                    res.sendStatus(500);
                } else {
                    // Send back success!
                    res.sendStatus(201);
                }
            }); // END QUERY
        }
    }); // END POOL
});


//PUT route
router.put('/:id', function (req, res) {
    var koala = req.body;
    var koalaId = req.params.id; //only getting the id from the client I'm deleting
    console.log(koala); // Has a name and cost
    
    // Attempt to connect to the database
    pool.connect(function (errorConnectingToDb, db, done) {
        if (errorConnectingToDb) {
            // There was an error and no connection was made
            console.log('Error connecting', errorConnectingToDb);
            res.sendStatus(500);
        } else {
            // We connected to the db!!!!! pool -1
            //var queryText = 'INSERT INTO "koalas" ("name", "age", "gender", "transfer", "notes") VALUES ($1, $2, $3 , $4 , $5 );';
            var queryText = 'UPDATE "koalas" SET "name"= $1, "age" = $2, "gender" = $3, "readyForTransfer" = $4, "notes" = $5 WHERE "id" =$6;';
            db.query(queryText, [koala.name, koala.age, koala.gender, koala.transfer, koala.notes ], function (errorMakingQuery, result) {
                // We have received an error or result at this point
                done(); // pool +1
                if (errorMakingQuery) {
                    console.log('Error making query', errorMakingQuery);
                    res.sendStatus(500);
                } else {
                    // Send back success!
                    res.sendStatus(201);
                }
            }); // END QUERY
        }
    }); // END POOL
});

module.exports = router;