// Import environment variables in order to connect to database - DO NOT MODIFY
//require('dotenv').config();

// Import the models used in these routes - DO NOT MODIFY
const { Account, sequelize } = require('../models');


// STEP 1: Unmanaged Transaction



module.exports.getunmanegedInstance=async (req, res, next) => {

    const transaction = await sequelize.transaction();

    // Unmanaged transactions are first saved to a variable
    // Your code here
    try {
        // Queries to be performed in the transaction:
        
       

        const firstNameplus = req.body.firstNameplus;
        const lastNameplus = req.body.lastNameplus;
          console.log("firstNameplus:",firstNameplus);

        const firstNameminus = req.body.firstNameminus;
        const lastNameminus = req.body.lastNameminus;

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
        }, {
            transaction
        });
        await Accountminus.save();
        
        await transaction.commit();

        // After the transaction, formulate the response
        // Find all accounts, ordered by firstName, returned as a JSON response
        let allAccounts = await Account.findAll({ order: [ ['firstName', 'ASC'] ] });
        res.json(allAccounts);
    } catch (error) {
        // If an error occurred, the transaction must be rolled back
        // Your code here
        await  transaction.rollback();
        // The error is then passed to the error handler
        next(error);
    }

};









