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
require('./app/routes/auction_type.routes')(app);
require('./app/routes/user_auction.routes')(app);
require('./app/routes/auction_gallery.routes')(app);
require('./app/routes/auction_bid.routes')(app);
require('./app/routes/auction_chatroom.routes')(app);
require('./app/routes/chat_message.routes')(app);
require('./app/routes/auction_result.routes')(app);
require('./app/routes/auction_report.routes')(app);


const SERVER_PORT = process.env.PORT || 5002;

app.listen(SERVER_PORT, () => {
  console.log("Server Listening on port " + SERVER_PORT);
});