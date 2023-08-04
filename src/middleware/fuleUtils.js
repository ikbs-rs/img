import fs from 'fs/promises';
import path from 'path';

const uploadFile = async (file, destination) => {
  try {
    const filePath = path.join(destination, file.originalname);
    await fs.writeFile(filePath, file.buffer);
    console.log('File uploaded successfully:', filePath);
    return filePath;
  } catch (err) {
    console.error('Error uploading file:', err);
    throw err;
  }
};

const deleteFile = async (filePath) => {
  try {
    await fs.unlink(filePath);
    console.log('File deleted successfully:', filePath);
  } catch (err) {
    console.error('Error deleting file:', err);
    throw err;
  }
};

const getFile = async (req, res) => {
  const fileName = req.params.filename;
  const filePath = path.join(process.cwd(), '/public/tic/images', fileName);

  try {
    const fileStream = await fs.createReadStream(filePath);
    fileStream.pipe(res);
  } catch (error) {
    console.error('Error reading file:', error);
    return res.status(500).json({ error: 'Error reading file' });
  }
};

export default { 
  uploadFile, 
  deleteFile, 
  getFile, 
};
