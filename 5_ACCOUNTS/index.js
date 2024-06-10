// external modules
const inquirer = require("inquirer");
const chalk = require("chalk");

// internal modules
const fs = require("fs");

inquirer.prompt([
  {
    type: "list",
    name: "action",
    message: "What do you want to do?",
    choices: ["Create an Account", "Balance", "Deposit", "Withdraw", "Exit"],
  },
]).then((answer) => {

    const action = answer["action"];

    if (action === "Create an Account") {
        createAccount();
    }
}).catch(err => console.log(err));

// create an account

function createAccount () {
    console.log(chalk.bgGreen.black("Congratulations for choosing our bank!"));
    console.log(chalk.green("Define the options of your account, as shown below."));
}