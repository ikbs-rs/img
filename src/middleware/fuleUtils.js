import fs from 'fs';
import path from 'path';
import  util from 'util';

const unlinkAsync = util.promisify(fs.unlink);
const writeFileAsync = util.promisify(fs.writeFile);
const mkdirAsync = util.promisify(fs.mkdir);
const existsAsync = util.promisify(fs.exists);


const uploadFile = async (file, destination, filename) => {
  try {
    // const filePath = path.join(destination, file.originalname);
    const filePath = path.join(destination, filename);
    // console.log(file, "Dosao u uploadFile*********************", filePath)

    // Provera da li direktorijum postoji
    const directoryExists = await existsAsync(destination);
    
    // Ako direktorijum ne postoji, kreiraj ga
    if (!directoryExists) {
      await mkdirAsync(destination, { recursive: true }); // `recursive` opcija će kreirati sve potrebne pod-direktorijume
    }    
    await writeFileAsync(filePath, file.buffer);
    console.log('File uploaded successfully:', filePath);
    return filePath;
  } catch (err) {
    console.error('Error uploading file:', err);
    throw err;
  }
};

const deleteFile = async (filePath) => {
  try {
    console.log("Dosao u deleteFileUtil", filePath)
    await unlinkAsync(filePath);
    console.log('File deleted successfully:', filePath);
  } catch (err) {
    console.error('Error deleting file:', err);
    throw err;
  }
};

const getFile = async (filePath, res) => {
  try {
    console.log("@@@@@@@@@@ Dosao u getFileUtil", filePath);
    const stream = fs.createReadStream(filePath);

    stream.on('error', (er) => {
      console.error('Error reading file:', er);
      res.status(500).json({ error: 'Error reading file' });
    });

    stream.pipe(res);
  } catch (er) {
    console.error('Error:', er);
    res.status(500).json({ error: 'Error reading file' });
  }
};




export default { 
  uploadFile, 
  deleteFile, 
  getFile, 
};
