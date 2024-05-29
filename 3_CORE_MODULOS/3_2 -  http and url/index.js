const http = require('http')
const port = 3000



const server = http.createServer((req,res) =>{

    const urlInfo = require('url').parse(req.url)
    console.log(urlInfo)

    res.setHeader('Content-type', 'Text/plain')

    if (urlInfo.path === '/'){
        res.end('Welcome to the homepage!')
    }else if (urlInfo.path === '/hello'){
        res.end('Hello, world!')
    }else if (urlInfo.path === '/goodbye'){
        res.end('Goodbye, world!')
    }else{
        res.end('404 Not Found')
    }
})

server.listen(port, () =>{
    console.log(`Server running at http://localhost:3000`)
})