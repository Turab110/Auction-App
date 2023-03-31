const controller = require("../controllers/assign_feature.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/package/add_ass_feat",controller.validate('createAssFeat'), controller.create);
  app.get("/package/all_ass_feat", controller.findAll);
  app.get("/package/active_ass_feat", controller.findActive);
  app.get("/package/extract_ass_feat/:id", controller.findOne);
  app.put("/package/update_ass_feat/:id",controller.validate('updateAssFeat'), controller.update);
  app.delete("/package/delete_ass_feat/:id", controller.delete);
};
