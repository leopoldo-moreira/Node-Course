// external modules
const inquirer = require("inquirer");
const chalk = require("chalk");

// internal modules
const fs = require("fs");

operation();

function operation() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "What do you want to do?",
        choices: [
          "Create an Account",
          "Deposit",
          "Balance",
          "Withdraw",
          "Exit",
        ],
      },
    ])
    .then((answer) => {
      const action = answer["action"];

      if (action === "Create an Account") {
        createAccount();
      } else if (action === "Deposit") {
        deposit();
      } else if (action === "Balance") {
      } else if (action === "Withdraw") {
      } else if (action === "Exit") {
        console.clear();
        console.log(chalk.bgBlue.black("Thank you for using Accounts App!"));
        process.exit();
      }
    })
    .catch((err) => console.log(err));
}

// create an account

function createAccount() {
  console.clear();
  console.log(chalk.bgGreen.black("Congratulations for choosing our bank!"));
  console.log(
    chalk.green("Define the options of your account, as shown below.")
  );
  buildAccount();
}

function buildAccount() {
  inquirer
    .prompt([
      {
        name: "accountName",
        message: "Create an account name:",
      },
    ])
    .then((answer) => {
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

      fs.writeFileSync(accountPath, '{"balance": 0}', (err) => {
        console.error(err);
      });

      console.info(chalk.bgGreen.black("Account created with succefully!"));
      operation();
    })
    .catch((err) => console.log(err));
}

// deposit

function deposit() {
  inquirer
    .prompt([
      {
        name: "accountName",
        message: "Enter your account name:",
      },
    ])
    .then((answer) => {

      const accountName = answer['accountName'];

      if (!checkAccount(accountName)) {
        return deposit();
      }
    })
    .catch((err) => console.log(err));
}

function checkAccount(accountName) {
  if (!fs.existsSync(`./accounts/${accountName}.json`)) {
    console.log(
      chalk.bgRed.black(
        `The account name ${accountName} does not exist! Please try again.`
      )
    );
    return false;
  }

  return true;
}
