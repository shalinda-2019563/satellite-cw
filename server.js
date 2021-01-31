const express = require('express');
var bodyParser = require('body-parser')
const k8s = require('@kubernetes/client-node');
const { Sequelize, QueryTypes } = require('sequelize');
const mysql = require('mysql2/promise');

const PORT = 8080;

const app = express();

app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hello satellite world');
});

app.get('/sat-1/', (req, res) => {
  res.json({ data: 'Satellite 1 is healthy' });
});
app.get('/sat-2/', (req, res) => {
  res.json({ data: 'Signal from satellite 2' });
});

app.get('/sat-1/position/add', (req, res) => {

  const lat = req.query.lat
  const long = req.query.long

  mysql.createConnection({
    host: 'mysql',
    port: 3306,
    user: 'root',
    password: ''
  }).then((connection) => {


    connection.query('CREATE DATABASE IF NOT EXISTS satellite_db;').then(() => {
      connection.query('CREATE TABLE IF NOT EXISTS `satellite_db`.`satellites` ( `id` INT NOT NULL AUTO_INCREMENT ,`satellite_id` INT NOT NULL , `latitude` VARCHAR(45) NOT NULL , `longitude` VARCHAR(45) NOT NULL , PRIMARY KEY (`id`));').then(() => {

        connection.query(`INSERT INTO satellite_db.satellites (satellite_id,latitude,longitude) VALUES(1,${lat},${long});`).then(() => {

          res.json({ data: 'Satellite position succesfully added' });

          //Insert Query
        }).catch(function (err) {
          console.log("TABLE Insert FAILED");
          console.log(err)
          res.send(err);
        });


        //Table
      }).catch(function (err) {
        console.log("TABLE CREATION FAILED");
        console.log(err)
        res.send(err);
      });

      //Database
    }).catch(function (err) {
      console.log("DATABASE CREATION FAILED");
      console.log(err)
      res.send(err);
    });

  })


});


app.get('/sat-2/position/add', (req, res) => {

  const lat = req.query.lat
  const long = req.query.long

  mysql.createConnection({
    host: 'mysql',
    port: 3306,
    user: 'root',
    password: ''
  }).then((connection) => {


    connection.query('CREATE DATABASE IF NOT EXISTS satellite_db;').then(() => {
      connection.query('CREATE TABLE IF NOT EXISTS `satellite_db`.`satellites` ( `id` INT NOT NULL AUTO_INCREMENT ,`satellite_id` INT NOT NULL , `latitude` VARCHAR(45) NOT NULL , `longitude` VARCHAR(45) NOT NULL , PRIMARY KEY (`id`));').then(() => {

        connection.query(`INSERT INTO satellite_db.satellites (satellite_id,latitude,longitude) VALUES(2,${lat},${long});`).then(() => {

          res.json({ data: 'Satellite position succesfully added' });

          //Insert Query
        }).catch(function (err) {
          console.log("TABLE Insert FAILED");
          console.log(err)
          res.send(err);
        });


        //Table
      }).catch(function (err) {
        console.log("TABLE CREATION FAILED");
        console.log(err)
        res.send(err);
      });

      //Database
    }).catch(function (err) {
      console.log("DATABASE CREATION FAILED");
      console.log(err)
      res.send(err);
    });

  })


});



app.get('/sat-1/position', (req, res) => {

  mysql.createConnection({
    host: 'mysql',
    port: 3306,
    user: 'root',
    password: ''
  }).then((connection) => {


    connection.query('CREATE DATABASE IF NOT EXISTS satellite_db;').then(() => {
      connection.query('CREATE TABLE IF NOT EXISTS `satellite_db`.`satellites` ( `id` INT NOT NULL AUTO_INCREMENT ,`satellite_id` INT NOT NULL , `latitude` VARCHAR(45) NOT NULL , `longitude` VARCHAR(45) NOT NULL , PRIMARY KEY (`id`));').then(() => {

        connection.query(`SELECT * FROM satellite_db.satellites WHERE satellite_id=1;`, null, { raw: true, type: QueryTypes.SELECT }).then(function (data) {

          satellites=[]
          data[0].forEach((item) => {

            satellites.push(item)
          });

          res.json({ data: satellites});
      
          //Insert Query
        }).catch(function (err) {
          console.log("TABLE Insert FAILED");
          console.log(err)
          res.send(err);
        });


        //Table
      }).catch(function (err) {
        console.log("TABLE CREATION FAILED");
        console.log(err)
        res.send(err);
      });

      //Database
    }).catch(function (err) {
      console.log("DATABASE CREATION FAILED");
      console.log(err)
      res.send(err);
    });

  })


});


app.get('/sat-2/position', (req, res) => {

  mysql.createConnection({
    host: 'mysql',
    port: 3306,
    user: 'root',
    password: ''
  }).then((connection) => {


    connection.query('CREATE DATABASE IF NOT EXISTS satellite_db;').then(() => {
      connection.query('CREATE TABLE IF NOT EXISTS `satellite_db`.`satellites` ( `id` INT NOT NULL AUTO_INCREMENT ,`satellite_id` INT NOT NULL , `latitude` VARCHAR(45) NOT NULL , `longitude` VARCHAR(45) NOT NULL , PRIMARY KEY (`id`));').then(() => {

        connection.query(`SELECT * FROM satellite_db.satellites WHERE satellite_id=2;`, null, { raw: true, type: QueryTypes.SELECT }).then(function (data) {

          satellites=[]
          data[0].forEach((item) => {

            satellites.push(item)
          });

          res.json({ data: satellites});
          //Insert Query
        }).catch(function (err) {
          console.log("TABLE Insert FAILED");
          console.log(err)
          res.send(err);
        });


        //Table
      }).catch(function (err) {
        console.log("TABLE CREATION FAILED");
        console.log(err)
        res.send(err);
      });

      //Database
    }).catch(function (err) {
      console.log("DATABASE CREATION FAILED");
      console.log(err)
      res.send(err);
    });

  })


});


app.listen(PORT);
console.log(`Running on http://localhost:${PORT}`);
