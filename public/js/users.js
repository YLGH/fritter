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

});