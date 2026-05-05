import http from 'http'

const testValidationError = async () => {
  const payload = {
    name: 'Bob', 
    email: 'invalid-email-format',
    type: 'Invalid Type',
    budget: '$500k+',
    message: 'Short'
  }

  const body = JSON.stringify(payload)
  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/contact',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(body)
    }
  }

  return new Promise((resolve) => {
    const req = http.request(options, (res) => {
      let responseBody = ''

      res.on('data', (chunk) => {
        responseBody += chunk
      })

      res.on('end', () => {
        const response = JSON.parse(responseBody)
        console.log(`\n✓ Validation Error Test (Frontend Error Handling)`)
        console.log(`Status: ${res.statusCode}`)
        console.log(`Error Response:`, JSON.stringify(response, null, 2))
        
        console.log(`\nFrontend will receive these field errors and display them inline:`)
        Object.entries(response.details || {}).forEach(([field, error]) => {
          console.log(`  - ${field}: ${error}`)
        })
        
        console.log(`\nFrontend will also show: "${response.error}"`)
        resolve()
      })
    })

    req.on('error', (error) => {
      console.error('✗ Error:', error.message)
      resolve()
    })

    console.log('Testing validation error scenario...')
    console.log('Invalid Payload:', JSON.stringify(payload, null, 2))
    req.write(body)
    req.end()
  })
}

testValidationError()
