exports = module.exports = function(project) {
  var fs = require("fs");
  var path = require("path");
  var sanitize = require("node-sanitize-options");
  var app = {
    require: function(file) {
      if (fs.existsSync(file) === true) {
        var filename = path.resolve(file);
        delete require.cache[filename];
        return require(file)();
      } else {
        return {};
      }
    },
    get: function(config, files) {
      if (typeof files === "undefined") files = [];
      for (var i=0; i<=files.length-1; i++) {
        config = sanitize.options(config, app.require(files[i]));
      }
      config = sanitize.options(config, app.require("../../" + project + ".js"));
      config = sanitize.options(config, app.require("../" + project + ".js"));
      config = sanitize.options(config, app.require("./" + project + ".js"));
      config = sanitize.options(config, app.require("./config.js"));
      config = sanitize.options(config, {});
      return config;
    }
  };
  return app;
};