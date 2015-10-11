$(function() {
    //Log in
    $(document).on("click", "#login-button", function(e) {
        e.preventDefault();
        var username = $("#login-form input[name=username]").val();
        $.post(
            '/users/login',
            { username: username }
        ).done(function(response) {
            currentUser = response.content.user;
            loadPage('home',{currentUser: currentUser});
        }).fail(function(responseObject) {
            var response = $.parseJSON(responseObject.responseText);
            helpers.displayError(response.err);
        });
    });

    //Log in
    $(document).on("click", "#register-button", function(e) {
        e.preventDefault();
        var username = $("#register-form input[name=username]").val();
        $.post(
            '/users/create',
            { username: username }
        ).done(function(response) {
            currentUser = response.content.user;
            loadPage('home',{currentUser: currentUser});
        }).fail(function(responseObject) {
            var response = $.parseJSON(responseObject.responseText);
            helpers.displayError(response.err);
        });
    });

    //Log out
    $(document).on("click", "#logout-button", function(e) {
        currentUser = undefined;
        $.post(
            '/users/logout'
        ).done(function(response) {
            currentUser = undefined;
            loadPage('home',{currentUser: currentUser});
        }).fail(function(responseObject) {
            var response = $.parseJSON(responseObject.responseText);
            helpers.displayError(response.err);
        }); 
    });
});