const FileService = require('./src/services/FileService');
const EmailService = require('./src/services/EmailService');
const Base64Validator = require('./src/validators/Base64Validator');
const FileTypeValidator = require('./src/validators/FileTypeValidator');
const FileSizeValidator = require('./src/validators/FileSizeValidator');

exports.handler = async (event) => {
    try {
      // Parse incoming event body
      const body = JSON.parse(event.body);
  
      // Validate required parameters
      if (!body.email || !body.file || !body.file.fileName || !body.file.fileData) {
        return {
          statusCode: 400,
          body: JSON.stringify({ message: 'Missing required parameters' }),
        };
      }
  
      // Get the file details from the event
      const { fileName, fileData } = body.file;
  
      // Validate file data
      if (!Base64Validator.isValidBase64(fileData)) {
        return {
          statusCode: 400,
          body: JSON.stringify({ message: 'Invalid file data format' }),
        };
      }
  
      // Validate file type
      if (!FileTypeValidator.isValidFileType(fileName)) {
        return {
          statusCode: 400,
          body: JSON.stringify({ message: 'Invalid file type' }),
        };
      }
  
      // Validate file size
      if (!FileSizeValidator.isValidFileSize(fileData)) {
        return {
          statusCode: 400,
          body: JSON.stringify({ message: 'File size exceeds limit' }),
        };
      }

      // Convert file data from base64 to a buffer
      const fileBuffer = Buffer.from(fileData, 'base64');
  
      // Upload the file to S3
      const s3Key = await FileService.uploadFileToS3(fileName, fileBuffer);
  
      // // Send email notification
      await EmailService.sendEmailNotification(body.email, `Your file (${s3Key}) has been uploaded.`);
  
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'File uploaded and email sent successfully' }),
      };
    } catch (error) {
      console.error('Error:', error);
      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'An error occurred' }),
      };
    }
  };
  
