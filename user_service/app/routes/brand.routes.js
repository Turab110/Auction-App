const controller = require("../controllers/brand.controller");
const path = require('path')
const multer = require('multer');
const storageFile = multer.diskStorage({
  destination: './public/brand_logo',
  filename: function (req, file, fn) {
      fn(null, new Date().getTime().toString() + '-' + file.fieldname + path.extname(file.originalname))
  }
})

// Create multer for store images path
var upload = multer({ storage: storageFile }).single('brand_logo')

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/user/add_brand", upload,controller.validate('createBrand'), controller.create);
  app.get("/user/all_brand", controller.findAll);
  app.get("/user/active_brand", controller.findActive);
  app.get("/user/extract_brand/:id", controller.findOne);
  app.put("/user/update_brand/:id", upload,controller.validate('updateBrand'), controller.update);
  app.delete("/user/delete_brand/:id", controller.delete);
};
