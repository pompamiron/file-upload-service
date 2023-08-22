function isValidBase64(input) {
  try {
    return Buffer.from(input, 'base64').toString('base64') === input
  } catch (error) {
    return false
  }
}

module.exports = {
  isValidBase64,
}
