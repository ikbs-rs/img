import express from 'express'
import fileRouter from "./services/fileRouter.js";
import { checkJwt, checkPermissions, checkPermissionsEx } from '../security/interceptors.js'

const router = express.Router();

//router.use(checkJwt); // provera JWT tokena na svakom zahtevu
router.use(express.json())


router.use((req, res, next) => {
  if (req.path.startsWith("/adm/services/sign")) {
    return next();
  }
  checkJwt(req, res, next);
});

// Moze da se svede na jedan ruter ali volim da vidim sta je sve implementirano!!!

 
router.use('/public', checkPermissions(), fileRouter)  


router.use("/", (req, res, next) => {
  next();
  return res.status(403).send({ error: "Forbidden!! "+req.url });

})

export default router;