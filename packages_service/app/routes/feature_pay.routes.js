const controller = require("../controllers/feature_pay.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/package/add_feat_pay",controller.validate('createFeatPay'), controller.create);
  app.get("/package/all_feat_pay", controller.findAll);
  app.get("/package/active_feat_pay", controller.findActive);
  app.get("/package/extract_feat_pay/:id", controller.findOne);
  app.put("/package/update_feat_pay/:id",controller.validate('updateFeatPay'), controller.update);
  app.delete("/package/delete_feat_pay/:id", controller.delete);
};
