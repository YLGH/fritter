var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var userSchema = new mongoose.Schema({
    username: String,
    password: String, 
    follows: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'} ],
    freets: [{type: mongoose.Schema.Types.ObjectId, ref: 'Freet'} ]
});

/**
 * Find a user by username
 *
 * @param username {string} - username to check
 * @param callback {function} - function to call with error and result
 */
userSchema.statics.findByUsername = function(username, callback) {
    this.find({ username: username }, callback);
}

/**
 * Authenticate a user
 *
 * @param username {string} - username to check
 * @param password {string} - password to check
 * @param callback {function} - function to call with error and result
 */
userSchema.statics.authUser = function(username, password, callback) {
    var user = []
    this.find({username: username}, function(err,result) {
        if (err) callback(err);
        if (bcrypt.compareSync(password, result.password)) callback(null, {username: username});
        else callback("User not found");
    });
}

/**
 * Create a new user
 *
 * @param username {string} - username to create
 * @param password {string} - password
 * @param callback {function} - function to call with error and result
 */
userSchema.statics.createUser = function(username, password, callback) {
    if (username && password) {
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hash(password, salt);
        var user = new User({
            username: username,
            password: hash
        });
        user.save(callback);
    } else {
        callback("Invalid username/password");
    }
}

var User = mongoose.model('User', userSchema);

module.exports = User;