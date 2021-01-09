const express = require('express');
var bodyParser = require('body-parser')
const k8s = require('@kubernetes/client-node');
const { Sequelize } = require('sequelize');

// Constants
const PORT = 8080;

// App
const app = express();

app.use(bodyParser.json())


app.get('/', (req, res) => {
  res.send('Hello k8! v10000');
});


app.get('/shalinda', (req, res) => {

  var sequelize = new Sequelize('my_db', 'root', '', {
    host: 'mysql',
    port: 3306,
    dialect: 'mysql'
});

  sequelize.authenticate().then(function () {
    
    console.log("CONNECTED Log! ");
    res.send('CONNECTED Response ! ');
  })
    .catch(function (err) {
      console.log("SOMETHING DONE GOOFED");
      console.log(err)
      res.send('CONNECTED ERROR Response ');
    });


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