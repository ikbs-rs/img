import express from 'express'
import fileRouter from "./services/fileRouter.js";
import { checkJwt, checkPermissions, checkPermissionsEx } from '../security/interceptors.js'

const router = express.Router();

//router.use(checkJwt); // provera JWT tokena na svakom zahtevu
router.use(express.json())


router.use((req, res, next) => {
  console.log("++++++++++++++++++ indexRouter +++++++++++++++++++++")
  if (req.path.startsWith("/adm/services/sign") || req.method === 'GET') {
    return next();
  } 
  checkJwt(req, res, next);
  //next()
});

router.use('/public/adm', checkPermissions(), fileRouter)   
router.use('/public/cmn', checkPermissions(), fileRouter)   
router.use('/public/tic', fileRouter)  


router.use("/", (req, res, next) => {
  console.log("--------------------------------------")
  next();
  return res.status(403).send({ error: "Forbidden!! "+req.url });

})

export default router;