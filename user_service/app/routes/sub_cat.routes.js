const controller = require("../controllers/sub_cat.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/user/add_sub_cat",controller.validate('createSubCat'), controller.create);
  app.get("/user/all_sub_cat", controller.findAll);
  app.get("/user/active_sub_cat", controller.findActive);
  app.get("/user/extract_sub_cat/:id", controller.findOne);
  app.put("/user/update_sub_cat/:id",controller.validate('updateSubCat'), controller.update);
  app.delete("/user/delete_sub_cat/:id", controller.delete);
};
