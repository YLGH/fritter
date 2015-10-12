var uuid = require('node-uuid');
var User = require('./User.js');
var _store = [];

/**
 * Freet model - describes a freet object
 */
var Freet = (function Freet(_store) {
    var that = Object.create(Freet.prototype);

    /**
     * Get a single freet by ID
     *
     * @param id {string} - uuid of the freet
     * @return - a matching tweet or undefined if not found
     */
    var getFreet = function(id) {
        return _store.filter(function(f) {
            return f._id === id;
        })[0];
    }

    /**
     * Add a freet to the store; must have valid username
     *
     * @param username {string} - username of freet author
     * @param freet {string} - freet text
     * @param timestamp {object} - moment defining timestamp of freet
     * @param callback {function} - function to be called with err and result
     */
    that.addFreet = function (username, freet, timestamp, callback) {
        User.findByUsername(username, function(err, result) {
            if (err) {
                callback("Invalid username");
            } else {
                freetObj = {
                    text: freet,
                    ts: timestamp,
                    _user: username.toLowerCase(),
                    _id: uuid.v4()
                };
                 _store.push(freetObj);
                callback(null, {id: freetObj._id})
            }
        });
    };

    /**
     * Get a freet by ID
     *
     * @param id {string} - uuid of freet
     * @param callback {function} - function to be called with err and result
     */
    that.getFreetById = function(id, callback) {
        var result = getFreet(id);
        if (result) {
            callback(null, result);
        } else {
            callback("Freet not found");
        }
    }

    /**
     * Get all freets
     *
     * @param callback {function} - function to be called with err and result
     */
    that.getFreets = function(callback) {
        callback(null, _store);
    };

    /**
     * Delete freet by ID
     *
     * @param username {string} - username of user initiating delete; must match freet author
     * @param id {string} - freet uuid
     * @param callback {function} - function to be called with err and result
     */
    that.deleteFreetById = function(username, id, callback) {
        var freet = getFreet(id);
        if (freet) {
            if (freet._user === username) {
                callback(null, _store.splice(_store.indexOf(freet),1));
            } else {
                callback("Not authorized to delete freet");
            }
        } else {
            callback("Freet not found");
        }
    }

    /**
     * Clear all freets
     */
    that.clearFreets = function() {
        _store = [];
    }

    Object.freeze(that);
    return that;

})(_store);

module.exports = Freet;