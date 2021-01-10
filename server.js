const express = require('express');
var bodyParser = require('body-parser')
const k8s = require('@kubernetes/client-node');
const { Sequelize } = require('sequelize');
const mysql = require('mysql2/promise');

// Constants
const PORT = 8080;

const app = express();

app.use(bodyParser.json())


app.get('/sat-1/hello', (req, res) => {
  res.send('Hello satellite 1');
});

app.get('/sat-2/hello', (req, res) => {
  res.send('Hello satellite 2');
});


app.get('/position', (req, res) => {

  //Kubernetis
  //   var sequelize = new Sequelize('my_db', 'root', '', {
  //     host: 'mysql',
  //     port: 3306,
  //     dialect: 'mysql'
  // });

  mysql.createConnection({
    host: 'mysql',
    port: 3306,
    user: 'root',
    password: ''
  }).then((connection) => {


    connection.query('CREATE DATABASE IF NOT EXISTS satellite_db;').then(() => {
      connection.query('CREATE TABLE IF NOT EXISTS `satellite_db`.`satellites` ( `id` INT NOT NULL AUTO_INCREMENT , `latitude` VARCHAR(45) NOT NULL , `longitude` VARCHAR(45) NOT NULL , PRIMARY KEY (`id`));').then(() => {

        const lat = Math.round((Math.random() * 360 - 180) * 1000) / 1000
        const long = Math.round((Math.random() * 360 - 180) * 1000) / 1000

        connection.query(`INSERT INTO satellite_db.satellites (latitude,longitude) VALUES(${lat},${long});`).then(() => {



          res.send(`<h1>Satellite is in position of latitude ${lat} and longitude of ${long} </h1>`);

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




  // sequelize.authenticate().then(function () {

  //   console.log("CONNECTED Log! ");
  //   res.send('CONNECTED Response ! ');
  // })
  //   .catch(function (err) {
  //     console.log("SOMETHING DONE GOOFED");
  //     console.log(err)
  //     res.send(err);
  //   });


});

app.get('/test', (req, res) => {
  const kc = new k8s.KubeConfig();
  kc.loadFromDefault();

  const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

  k8sApi.listNamespacedPod('default').then((res) => {
    console.log(res.body);
  });
});




app.listen(PORT);
console.log(`Running on http://localhost:${PORT}`);
