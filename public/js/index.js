Handlebars.registerPartial('home', Handlebars.templates['home']);

currentUser = undefined;

var loadPage = function(template, data) {
    data = data || {currentUser: currentUser};
    $.get('/freets', function(response) {
        data["freets"] = response.content;
        $('#container').html(Handlebars.templates[template](data));
    });
}

$(function() {
    $.get('/users/current', function(response) {
        if (response.content.loggedIn) {
            currentUser = response.content.user;
        } else {
            currentUser = undefined;
        }
        loadPage('home',{currentUser: currentUser});
    });
});