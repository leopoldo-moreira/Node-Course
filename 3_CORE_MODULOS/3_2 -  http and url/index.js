const http = require('http')
const port = 3000

const server = http.createServer((req,res) =>{

    const urlInfo = require('url').parse(req.url)
    console.log(urlInfo)
})

server.listen(port, () =>{
    console.log(`Server running at http://localhost:3000`)
})