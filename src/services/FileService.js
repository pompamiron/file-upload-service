const AWS = require('aws-sdk');

const S3 = new AWS.S3();

async function uploadFileToS3(fileName, fileBuffer) {
  // Generate a unique key for the S3 file
  const s3Key = `${Date.now()}-${fileName}`;

  // Upload the file to S3
  await S3.upload({
    Bucket: process.env.S3_BUCKET,
    Key: s3Key,
    Body: fileBuffer,
  }).promise();

  return s3Key;
}

module.exports = {
  uploadFileToS3,
};
