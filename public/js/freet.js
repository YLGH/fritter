$(function() {
    $(document).on("click", "#freet-button", function(e) {
        e.preventDefault();
        var freet = $("#freet-input").val();
        console.log(freet);
    });

});