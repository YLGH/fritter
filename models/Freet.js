var mongoose = require('mongoose');
var User = require('./User');


var freetSchema = new mongoose.Schema({
    text: String,
    ts: String, 
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

/**
 * Add a freet to the store; must have valid username
 *
 * @param username {string} - username of freet author
 * @param freet {string} - freet text
 * @param timestamp {object} - moment defining timestamp of freet
 * @param callback {function} - function to be called with err and result
 */
freetSchema.statics.addFreet = function(username, freet, timestamp, callback) {
    User.findByUsername(username, function(err, result) {
        if (err) {
            callback("Invalid username");
        } else {
            var freet = new Freet({
                text: freet,
                ts: timestamp,
                author: result
            });
            freet.save(callback);
        }
    });
}

/**
 * Get a freet by ID
 *
 * @param id {string} - uuid of freet
 * @param callback {function} - function to be called with err and result
 */
freetSchema.statics.getFreetById = function(id, callback) {
    this.find({_id: id}, function(err, result) {
        if (err) callback(err);
        else if (result.length > 0) callback(null, result);
        else callback("Freet not found");
    });
}

/**
 * Get all freets
 *
 * @param callback {function} - function to be called with err and result
 */
freetSchema.statics.getFreets = function(callback) {
    this.find({}, function(err,result) {
        if (err) callback(err);
        else callback(null, result);
    })
};

/**
 * Delete freet by ID
 *
 * @param username {string} - username of user initiating delete; must match freet author
 * @param id {string} - freet uuid
 * @param callback {function} - function to be called with err and result
 */
freetSchema.statics.deleteFreetById = function(username, id, callback) {
    this.remove({author: username, _id: id}, callback);
}

/**
 * Clear all freets
 */
freetSchema.statics.clearFreets = function() {
    this.remove({}, function() {});
}

var Freet = mongoose.model('Freet', freetSchema);

module.exports = Freet;