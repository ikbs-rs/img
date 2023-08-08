import fs from 'fs';
import path from 'path';
import  util from 'util';

const unlinkAsync = util.promisify(fs.unlink);
const writeFileAsync = util.promisify(fs.writeFile);


const uploadFile = async (file, destination) => {
  try {
    const filePath = path.join(destination, file.originalname);
    console.log("Dosao u deleteFileUtil", filePath)
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
    console.log("Dosao u getFileUtil", filePath)
    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  } catch (error) {
    console.error('Error reading file:', error);
    res.status(500).json({ error: 'Error reading file' });
  }
};



export default { 
  uploadFile, 
  deleteFile, 
  getFile, 
};
