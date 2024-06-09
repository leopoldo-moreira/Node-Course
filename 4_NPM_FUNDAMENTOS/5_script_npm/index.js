import chalk from "chalk";

const _ = require("lodash");

const arr1 = [1, 2, 3, 4, 5];
const arr2 = [2, 4, 6, 8, 10];

const deff = _.difference(arr1, arr2);

console.log(chalk.bgRed.bold(deff));