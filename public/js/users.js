$(function() {

     // Show home page
    $(document).on("click", "#go-home", function(e) {
        loadPage();
    });

    // Show user page
    $(document).on("click", ".freet-user", function(e) {
        var user = $(e.target).attr("user");
        loadUserPage(user);
    });

    // Show follows
    $(document).on("click", "#view-follows", function(e) {
        loadFollowsPage();
    });

    // Follow a user
    $(document).on("click", "#follow-user", function(e) {
        var user = $(e.target).attr("user");
        $.post('/users/follow', {username: user}).done(function(response) {
            loadUserPage(user);
        })
    });

});