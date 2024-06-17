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
        getAccountBalance();
      } else if (action === "Withdraw") {
        withdraw();
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

      // verify if account exists.
      if (!checkAccount(accountName)) {
        return deposit();
      }

      inquirer.prompt([
        {
          name: "amount",
          message: "How much do you want to deposit?"
        }
      ]).then((answer) => {
        const amount = answer['amount'];

        //add an amount
        addAmount(accountName, amount);
        operation();

      }).catch((err) => console.log(err))


    })
    .catch((err) => console.log(err));
}

function checkAccount(accountName) {
  if (!fs.existsSync(`./accounts/${accountName}.json`)) {
    console.clear();
    console.log(
      chalk.bgRed.black(
        `The account name ${accountName} does not exist! Please try again.`
      )
    );    
    return false;
  }  
  return true;
}

function addAmount(accountName, amount) {

  const accountData = getAccount(accountName);

  if (!amount) {
    errorMsg('An error occurred. Please try again later.');
    return deposit();
  }

  accountData.balance = parseFloat(amount) + parseFloat(accountData.balance);
  fs.writeFileSync(
   `./accounts/${accountName}.json`,
   JSON.stringify(accountData),
   (err) => {
    console.error(err)
   }
  );

  console.clear();
  successMsg(`The amount of $${amount} has been deposited in your account.`);
  

}

function getAccount(accountName) {
  const accountJSON = fs.readFileSync(`./accounts/${accountName}.json`, {
    encoding: 'utf8',
    flag: 'r'
  });
  return JSON.parse(accountJSON);
};

function errorMsg(text) {  
  console.error(
    chalk.bgRed.bold(text)    
  );
};

function successMsg(text) {
  console.log(
    chalk.bgGreen.bold(text)
  );
};

function infoMsg(text) {
  console.log(
    chalk.bgBlue.bold(text)
  );
};

// show account balance

function getAccountBalance() {
  inquirer.prompt([
    {
      name: 'accountName',
      message: 'Whats is your account name?'
    }
  ]).then(
    (answer) => {
      const accountName = answer["accountName"];

      // verify if account exists

      if (!checkAccount(accountName)) {
        return getAccountBalance();
      }

      const accountData = getAccount(accountName);

      infoMsg(`Your account balance is $${accountData.balance}.`);
      operation();

    }
  ).catch((err) => console.error(err));
};


// withdraw an amount from user account
function withdraw() {
  inquirer.prompt([
    {
      name: 'accountName',
      message: 'Type your account name: '
    }
  ]).then((answer) => {

    const accountName = answer['accountName'];
    if (!checkAccount(accountName)) {
      return withdraw();
    }

    inquirer.prompt([
      {
        name: 'amount',
        message: 'How much to withdraw?'
      }
    ]).then((answer) => {

      const amount = answer['amount']
      removeAmount(accountName, amount);

    })
    .catch(err => console.log(err));

  }).catch(err => console.log(err));
};

function removeAmount(accountName, amount) {

  const accountData = getAccount(accountName);

  if(!amount){
    errorMsg('An error occurred. Please try again later.'); 
    return withdraw();
  }

  if(accountData.balance < amount) {
    errorMsg('Insufficient balance');
    return withdraw();
  }

  accountData.balance = parseFloat(accountData.balance) - parseFloat(amount);

  fs.writeFileSync(
    `accounts/${accountName}.json`,
    JSON.stringify(accountData),
    (err) => {
      console.log(err)
    },
  );

  successMsg(`Withdrawal of ${amount} completed successfully`);
  operation();

};