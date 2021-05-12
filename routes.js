const fs = require('fs')

const requestHandler = (req, res) => {
    const url = req.url
    const method = req.method
    if (url === '/') {
        res.setHeader('Content-Type', 'text/html')
        res.write('<html>')
        res.write('<head><title>Home page</title></head>')
        res.write('<body><h1>Hello, this is greetings</h1><form action="/create-user", method="POST"><input type="text" name="users" placeholder="username"><button type="submit">Send</button></form>')
        res.write('</body>')
        res.write('</html>')
        return res.end()
    }
    if (url === '/create-user' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        })
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString()
            const user = parsedBody.split('=')[1]
            console.log(user);
        })
        res.statusCode = 302;
        res.setHeader('Location', '/')
        res.end()
    }
    if (url === '/users') {
        res.setHeader('Content-Type', 'text/html')
        res.write('<html>')
        res.write('<head><title>User page</title></head>')
        res.write('<body><ul><li>Lily Rose</li><li>Paul Smith</li></ul></body>')
        res.write('</html>')
        return res.end()
    }
}

module.exports = requestHandler