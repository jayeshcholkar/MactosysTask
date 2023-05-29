const propertyRouter = require("express").Router();
const property = require("../controllers/propertyController");
const upload = require("../middleware/imageStorage");

propertyRouter.post(
  "/create",
  upload.array("propertyImage", 5),
  property.addProperty
);
propertyRouter.delete("/delete/:id", property.deleteProperty);
propertyRouter.get("/list", property.propertyList);
propertyRouter.patch("/update/:id", property.updateProperty);

module.exports = propertyRouter;
