var _store = [];

var Freet = (function Freet(_store) {
    var that = Object.create(Freet.prototype);

    that.addFreet = function (username, freet, callback) {
        freet._id = store.length;
        freet._user = username;
         _store.push(freet);
         callback(null)
    };

    that.getFreets = function(callback) {
        callback(null, _store);
    };

    that.getFreet = function(fid, callback) {
        var freet = _store.filter(function(freet) {
            return freet._id = fid;
        })
        callback(null, freet);
    }

    Object.freeze(that);
    return that;

}(_store);

module.exports = Freet;