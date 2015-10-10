$(function() {
    $(document).on("click", "#login-button", function(e) {
        e.preventDefault();
        var username = $("#username-input").val();
        if (username) {
            currentUser = username;
        }
        loadPage('home',{currentUser: currentUser});
    });

});