var helpers = (function() {

    var _helpers = {};

    _helpers.displayError = function(msg) {
        $("#error").text(msg);
    }
    
    Object.freeze(_helpers);
    return _helpers;
})();