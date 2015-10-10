Handlebars.registerPartial('home', Handlebars.templates['home']);

currentUser = undefined;

var loadPage = function(template, data) {
    data = data || {};
    $('#container').html(Handlebars.templates[template](data));
}


$(function() {
    loadPage('home',{currentUser: currentUser});
});