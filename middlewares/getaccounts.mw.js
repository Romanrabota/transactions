// Current status of all accounts - DO NOT MODIFY
const { Account, sequelize } = require('../models');

module.exports.getaccountsInstance= async (req, res) => {
    // Find all accounts, ordered by firstName, as a JSON response
    let allAccounts = await Account.findAll({ order: [ ['firstName', 'ASC'] ] });
    res.json(allAccounts);
};

