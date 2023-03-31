const controller = require("../controllers/submenu.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/user/add_submenu",controller.validate('createSubmenu'), controller.create);
  app.get("/user/all_submenu", controller.findAll);
  app.get("/user/active_submenu", controller.findActive);
  app.get("/user/extract_submenu/:id", controller.findOne);
  app.put("/user/update_submenu/:id",controller.validate('updateSubmenu'), controller.update);
  app.delete("/user/delete_submenu/:id", controller.delete);
};
