var utils = (function () {

    var _utils = {};

    _utils.sendSuccessResponse = function(res, content) {
        res.status(200).json({
            success: true,
            content: content
        }).end();
    };

    _utils.sendErrResponse = function(res, errcode, err) {
        res.status(errcode).json({
            success: false,
            err: err
        }).end();
    };

    Object.freeze(_utils);
    return _utils;

})();

module.exports = utils;