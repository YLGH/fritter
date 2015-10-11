$(function() {
    $(document).on("click", "#freet-button", function(e) {
        e.preventDefault();
        var freet = $("#freet-input").val();
        $.post(
            '/freets/add',
            { freet: freet }
        ).done(function(response) {
            loadPage('home');
        }).fail(function(responseObject) {
            var response = $.parseJSON(responseObject.responseText);
            helpers.displayError(response.err);
        });
    });

    $(document).on("click", ".delete-button", function(e) {
        var id = $(e.target).attr("freet");
        $.post(
            '/freets/delete',
            { freetId: id }
        ).done(function(response) {
            loadPage('home');
        }).fail(function(responseObject) {
            var response = $.parseJSON(responseObject.responseText);
            helpers.displayError(response.err);
        });
    });

});