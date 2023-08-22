# File Upload Service

Welcome to the **File Upload Service** project! This is a serverless REST API built using the Serverless Framework, AWS Lambda, and AWS API Gateway. It allows you to upload files to an S3 bucket and send email notifications.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Configuration](#configuration)
  - [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [API Documentation](#api-documentation)
- [Usage](#usage)
- [Testing](#testing)
  - [Unit Testing](#unit-testing)
  - [API Testing](#api-testing)
- [Planned Features](#planned-features)
- [License](#license)

## Features

- Upload files to an S3 bucket.
- Send email notifications when files are uploaded.
- API key-based authentication for secure access.

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- AWS account and credentials
- Serverless Framework

### Installation

1. Clone this repository:

   `git clone https://github.com/pompamiron/file-upload-service.git`

2. Install project dependencies:

  `cd file-upload-service`

  `npm install`

## Configuration

### Environment Variables

Before deploying the service, you need to set up the necessary environment variables:

- `SENDER_EMAIL`: Your sender email address for sending notifications.
- `S3_BUCKET`: The name of your S3 bucket for file uploads.
- `IAM_ROLE`: The code of your IAM ROLE for permissions control.

## Deployment

Deploy the service using the Serverless Framework:

  `serverless deploy`

## API Documentation

The API documentation is provided in the swagger.yaml file in this repository. You can access it by opening the swagger.yaml file directly. The Swagger documentation provides detailed information about the API endpoints, request parameters, and responses.

## Usage

To use the API, make HTTP requests to the deployed endpoints. You will need an API key for authentication, which you can include in the x-api-key header of your requests.

Here's an example using cURL:

  `curl -X POST \
    -H "x-api-key: YOUR_API_KEY_HERE" \
    -H "Content-Type: application/json" \
    -d '{
      "email": "test@example.com",
      "file": {
        "fileName": "test-file.txt",
        "fileData": "base64-encoded-file-data"
      }
    }' \
  https://your-api-url/dev/file_upload_service`

## Testing

### Unit Testing

For unit testing the Lambda functions, this project uses Jest. Jest is a JavaScript testing framework that provides a convenient way to write tests and mock dependencies.

To run unit tests:

  `npm test`

The test cases are defined in the __tests__ directory.

### API Testing

For testing the API, you can use Jest for unit testing and Postman for API testing. `The FILE-UPLOAD-SERVICE API Tests.postman_collection.json` file in this repository contains a Postman collection with predefined test cases for the API endpoints. You can import this collection into Postman and run the tests interactively or automate them using Newman in your CI/CD pipeline.

## Planned Features
I am actively developing new features for the File Upload Service, including the implementation of a virus scan function to ensure uploaded files are safe. Stay tuned for updates on this exciting addition!

## License
This project is licensed under the MIT License.


