const mongoose = require("mongoose");

mongoDBUrl = "mongodb://boli_mongodb:27017/boliuserdb";

mongoose.connect(mongoDBUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("-----> mongoDB connected..."))
  .catch((err) =>
    console.log("-----> Error trying to connect to mongoDB: ", err)
  );

mongoose.connection.on(
  "error",
  console.error.bind(console, "-----> mongoDB connection error")
);