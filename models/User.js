var _users = [];

var User = (function User(_users) {
    var that = Object.create(User.prototype);

    var userExists = function(username) {
        return _users.indexOf(username) !== -1;
    }

    that.findByUsername = function(username, callback) {
        if (userExists(username)) {
            callback(null, {username: username} );
        }
    }

    that.authUser = function(username, callback) {
        if (!userExists(username)) {
            callback("Invalid login");
        } else {
            callback(null);
        }
    }

    that.createUser = function(username, callback) {
        if (userExists(username)) {
          callback("Username already exists");
        } else {
          _users.push(username);
          callback(null);
        }
    };

    Object.freeze(that);
    return that;
})(_users);

module.exports = User;