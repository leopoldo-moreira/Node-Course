const http = require("http");
const url = require("url");
const fs = require("fs");
const port = 3000;
const headHtml = { "Content-Type": "text/html" };
const pathTo404 = "./static/404.html";

const server = http.createServer((req, res) => {
  const urlInfo = url.parse(req.url, true);
  const fileName = urlInfo.pathname.substring(1);

  if (fs.existsSync(fileName)) {
    fs.readFile(fileName, (err, data) => {
      res.writeHead(200, headHtml);
      res.end(data);
    });
  } else {
    fs.readFile(pathTo404, (err, data) => {
      res.writeHead(404, headHtml);
      res.end(data);
    });
  }
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
