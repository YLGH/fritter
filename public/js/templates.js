(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['header'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<h2 id=\"user-info\">Signed in as "
    + container.escapeExpression(((helper = (helper = helpers.currentUser || (depth0 != null ? depth0.currentUser : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"currentUser","hash":{},"data":data}) : helper)))
    + ". </h2>\n<a id=\"logout-button\" href=\"#\" class=\"header-button\">Log out</a>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "<button id=\"show-login\" class=\"header-button button button-light\">Log in</button>\n<button id=\"show-register\" class=\"header-button button button-light\">Register</button>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<h1 id=\"title\">fritter</h1>\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.currentUser : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "");
},"useData":true});
templates['home'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "    <div id=\"new-freet-box\">\n      <form id=\"freet-form\">\n        <input id=\"freet-input\" class=\"input\" type=\"text\" maxlength=\"160\">\n        <button id=\"freet-button\" class=\"button\" type=\"submit\">Freet!</button>\n      </form>\n    </div>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "      <div id="
    + alias2(alias1((depth0 != null ? depth0._id : depth0), depth0))
    + " class=\"freet-box\">\n        "
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.ownership : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n        <div class=\"freet-user\">@"
    + alias2(alias1((depth0 != null ? depth0._user : depth0), depth0))
    + " </div>\n        <em class=\"freet-time\">("
    + alias2(alias1((depth0 != null ? depth0.ts : depth0), depth0))
    + ")</em> - <p class=\"freet-text\">"
    + alias2(alias1((depth0 != null ? depth0.text : depth0), depth0))
    + "</p>\n      </div>\n";
},"4":function(container,depth0,helpers,partials,data) {
    return "<button freet="
    + container.escapeExpression(container.lambda((depth0 != null ? depth0._id : depth0), depth0))
    + " class=\"delete-button no-border\">X</button>";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {};

  return "<div id=\"home\">\n  <div id=\"user\">\n    <div id=\"freet-error\" class=\"error\"></div>\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.currentUser : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "  </div>\n  <div id=\"freet-container\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.freets : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "  </div>\n</div>";
},"useData":true});
templates['login'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "<form id=\"register-form\">\n    <h3>Register for a Fritter account.</h3>\n    <input name=\"username\" type=\"text\" class=\"form-ele input\" placeholder=\"username\">\n    <input name=\"password\" type=\"password\" class=\"form-ele input\" placeholder=\"password\">\n    <button id=\"register-button\" class=\"form-ele button\">Register</button>\n</form>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "<form id=\"login-form\">\n    <h3>Log in to Fritter.</h3>\n    <input name=\"username\" type=\"text\" class=\"form-ele input\" placeholder=\"username\">\n    <input name=\"password\" type=\"password\" class=\"form-ele input\" placeholder=\"password\">\n    <button id=\"login-button\" class=\"form-ele button\">Login</button>\n</form>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<button id=\"close-popup\" class=\"no-border\">X</button>\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.register : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "<div id=\"login-error\" class=\"error\"></div>";
},"useData":true});
})();