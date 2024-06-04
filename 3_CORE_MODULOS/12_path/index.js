const path = require('path');

const customPath = "/path/to/file/file.pdf";

console.log(path.dirname(customPath));
console.log(path.basename(customPath));
console.log(path.extname(customPath));