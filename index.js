import express  from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import router from './src/routes/indexRoute.js' 
import fs from 'fs';
import  http  from 'http';
import https from 'https';

const app = express()
dotenv.config()
app.use(cors())

const httpPort = process.env.APP_PORT 
const httpsPort = process.env.HTTPS_PORT || 3443; // HTTPS port
const sslDir = process.env.SSL_DIR
const rootDir = process.env.ROOT_DIR
const webDomen = process.env.WEB_DOMEN

// Učitavanje SSL/TLS sertifikata i privatnog ključa
const privateKey = fs.readFileSync(`${sslDir}localhost.key`, 'utf8');
const certificate = fs.readFileSync(`${sslDir}localhost.crt`, 'utf8');
const credentials = { key: privateKey, cert: certificate };


app.use((req, res, next) => {
  const allowedOrigins = [webDomen, '*.ems.local'];
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }    
  //res.setHeader('Access-Control-Allow-Origin', `${webDomen}`);
  next();
});


app.use((req, res, next) => { 
  // console.log(rootDir, "************IMG**************", req.url)
  next();
});

//app.use(forceHttps); // Osiguranje da zahtevi budu preusmereni na HTTPS

app.use(`/${rootDir}`,router)


// Kreiranje HTTP servera
const httpServer = http.createServer(app);

// Kreiranje HTTPS servera
const httpsServer = https.createServer(credentials, app);



httpServer.listen(httpPort, () => {
  console.log(`HTTP Server je pokrenut na adresi ${httpPort}`);
});

httpsServer.listen(httpsPort, () => {
   console.log(`HTTPS Server je pokrenut na adresi ${httpsPort}`);
});