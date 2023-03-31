const controller = require("../controllers/users.controller");
const multer = require('multer');
const storageFile = multer.diskStorage({
  destination: './public/user_picture',
  filename: function (req, file, fn) {
      fn(null, new Date().getTime().toString() + '-' + file.fieldname + path.extname(file.originalname))
  }
})

// Create multer for store images path
var upload = multer({ storage: storageFile }).single('user_picture')

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  //Without Token
  app.post("/auth/createUser", controller.validate('createUser'), controller.create);
  app.post("/auth/setpass",controller.validate('setPassword'), controller.SetUserPassword)
  app.post("/auth/login", controller.signin);
  app.get("/auth/logout", controller.logout);

  //Token Required
  app.put("/user/changepassword",controller.validate('changePassword'), controller.ChangePassword);
  app.get("/user/allusers", controller.findAll);
  app.get("/user/activeusers", controller.findActive);
  app.get("/user/roleusers/:id", controller.findAllByRole);
  app.get("/user/getuser/:id", controller.findOne);
  app.put("/user/updateuser/:id",upload, controller.update);
  app.delete("/user/deleteuser/:id", controller.delete);
};