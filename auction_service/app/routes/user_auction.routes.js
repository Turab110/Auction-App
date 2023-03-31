const controller = require("../controllers/user_auction.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/auction/add_user_auc",controller.validate('createUserAuc'), controller.create);
  app.get("/auction/all_user_auc", controller.findAll);
  app.get("/auction/active_user_auc", controller.findActive);
  app.get("/auction/extract_user_auc/:id", controller.findOne);
  app.put("/auction/update_user_auc/:id",controller.validate('updateUserAuc'), controller.update);
  app.delete("/auction/delete_user_auc/:id", controller.delete);
};
