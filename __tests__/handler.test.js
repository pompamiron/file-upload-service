const { handler } = require('../fileUploadHandler')
const FileService = require('../src/services/FileService')
const EmailService = require('../src/services/EmailService')

// Mocking the FileService and EmailService
jest.mock('../src/services/FileService', () => ({
  uploadFileToS3: jest.fn().mockResolvedValue('mock-s3-key'),
}))

jest.mock('../src/services/EmailService', () => ({
  sendEmailNotification: jest.fn().mockResolvedValue(),
}))

describe('Lambda Handler', () => {
  // Positive Test Cases
  it('should return 200 and success message on successful upload', async () => {
    const mockEvent = {
      body: JSON.stringify({
        email: 'test@example.com',
        file: {
          fileName: 'test-file.txt',
          fileData: Buffer.from('test file data').toString('base64'),
        },
      }),
    }

    const result = await handler(mockEvent)
    expect(result.statusCode).toBe(200)
    expect(JSON.parse(result.body).message).toBe(
      'File uploaded and email sent successfully'
    )
  })

  // Negative Test Cases: Missing Parameters
  it('should return 400 for missing email', async () => {
    const mockEvent = {
      body: JSON.stringify({
        file: {
          fileName: 'test-file.txt',
          fileData: Buffer.from('test file data').toString('base64'),
        },
      }),
    }

    const result = await handler(mockEvent)
    expect(result.statusCode).toBe(400)
    expect(JSON.parse(result.body).message).toBe('Missing required parameters')
  })

  it('should return 400 for missing file data', async () => {
    const mockEvent = {
      body: JSON.stringify({
        email: 'test@example.com',
        file: {
          fileName: 'test-file.txt',
        },
      }),
    }

    const result = await handler(mockEvent)
    expect(result.statusCode).toBe(400)
    expect(JSON.parse(result.body).message).toBe('Missing required parameters')
  })

  it('should return 400 for missing file name', async () => {
    const mockEvent = {
      body: JSON.stringify({
        email: 'test@example.com',
        file: {
          fileData: Buffer.from('test file data').toString('base64'),
        },
      }),
    }

    const result = await handler(mockEvent)
    expect(result.statusCode).toBe(400)
    expect(JSON.parse(result.body).message).toBe('Missing required parameters')
  })

  // Negative Test Cases: Invalid Data
  it('should return 400 for invalid base64 file data', async () => {
    const mockEvent = {
      body: JSON.stringify({
        email: 'test@example.com',
        file: {
          fileName: 'test-file.txt',
          fileData: 'invalid-base64-data',
        },
      }),
    }

    const result = await handler(mockEvent)
    expect(result.statusCode).toBe(400)
    expect(JSON.parse(result.body).message).toBe('Invalid file data format')
  })

  it('should return 400 for invalid file type', async () => {
    const mockEvent = {
      body: JSON.stringify({
        email: 'test@example.com',
        file: {
          fileName: 'invalid-file.exe',
          fileData: Buffer.from('test file data').toString('base64'),
        },
      }),
    }

    const result = await handler(mockEvent)
    expect(result.statusCode).toBe(400)
    expect(JSON.parse(result.body).message).toBe('Invalid file type')
  })

  // Negative Test Cases: Service Errors
  it('should return 500 and error message on S3 upload error', async () => {
    const mockEvent = {
      body: JSON.stringify({
        email: 'test@example.com',
        file: {
          fileName: 'test-file.txt',
          fileData: Buffer.from('test file data').toString('base64'),
        },
      }),
    }

    const mockError = new Error('Test S3 upload error')
    jest.spyOn(FileService, 'uploadFileToS3').mockRejectedValue(mockError)

    const result = await handler(mockEvent)
    expect(result.statusCode).toBe(500)
    expect(JSON.parse(result.body).message).toBe('An error occurred')
  })

  it('should return 500 and error message on email send error', async () => {
    const mockEvent = {
      body: JSON.stringify({
        email: 'test@example.com',
        file: {
          fileName: 'test-file.txt',
          fileData: Buffer.from('test file data').toString('base64'),
        },
      }),
    }

    const mockError = new Error('Test email send error')
    jest
      .spyOn(EmailService, 'sendEmailNotification')
      .mockRejectedValue(mockError)

    const result = await handler(mockEvent)
    expect(result.statusCode).toBe(500)
    expect(JSON.parse(result.body).message).toBe('An error occurred')
  })
})
