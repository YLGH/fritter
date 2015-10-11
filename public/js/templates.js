(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['home'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return "    <div id=\"freet-error\"></div>\n    <p> Hey "
    + container.escapeExpression(((helper = (helper = helpers.currentUser || (depth0 != null ? depth0.currentUser : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"currentUser","hash":{},"data":data}) : helper)))
    + "!</p> <button id=\"logout-button\">Log out</button>\n    <form>\n      <input id=\"freet-input\" type=\"text\">\n      <button id=\"freet-button\" type=\"submit\">Freet!</button>\n    </form>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "    <div id=\"login-error\"></div>\n    <form id=\"login-form\">\n      <input name=\"username\" type=\"text\">\n      <button id=\"login-button\" type=\"submit\">Log in</button>\n    </form>\n    <form id=\"register-form\">\n      <input name=\"username\" type=\"text\">\n      <button id=\"register-button\" type=\"submit\">Register</button>\n    </form>\n";
},"5":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "      <div class=\"freet\">"
    + alias2(alias1((depth0 != null ? depth0.text : depth0), depth0))
    + " "
    + alias2(alias1((depth0 != null ? depth0._user : depth0), depth0))
    + "</div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {};

  return "<div id=\"home\">\n  <div id=\"user\">\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.currentUser : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "  </div>\n  <div id=\"freet-container\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.freets : depth0),{"name":"each","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "  </div>\n</div>";
},"useData":true});
})();