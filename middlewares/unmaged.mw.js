// Import environment variables in order to connect to database - DO NOT MODIFY
//require('dotenv').config();

// Import the models used in these routes - DO NOT MODIFY
const { Account, sequelize } = require('../models');

// Express using json - DO NOT MODIFY
//app.use(express.json());


// STEP 1: Unmanaged Transaction





module.exports.getunmanegedInstance=async (req, res, next) => {

    const t = await sequelize.transaction();

    // Unmanaged transactions are first saved to a variable
    // Your code here
    try {
        // Queries to be performed in the transaction:
        
        // Find Rose's account, add 200 to her balance, then save
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

        // Find Martha's account, subtract 200 from her balance, then save
        let martha = await Account.findOne({
            where: { 
                firstName: 'Martha', 
                lastName: 'Jones' 
            }
        });
        await martha.update({
            balance: martha.balance - 200
        }, {
            transaction: t
        });
        await martha.save();
        
        await t.commit();

        // After the transaction, formulate the response
        // Find all accounts, ordered by firstName, returned as a JSON response
        let allAccounts = await Account.findAll({ order: [ ['firstName', 'ASC'] ] });
        res.json(allAccounts);
    } catch (error) {
        // If an error occurred, the transaction must be rolled back
        // Your code here
        await t.rollback();
        // The error is then passed to the error handler
        next(error);
    }

};









