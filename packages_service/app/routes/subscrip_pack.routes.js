const controller = require("../controllers/subscrip_pack.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/package/add_subs_pack",controller.validate('createSubsPack'), controller.create);
  app.get("/package/all_subs_pack", controller.findAll);
  app.get("/package/active_subs_pack", controller.findActive);
  app.get("/package/extract_subs_pack/:id", controller.findOne);
  app.put("/package/update_subs_pack/:id",controller.validate('updateSubsPack'), controller.update);
  app.delete("/package/delete_subs_pack/:id", controller.delete);
};
