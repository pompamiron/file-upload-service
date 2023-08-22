const allowedExtensions = [
  'txt',
  'jpg',
  'jpeg',
  'png',
  'pdf',
  'doc',
  'docx',
  'zip',
]

function isValidFileType(fileName) {
  const fileExtension = fileName.split('.').pop().toLowerCase()
  return allowedExtensions.includes(fileExtension)
}

module.exports = {
  isValidFileType,
}
