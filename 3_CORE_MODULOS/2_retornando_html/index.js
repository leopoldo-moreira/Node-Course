const http = require('http')

const port = 3000

const server = http.createServer((req, res) => {
    res.statusCode = 200
    res.setHeader('Contenty-type', 'text/html')
    res.end('<h1>Hello World! em HTML</h1>')
})

server.listen(port, ()=> {
    console.log(`Server running at http://localhost:${port}`)
})