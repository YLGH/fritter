var uuid = require('node-uuid');
var _store = [];

var Freet = (function Freet(_store) {
    var that = Object.create(Freet.prototype);

    var getFreet = function(id) {
        return _store.filter(function(f) {
            return f._id === id;
        })[0];
    }

    that.addFreet = function (username, freet, timestamp, callback) {
        if (username) {
            freetObj = {
                text: freet,
                ts: timestamp,
                _user: username,
                _id: uuid.v4()
            };
             _store.push(freetObj);
            callback(null, {id: freet._id})
        }
        else {
            callback("Missing username");
        }
    };

    that.getFreetById = function(id, callback) {
        var result = getFreet(id);
        if (result) {
            callback(null, result);
        } else {
            callback("Freet not found");
        }
    }

    that.getFreets = function(callback) {
        callback(null, _store);
    };

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

    Object.freeze(that);
    return that;

})(_store);

module.exports = Freet;