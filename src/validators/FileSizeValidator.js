const maxFileSize = 500 * 1024 * 1024; // 500MB

function isValidFileSize(fileData) {
  const fileSize = Buffer.byteLength(fileData, 'base64');
  return fileSize <= maxFileSize;
}

module.exports = {
  isValidFileSize,
};
