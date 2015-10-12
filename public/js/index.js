Handlebars.registerPartial('home', Handlebars.templates['home']);
Handlebars.registerPartial('header', Handlebars.templates['header']);
Handlebars.registerPartial('login', Handlebars.templates['login']);


currentUser = undefined;

var loadPage = function(data) {
    data = data || {currentUser: currentUser};
    $.get('/freets', function(response) {
        (response.content).forEach(function(f) {
            f.ts = moment(f.ts).fromNow();
            if (currentUser === f._user) {
                f["ownership"] = true;
            }
        });
        data["freets"] = response.content.reverse();
        $('#container').html(Handlebars.templates["home"](data));
        $('#header').html(Handlebars.templates["header"]({currentUser: currentUser}));
        console.log($('.freet-time'));
    });
}

$(function() {
    $.get('/users/current', function(response) {
        if (response.content.loggedIn) {
            currentUser = response.content.user;
        } else {
            currentUser = undefined;
        }
        loadPage({currentUser: currentUser});
    });
});