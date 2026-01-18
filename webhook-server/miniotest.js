const Minio = require('minio');
const fs = require('fs');
const https = require('https');
const http = require('http');
const crypto = require('crypto');

// Configura MinIO client
const minioClient = new Minio.Client({
  endPoint: 'localhost',
  port: 9000,
  useSSL: false,
  accessKey: 'admin',
  secretKey: 'admin12345'
});

// Genera presigned URL + scarica file + hash
async function generaLink() {
  try {
    const url = await minioClient.presignedGetObject(
      'masa',            // bucket
      '0.dump',          // oggetto
      60 * 60,           // durata: 1 ora
      {
        'response-content-type': 'application/octet-stream',
        'response-content-disposition': 'attachment; filename="documento.pdf"'
      }
    );
     const url1 = await minioClient.presignedGetObject(
      'masa',            // bucket
      '0mod.dump',          // oggetto
      60 * 60,           // durata: 1 ora
      {
        'response-content-type': 'application/octet-stream',
        'response-content-disposition': 'attachment; filename="documento.pdf"'
      }
    );

     const url2 = await minioClient.presignedGetObject(
      'masa',            // bucket
      '0nomod.dump',          // oggetto
      60 * 60,           // durata: 1 ora
      {
        'response-content-type': 'application/octet-stream',
        'response-content-disposition': 'attachment; filename="documento.pdf"'
      }
    );


    console.log("Presigned URL:", url);

    // Nome file locale
    const fileName = '0.dump';
    const fileName1='0mod.dump'
    const fileName2='0nomod.dump'

    // Scarica il file
    await downloadFile(url, fileName);
    await downloadFile(url1,fileName1);
    await downloadFile(url2,fileName2);

    console.log("File scaricato con successo!");

    // Calcola HASH del file scaricato
    const hash = await calculateFileHash(fileName);
    const hash1=await calculateFileHash(fileName1);
    const hash2=await calculateFileHash(fileName2);

    console.log("SHA-256 hash del file:", hash);
    console.log("SHA-256 hash del file:", hash1);
    console.log("SHA-256 hash del file:", hash2);

  } catch (err) {
    console.error("Errore:", err);
  }
}

// Funzione che scarica un file da un URL
function downloadFile(url, outputName) {
  return new Promise((resolve, reject) => {
    const mod = url.startsWith("https") ? https : http;

    const file = fs.createWriteStream(outputName);

    mod.get(url, res => {
      if (res.statusCode !== 200) {
        return reject(new Error(`Errore download: ${res.statusCode}`));
      }

      res.pipe(file);

      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', err => {
      fs.unlink(outputName, () => {}); // cancella file incompleto
      reject(err);
    });
  });
}

// Funzione che calcola SHA-256 del file
function calculateFileHash(filePath) {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash('sha256');
    const stream = fs.createReadStream(filePath);

    stream.on('data', chunk => hash.update(chunk));
    stream.on('end', () => resolve(hash.digest('hex')));
    stream.on('error', reject);
  });
}

generaLink();
