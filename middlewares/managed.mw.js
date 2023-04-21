const { Account, sequelize } = require('../models');


// BONUS: Managed Transaction

module.exports.getmanegedInstance= async (req, res, next) => {

  //  const result = await sequelize.transaction(async (t) => {


    try {
        // Create a transaction with a callback function
        // If the function executes successfully, the transaction is committed
        
        // Your code here
        
        // Queries to be performed in the transaction:

        // Find Rose's account, add 200 to her balance, then save

        const result = await sequelize.transaction(async (t) => {

        let rose = await Account.findOne({
            where: {
                firstName: 'Rose',
                lastName: 'Tyler'
            }
        });
        await rose.update({
            balance: rose.balance + 200
        });
        await rose.save();

        // Find Amy's account, subtract 200 from her balance, then save
        let amy = await Account.findOne({
            where: {
                firstName: 'Amy',
                lastName: 'Pond'
            }
        });
        await amy.update({
            balance: amy.balance - 200
        },{
            transaction: t
        });
        await amy.save();

       
    });
     // After the transaction, formulate the response
        // Find all accounts, ordered by firstName, returned as a JSON response
        let allAccounts = await Account.findAll({ order: [ ['firstName', 'ASC'] ] });
        res.json(allAccounts);
} catch (error) {
        // If an error was thrown in the transaction, it will be rolled back
        // automatically

        // Pass any errors that occurred to an error handler
        next(error);
     }
};






