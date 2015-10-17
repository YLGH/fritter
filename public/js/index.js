// Register partials
Handlebars.registerPartial('home', Handlebars.templates['home']);
Handlebars.registerPartial('header', Handlebars.templates['header']);
Handlebars.registerPartial('login', Handlebars.templates['login']);

// Track currentUser locally for easier templating
currentUser = undefined;

// Load the main page with the appropriate data
var loadPage = function(data) {
    data = data || {currentUser: currentUser};
    if (!currentUser) {
        data.notLoggedIn = true;
    } else {
        data.notLoggedIn = false;
    }
    $.get('/freets', function(response) {
        (response.content).forEach(function(f) {
            f.ts = moment(f.ts).fromNow();
            if (currentUser === f.author) {
                f["ownership"] = true;
            }
        });
        data.freets = response.content.reverse();
        $('#container').html(Handlebars.templates["home"](data));
        $('#header').html(Handlebars.templates["header"]({currentUser: currentUser}));
    });
}

//load a user page
var loadUserPage = function(username) {
    var data = {user: username};
    data.isOtherUser = username !== currentUser;
    $.get('/freets/filter', {authors: [username]}, function(response) {
        data.freets = response.content.reverse();
        data.freets.forEach(function(f) {
            f.ts = moment(f.ts).fromNow();
            if (currentUser === f.author) {
                f["ownership"] = true;
            }
        });
        $('#container').html(Handlebars.templates["home"](data));
    });

}

// Initialize the main page with tweets
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