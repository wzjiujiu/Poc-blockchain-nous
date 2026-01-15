const Minio = require('minio');

// Configura il client MinIO
const minioClient = new Minio.Client({
  endPoint: 'localhost',
  port: 9000,
  useSSL: false,
  accessKey: 'admin',
  secretKey: 'admin12345'
});

// Genera un presigned URL
async function generaLink() {
  try {
    const url = await minioClient.presignedGetObject(
      'masa',       // nome bucket
      'ssrn-3432976.pdf',    // nome file
      60 * 60 ,            // durata (in secondi): 1 ora
      {
    'response-content-type': 'application/octet-stream',
    'response-content-disposition': 'attachment; filename="documento.pdf"'
     }

    );

    console.log("Presigned URL:", url);
  } catch (err) {
    console.error("Errore:", err);
  }
}

generaLink();