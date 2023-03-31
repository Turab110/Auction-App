const controller = require("../controllers/auction_type.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/auction/add_auc_type",controller.validate('createAucType'), controller.create);
  app.get("/auction/all_auc_type", controller.findAll);
  app.get("/auction/active_auc_type", controller.findActive);
  app.get("/auction/extract_auc_type/:id", controller.findOne);
  app.put("/auction/update_auc_type/:id",controller.validate('updateAucType'), controller.update);
  app.delete("/auction/delete_auc_type/:id", controller.delete);
};
