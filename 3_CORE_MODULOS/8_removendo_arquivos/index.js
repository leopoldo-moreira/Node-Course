const fs = require("fs");

fs.unlink("arquivo.txt", (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Arquivo Removido!");
  }
});
