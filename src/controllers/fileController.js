import multer from "multer";
import path from "path";
import fileUtils from "../middleware/fuleUtils.js"; 
import { cwd } from "node:process";

const storage = multer.memoryStorage(); // Koristimo memoryStorage za upload

const upload = multer({ storage });

const uploadFile = (req, res) => {
  // console.log(req.rawHeaders,"Dosao u Kontroler");
  upload.single("file")(req, res, async (err) => {
    if (err) {
      console.error("Error uploading file:", err);
      return res.status(500).json({ error: "Error uploading file" });
    }

    try {
      const relPath = req.query.relpath
      //const destination = path.join(process.cwd(), "/public/tic/");
      const destination = path.join(process.cwd(), relPath);
      const resizeOptions = req.body.resizeOptions
        ? JSON.parse(req.body.resizeOptions)
        : null;

      // console.log( req.query, "Dosao da pokusam***********************************", destination);
      const filePath = await fileUtils.uploadFile(req.file, destination, req.query.filename, resizeOptions);
      return res.status(200).json({ message: "File uploaded successfully", filePath });
    } catch (error) {
      return res.status(500).json({ error: "Error uploading file" });
    }
  });
};

const deleteFile = async (req, res) => {
  const fileName = req.params.fileName;

  try {
    const filePath = path.join(process.cwd(), "/public/tic/", fileName);
    await fileUtils.deleteFile(filePath);
    return res.json({ message: "File deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Error deleting file" });
  }
};

const getFile = async (req, res) => {
  // console.log("Dosao u getFileControler");
  const fileName = req.params.fileName;

  try {
    const relPath = req.query.relpath
      //const destination = path.join(process.cwd(), "/public/tic/");
      const destination = path.join(process.cwd(), relPath, fileName);
    // console.log( "Dosao da pokusam!!!!!!", destination);
    await fileUtils.getFile(destination, res);
  } catch (er) {
    console.error("Error getting file:", er);
    res.status(500).json({ error: "Error getting file" });
  }
};

export default {
  uploadFile,
  deleteFile,
  getFile,
};
