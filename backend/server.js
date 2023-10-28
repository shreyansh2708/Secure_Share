const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');
const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
const multer = require("multer");
const { encryptAndHash, decrypt } = require('./crypto');
const { generateRandomToken } = require('./generateToken');
const crypto = require("crypto");
const fs = require('fs');

const app = express();
const PORT = 8000;

global.iv;

app.use(cors({ origin: true }));
app.use(express.json());
app.use(bodyParser.json());
app.set("view engine", "ejs");

//initialize firebase-admin and firebase sdk
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'share-ee81b.appspot.com', 
});

const multerStorage = multer.memoryStorage();
const upload = multer({ storage: multerStorage });

const storage = admin.storage();
const bucket = storage.bucket("share-ee81b.appspot.com");

//let receivedUid;

/*app.post('/', (req, res) => {
  receivedUid=req.body.uid;
  if (!receivedUid) {
    console.log("error occured");
    return res.status(400).json({ error: 'Missing UID in request body' });
  }
  if(authenticateUser){
    res.status(200).json({ message: 'Authentication successful' });
  }
});

//middleware to authenticate the user
//to use it everywhere you want
const authenticateUser = (req, res,next) => {
  const uid = receivedUid;
  if (!uid) {
    console.log("error occured");
    //return res.status(400).json({ error: 'Missing UID in request body' });
  }
  admin
     .auth()
     .getUser(uid)
     .then(userRecord => {
       // User is authenticated; you can trust the UID
       console.log('Successfully authenticated as:', userRecord.email);
       //console.log(`Received UID: ${uid}`);
       next();
     })
     .catch(error => {
       console.error('Error verifying UID:', error);
     });
};
*/
// Create a map to associate tokens with file names
let randomToken = '';
const tokenToFileMap = {};
app.get("/download", (req,res) => {
  if (randomToken) {
    res.json({ token: randomToken });
  }
});


let encryptionKey;

app.post("/upload",upload.single('fileUpload'), async (req, res) => {
  try {
    if (!req.file) {
      console.log("try File upload failed");
      return res.status(400).json({ error: "No file uploaded" });
    }
    //const uid = receivedUid;
    // Generate a random AES encryption key
    encryptionKey = crypto.randomBytes(32);
    //Generate a random token for the uploaded file
    //4 bytes (8 characters) 2 bytes (4 characters) 
    randomToken = generateRandomToken(3);
  
    const giveCurrentDateTime = () => {
      const today = new Date();
      const date =
        today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
      const time =
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      const dateTime = date + " " + time;
      return dateTime;
    };

    const dateTime = giveCurrentDateTime();
    let fileData = req.file.buffer;
    
    // Use the encryption module to encrypt and hash the file
    const {encryptedData, iv} = encryptAndHash(fileData, encryptionKey); 
    global.iv = iv;

    fileData = req.file;
    const fileName = `files/${randomToken}_${fileData.originalname}_${dateTime}`;

    // Store the mapping of the token to the file name
    tokenToFileMap[randomToken] = fileName;
    
    // Upload the file to Firebase Storage
    const file = bucket.file(fileName);
    await file.save(encryptedData);

    console.log("File Encrypted uploaded successfully");
    res.status(200).json({ message: "File Encrypted & uploaded successfully" });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ error: "File upload failed" });
  } 
});

let decryptedData;
app.post("/downloadViaToken", async(req,res) => {

   // console.log(tokenToFileMap);
    const tokenData = req.body.data;

    if(tokenData in tokenToFileMap){
      const fileName = tokenToFileMap[tokenData];
      const file = bucket.file(fileName);

    // Download the file from Firebase Storage.
    const fileData = (await file.download());
    const fileBuffer = fileData[0]
    const IV = global.iv; 
  
    decryptedData = decrypt(fileBuffer, encryptionKey, IV);

    //console.log('Decrypted data:', decryptedData);
    // Specify the file path where you want to save the PDF
    const filePath = '../public/pdfs/decrypted.pdf';

    // Write the decrypted data to a binary file
    fs.writeFileSync(filePath, decryptedData);
    }
    else{
      console.log("Invalid Token");
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});