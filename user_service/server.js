const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require('path')
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
require('./app/routes/main_cat.routes')(app);
require('./app/routes/sub_cat.routes')(app);
require('./app/routes/roles.routes')(app);
require('./app/routes/mainmenu.routes')(app);
require('./app/routes/submenu.routes')(app);
require('./app/routes/role_permission.routes')(app);
require('./app/routes/brand.routes')(app);
require('./app/routes/session.routes')(app);
require('./app/routes/users.routes')(app);
require('./app/routes/incpection.routes')(app);


app.use("/public", express.static(path.join(__dirname, 'public')));


const SERVER_PORT = process.env.PORT || 5001;

app.listen(SERVER_PORT, () => {
  console.log("Server Listening on port " + SERVER_PORT);
});