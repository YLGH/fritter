var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var userSchema = new mongoose.Schema({
    username: String,
    password: String, 
    follows: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'} ],
    freets: [{type: mongoose.Schema.Types.ObjectId, ref: 'Freet'} ]
});

/**
 * Find a user by username, error if not found
 *
 * @param username {string} - username to check
 * @param callback {function} - function to call with error and result
 */
userSchema.statics.findByUsername = function(rawUsername, callback) {
    var username = rawUsername.toLowerCase();
    this.find({ username: username }, function(err, result) {
        if (err) callback(err);
        else if (result.length > 0) callback(null, {username: username, _id: result[0]._id});
        else callback("User not found");
    });
}

/**
 * Authenticate a user
 *
 * @param username {string} - username to check
 * @param password {string} - password to check
 * @param callback {function} - function to call with error and result
 */
userSchema.statics.authUser = function(rawUsername, password, callback) {
    var username = rawUsername.toLowerCase();
    this.find({username: username}, function(err,result) {
        if (err) callback(err);
        else if (result.length > 0) {
            if (bcrypt.compareSync(password, result[0].password)) callback(null, {username: username});
            else callback("Incorrect login");
        } else callback("Incorrect login");
    });
}

/**
 * Create a new user
 *
 * @param username {string} - username to create
 * @param password {string} - password
 * @param callback {function} - function to call with error and result
 */
userSchema.statics.createUser = function(rawUsername, password, callback) {
    var username = rawUsername.toLowerCase();
    if (username.match("^[a-z0-9_-]{3,16}$") && typeof password === 'string') {
        this.find({username: username}, function(err, result) {
            if (err) callback(err);
            else if (result.length === 0) {
                var salt = bcrypt.genSaltSync(10);
                var hash = bcrypt.hashSync(password, salt);
                var user = new User({
                    username: username,
                    password: hash
                });
                user.save(function(err,result) {
                    // console.log(err);
                    if (err) callback(err);
                    else callback(null, {username: username});
                });
            } else callback("User already exists");
        });
    } else {
        callback("Invalid username/password");
    }
}

/**
 * Clear all users
 */
userSchema.statics.clearUsers = function() {
    this.remove({}, function() {});
}

var User = mongoose.model('User', userSchema);

module.exports = User;