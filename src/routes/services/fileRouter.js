import express from "express";
import fileController from "../../controllers/fileController.js";
import { checkPermissions } from "../../security/interceptors.js";

const router = express.Router();

router.use("/", (req, res, next) => {
  // console.log("Dosao u *******************************", req.url);
  const urlParts = req.url.split("/");
  req.objName2 = urlParts[1];
  router.post("/upload", fileController.uploadFile);
  router.delete("/delete/:fileName", checkPermissions(), fileController.deleteFile);
  router.get('/:fileName',fileController.getFile);

  next();
});

export default router;

