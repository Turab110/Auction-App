const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require('cookie-parser');

//Database Connection
require('./app/config/db.config');

const app = express();

app.use(cookieParser());
app.use(express.static(__dirname + '/app'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//routes
require('./app/routes/feature_pack.routes')(app);
require('./app/routes/subscrip_pack.routes')(app);
require('./app/routes/inspection_pay.routes')(app);
require('./app/routes/assign_feature.routes')(app);
require('./app/routes/assign_subscrip.routes')(app);
require('./app/routes/feature_pay.routes')(app);
require('./app/routes/subscrip_pay.routes')(app);



const SERVER_PORT = process.env.PORT || 5003;

app.listen(SERVER_PORT, () => {
  console.log("Server Listening on port " + SERVER_PORT);
});