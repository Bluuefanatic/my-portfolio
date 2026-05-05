import http from 'http'

const testCases = [
    {
        name: 'Valid submission',
        data: {
            name: 'Jane Doe',
            email: 'jane@email.com',
            type: 'React/Next.js',
            budget: '$50k-$100k',
            message: 'I need help building a React application with advanced features and scalability.'
        }
    },
    {
        name: 'Missing email',
        data: {
            name: 'John Smith',
            type: 'Frontend development',
            budget: '$25k-$50k',
            message: 'Need a responsive portfolio website.'
        }
    },
    {
        name: 'Invalid email format',
        data: {
            name: 'Bob Jones',
            email: 'not-an-email',
            type: 'QA & Testing',
            budget: '$10k-$25k',
            message: 'Looking for testing expertise and automation.'
        }
    },
    {
        name: 'Message too short',
        data: {
            name: 'Alice Brown',
            email: 'alice@email.com',
            type: 'Frontend development',
            budget: '$10k-$25k',
            message: 'Need help'
        }
    },
    {
        name: 'Invalid project type',
        data: {
            name: 'Charlie White',
            email: 'charlie@email.com',
            type: 'Invalid Type',
            budget: '$50k-$100k',
            message: 'This is a very detailed message about our project needs.'
        }
    },
    {
        name: 'Invalid budget',
        data: {
            name: 'Diana Prince',
            email: 'diana@email.com',
            type: 'React/Next.js',
            budget: '$500k+',
            message: 'This is a very detailed message about our complex requirements.'
        }
    }
]

async function runTests() {
    for (const testCase of testCases) {
        console.log(`\n${'='.repeat(50)}`)
        console.log(`Test: ${testCase.name}`)
        console.log('='.repeat(50))

        const body = JSON.stringify(testCase.data)

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

        await new Promise((resolve) => {
            const req = http.request(options, (res) => {
                let responseData = ''

                res.on('data', (chunk) => {
                    responseData += chunk
                })

                res.on('end', () => {
                    console.log(`Status: ${res.statusCode}`)
                    try {
                        const parsed = JSON.parse(responseData)
                        console.log('Response:', JSON.stringify(parsed, null, 2))
                    } catch {
                        console.log('Response:', responseData)
                    }
                    resolve()
                })
            })

            req.on('error', (error) => {
                console.error('Error:', error.message)
                resolve()
            })

            req.write(body)
            req.end()

            setTimeout(() => resolve(), 1000)
        })
    }

    console.log('\n✓ All tests completed')
    process.exit(0)
}

runTests()
