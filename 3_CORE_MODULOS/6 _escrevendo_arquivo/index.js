const http = require('http');
const url = require('url');
const fs = require('fs');
const port = 3000;

const server = http.createServer((req, res) => {
    const urlInfo = url.parse(req.url, true);
    const name = urlInfo.query.name;

    if (!name){
        fs.readFile('index.html', (err ,data) => {
            res.writeHead(200, { 'Content-Type': 'text/html'});
            res.end(data);
        });
    } else {
        fs.writeFile("arquivo.txt", name, (err, data) => {
            res.writeHead(302, {
                Location: "/"
            });
            res.end();
        });
    }
});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});