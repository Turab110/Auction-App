const controller = require("../controllers/main_cat.controller");
const multer = require('multer');
const storageFile = multer.diskStorage({
  destination: './public/category_image',
  filename: function (req, file, fn) {
      fn(null, new Date().getTime().toString() + '-' + file.fieldname + path.extname(file.originalname))
  }
})

// Create multer for store images path
var upload = multer({ storage: storageFile }).single('category_image')

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/user/add_main_cat",upload,controller.validate('createMainCat'), controller.create);
  app.get("/user/all_main_cat", controller.findAll);
  app.get("/user/active_main_cat", controller.findActive);
  app.get("/user/extract_main_cat/:id", controller.findOne);
  app.put("/user/update_main_cat/:id",controller.validate('updateMainCat'), controller.update);
  app.delete("/user/delete_main_cat/:id", controller.delete);
};
