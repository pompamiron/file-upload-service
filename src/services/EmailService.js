const AWS = require('aws-sdk');

const SES = new AWS.SES();

async function sendEmailNotification(emailAddress, message) {
  await SES.sendEmail({
    Source: process.env.SENDER_EMAIL,
    Destination: {
      ToAddresses: [emailAddress],
    },
    Message: {
      Subject: {
        Data: 'File Upload Notification',
      },
      Body: {
        Text: {
          Data: message,
        },
      },
    },
  }).promise();
}

module.exports = {
  sendEmailNotification,
};
