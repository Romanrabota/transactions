const { Account, sequelize } = require('../models');


// BONUS: Managed Transaction

module.exports.getmanegedInstance= async (req, res, next) => {

  //  const result = await sequelize.transaction(async (t) => {


    try {
        // Create a transaction with a callback function
        // If the function executes successfully, the transaction is committed
        
        // Your code here
        
        // Queries to be performed in the transaction:

        

         const firstNameplus = req.body.firstNameplus;
         const lastNameplus = req.body.lastNameplus;


         const firstNameminus = req.body.firstNameminus;
         const lastNameminus = req.body.lastNameminus;

        const result = await sequelize.transaction(async (transaction) => {

        let Accountplus = await Account.findOne({
            where: {
                firstName: firstNameplus,
                lastName: lastNameplus
            }
        });
        await Accountplus.update({
            balance: Accountplus.balance + 200
        });
        await Accountplus.save();

      
        let Accountminus = await Account.findOne({
            where: {
                firstName: firstNameminus,
                lastName: lastNameminus
            }
        });
        await Accountminus.update({
            balance: Accountminus.balance - 200
        },{
            transaction
        });
        await Accountminus.save();

       
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






