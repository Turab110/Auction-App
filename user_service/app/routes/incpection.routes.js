const controller = require("../controllers/incpection.controller");
const path = require('path')
const multer = require('multer');
const storageFile = multer.diskStorage({
  destination: './public/Incpection_report',
  filename: function (req, file, fn) {
      fn(null, new Date().getTime().toString() + '-' + file.fieldname + path.extname(file.originalname))
  }
})

// Create multer for store images path
var upload = multer({ storage: storageFile }).single('incpection_report')

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/user/add_incpection", upload,controller.validate('createIncpection'), controller.create);
  app.get("/user/all_incpection", controller.findAll);
  app.get("/user/active_incpection", controller.findActive);
  app.get("/user/extract_incpection/:id", controller.findOne);
  app.put("/user/update_incpection/:id", upload,controller.validate('updateIncpection'), controller.update);
  app.delete("/user/delete_incpection/:id", controller.delete);
};
