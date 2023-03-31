const controller = require("../controllers/assign_subscrip.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/package/add_ass_subs",controller.validate('createAssSubs'), controller.create);
  app.get("/package/all_ass_subs", controller.findAll);
  app.get("/package/active_ass_subs", controller.findActive);
  app.get("/package/extract_ass_subs/:id", controller.findOne);
  app.put("/package/update_ass_subs/:id",controller.validate('updateAssSubs'), controller.update);
  app.delete("/package/delete_ass_subs/:id", controller.delete);
};
