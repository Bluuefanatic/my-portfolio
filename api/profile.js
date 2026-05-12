export default async function handler(req, res) {
    if (req.method !== 'GET') {
        res.setHeader('Allow', ['GET'])
        return res.status(405).json({ error: 'Method not allowed' })
    }

    return res.status(200).json({
        name: 'Joel Iziren',
        role: 'Frontend Developer · Software Engineer',
        email: 'izirenjoel@gmail.com',
        linkedin: 'https://www.linkedin.com/in/joel-iziren',
        github: 'https://github.com/Bluuefanatic',
    })
}
