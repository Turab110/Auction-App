const controller = require("../controllers/feature_pack.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/package/add_feat_pack",controller.validate('createFeatPack'), controller.create);
  app.get("/package/all_feat_pack", controller.findAll);
  app.get("/package/active_feat_pack", controller.findActive);
  app.get("/package/extract_feat_pack/:id", controller.findOne);
  app.put("/package/update_feat_pack/:id",controller.validate('updateFeatPack'), controller.update);
  app.delete("/package/delete_feat_pack/:id", controller.delete);
};
