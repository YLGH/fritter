var _users = [];

var User = (function User(_users) {
    var that = Object.create(User.prototype);

    var userExists = function(username) {
        return _users.indexOf(username) !== -1;
    }

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

    that.authUser = function(username, callback) {
        username = username.toLowerCase();
        if (!userExists(username)) {
            callback("Invalid login");
        } else {
            callback(null);
        }
    }

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