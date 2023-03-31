const controller = require("../controllers/auction_result.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/auction/add_auc_result",controller.validate('createAucResult'), controller.create);
  app.get("/auction/all_auc_result", controller.findAll);
  app.get("/auction/active_auc_result", controller.findActive);
  app.get("/auction/extract_auc_result/:id", controller.findOne);
  app.put("/auction/update_auc_result/:id",controller.validate('updateAucResult'), controller.update);
  app.delete("/auction/delete_auc_result/:id", controller.delete);
};
