// external modules
const inquirer = require("inquirer");
const chalk = require("chalk");

// internal modules
const fs = require("fs");

function operation () {
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
}

// create an account
function createAccount() {
  console.log(chalk.bgGreen.black("Congratulations for choosing our bank!"));
  console.log(chalk.green("Define the options of your account, as shown below."));
  buildAccount();
}

function buildAccount() {

  inquirer.prompt([
    {
      name: "accountName",
      message: "Create an account name:"
    }
  ]).then(answer => {
    
    const accountName = answer["accountName"];
    const accountPath = `./accounts/${accountName}.json`;
    console.info(accountName);

    if (!fs.existsSync("accounts")) {
      fs.mkdirSync("accounts");
    }

    if (fs.existsSync(accountPath)) {
      console.error(
        chalk.black.bgRed(
          `The account name ${accountName} already exists! Please choose another one.`
        )        
      );
      buildAccount();
      return;
    }

    fs.writeFileSync(
      accountPath,
      '{"balance": 0}',
      (err) => {
        console.error(err);
      }
    );

    console.info(chalk.bgGreen.black("Account created with succefully!"));
    operation();

  }).catch((err) => console.log(err));
}

operation();