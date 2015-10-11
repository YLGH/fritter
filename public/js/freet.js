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
            console.log(response.err);
            $('#freet-error').text(response.err);
        });
    });

});