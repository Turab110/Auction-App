const controller = require("../controllers/auction_report.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/auction/add_auc_report",controller.validate('createAucReport'), controller.create);
  app.get("/auction/all_auc_report", controller.findAll);
  app.get("/auction/active_auc_report", controller.findActive);
  app.get("/auction/extract_auc_report/:id", controller.findOne);
  app.put("/auction/update_auc_report/:id",controller.validate('updateAucReport'), controller.update);
  app.delete("/auction/delete_auc_report/:id", controller.delete);
};
