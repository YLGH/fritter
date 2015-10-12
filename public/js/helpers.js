var helpers = (function() {

    var _helpers = {};

    _helpers.displayError = function(id,msg) {
        $(id).text(msg);
    }

    _helpers.hidePopup = function() {
        $("#popup").css("display", "none");
        $("#cover").css("display", "none");
    }

    _helpers.showPopup = function() {
        $("#popup").css("display", "block");
        $("#cover").css("display", "block");
    }
    
    Object.freeze(_helpers);
    return _helpers;
})();