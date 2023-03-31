const controller = require("../controllers/role_permission.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/user/add_role_perm", controller.validate('createRolePerm'),controller.create);
  app.get("/user/all_role_perm", controller.findAll);
  app.get("/user/main_perm/:id", controller.findmain);
  app.get("/user/extract_role_perm/:id", controller.findOne);
  app.put("/user/update_role_perm/:id", controller.validate('updateRolePerm'),controller.update);
  app.delete("/user/delete_role_perm/:id", controller.delete);
};
