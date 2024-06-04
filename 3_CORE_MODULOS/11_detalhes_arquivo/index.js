const fs = require("fs");

fs.stat("arquivo.txt", (err, stats) => {
  if (err) {
    return console.log(err);
  } else {
    console.log(stats);
  }
});
