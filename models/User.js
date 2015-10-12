var _users = [];

/**
 * User model - describes a user object
 */
var User = (function User(_users) {
    var that = Object.create(User.prototype);

    /**
     * Check if user exists
     *
     * @param username {string} - username to check
     * @return - true if user exists and false otherwise
     */
    var userExists = function(username) {
        return _users.indexOf(username) !== -1;
    }

    /**
     * Find a user by username
     *
     * @param username {string} - username to check
     * @param callback {function} - function to call with error and result
     */
    that.findByUsername = function(username, callback) {
        if (username) {
            username = username.toLowerCase();
            if (!userExists(username)) {
                callback("User does not exist");
            } else {
                callback(null, {username: username} );
            }
        } else {
            callback("Username undefined");
        }
    }

    /**
     * Authenticate a user
     *
     * @param username {string} - username to check
     * @param callback {function} - function to call with error and result
     */
    that.authUser = function(username, callback) {
        username = username.toLowerCase();
        if (!userExists(username)) {
            callback("Invalid login");
        } else {
            callback(null);
        }
    }

    /**
     * Create a new user
     *
     * @param username {string} - username to create
     * @param callback {function} - function to call with error and result
     */
    that.createUser = function(username, callback) {
        username = username.toLowerCase();
        if (userExists(username)) {
            callback("Username already exists");
        } else if (!username.match("^[a-z0-9_-]{3,16}$")) {
            callback("Username should consist of letters, numbers, underscores, and be between 3 and 16 characters long.")
        } else {
            _users.push(username);
            callback(null, {username: username});
        }
    };

    Object.freeze(that);
    return that;
})(_users);

module.exports = User;