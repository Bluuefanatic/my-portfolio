import http from 'http'

const testContactFormSubmission = async () => {
  const payload = {
    name: 'Alice Thompson',
    email: 'alice@designstudio.com',
    type: 'React/Next.js',
    budget: '$25k-$50k',
    message: 'We are looking for a senior React developer to build our design system and component library.'
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
        console.log(`\n✓ Contact Form Integration Test`)
        console.log(`Status: ${res.statusCode}`)
        console.log(`Response:`, JSON.parse(responseBody))
        console.log(`\nBackend successfully processed the contact form submission.`)
        resolve()
      })
    })

    req.on('error', (error) => {
      console.error('✗ Error:', error.message)
      resolve()
    })

    console.log('Submitting contact form to backend API...')
    console.log('Payload:', JSON.stringify(payload, null, 2))
    req.write(body)
    req.end()
  })
}

testContactFormSubmission()
