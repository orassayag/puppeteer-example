const mongoose = require('mongoose');
const EmailAddressModel = require('../../core/models/EmailAddressModel');

class DatabaseService {

    constructor() { }

    async initiate(mongoDatabaseConnectionString) {
        // Connect to the Mongo database.
        const client = await mongoose.connect(mongoDatabaseConnectionString, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true
        })
            .catch(err => { throw new Error(`Failed to connect to MongoDB: ${err}`); });

        if (!client) {
            throw new Error('Failed to connect to MongoDB.');
        }
    }

    async addEmailAddress(emailAddress) {
        const insertEmailAddress = emailAddress.trim();
        // Check if the email address exists in the database.
        const emailAddressObj = await EmailAddressModel.findOne({ 'emailAddress': insertEmailAddress });
        if (emailAddressObj) {
            return false;
        }

        await new EmailAddressModel({
            emailAddress: insertEmailAddress
        }).save();
        return true;
    }
}

const databaseService = new DatabaseService();
module.exports = databaseService;