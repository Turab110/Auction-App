const controller = require("../controllers/mainmenu.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/user/add_mainmenu",controller.validate('createMainmenu'), controller.create);
  app.get("/user/all_mainmenu", controller.findAll);
  app.get("/user/active_mainmenu", controller.findActive);
  app.get("/user/extract_mainmenu/:id", controller.findOne);
  app.put("/user/update_mainmenu/:id",controller.validate('updateMainmenu'), controller.update);
  app.delete("/user/delete_mainmenu/:id", controller.delete);
};
