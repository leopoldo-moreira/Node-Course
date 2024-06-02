const fs = require("fs");

const oldFile = "arquivo.txt";
const newFile = "novoArquivo.txt";

fs.rename(oldFile, newFile, (err) => {
    if (err){
        console.log(err);
    } else {
        console.log(`O arquivo ${oldFile} teve seu nome trocado para ${newFile}`);
    }
});
