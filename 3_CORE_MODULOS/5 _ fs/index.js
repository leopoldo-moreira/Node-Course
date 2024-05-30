const http = require('http');
const fs = require('fs');
const port = 3000;

const server = http.createServer((req,res) =>{
    fs.readFile('mensagem.html', (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-type': 'text-plain' });
            res.end('Erro ao ler o arquivo');
        } else {
            res.writeHead(200, { 'Content-Type':'text/html' });
            res.end(data);
        }
    })
})

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});