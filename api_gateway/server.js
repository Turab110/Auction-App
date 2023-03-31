const { createProxyMiddleware } = require('http-proxy-middleware');
const exception = require('./middleware/Exception');
const verifyJwtToken = require("./middleware/VerifyJwtToken");
const express = require("express");
const app = express();


const {
    USERS_API_URL,
    AUCTION_API_URL,
    PACKAGES_API_URL
} = require('./urls');

const optionsUsers = {
  target: USERS_API_URL,
  changeOrigin: true, 
  logger: console,
};

const usersProxy = createProxyMiddleware(optionsUsers);


const optionsAuction = {
  target: AUCTION_API_URL,
  changeOrigin: true, 
  logger: console,
};

const auctionProxy = createProxyMiddleware(optionsAuction);

const optionsPackage = {
  target: PACKAGES_API_URL,
  changeOrigin: true, 
  logger: console,
};

const packageProxy = createProxyMiddleware(optionsPackage);


app.get("/", (req, res) => res.send("Hello Gateway API"));
app.use("/auth", usersProxy);
app.use("/user", verifyJwtToken, usersProxy);
app.use("/auction", verifyJwtToken, usersProxy);
app.use("/package", verifyJwtToken, usersProxy);
// app.use("/api",verifyJwtToken, usersProxy);

//Exception Handlers Middleware
app.use(exception.handleValidationError);
app.use(exception.handleTypeError);
app.use(exception.handleDatabaseError);
app.use(exception.handleServerError);
app.use(exception.handleReferenceError);
app.use(exception.handleNotFoundError);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});