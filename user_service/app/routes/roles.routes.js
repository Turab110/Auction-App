const controller = require("../controllers/roles.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/user/add_roles", controller.create);
  app.get("/user/all_roles", controller.findAll);
  app.get("/user/active_roles", controller.findActive);
  app.get("/user/extract_roles/:id", controller.findOne);
  app.put("/user/update_roles/:id", controller.update);
  app.delete("/user/delete_roles/:id", controller.delete);
};
