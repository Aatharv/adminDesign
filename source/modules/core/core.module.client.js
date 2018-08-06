(function (app) {
    'use strict';
    console.log(app);
    app.registerModule('core');
    app.registerModule('core.routes', ['ui.router']);

}(ApplicationConfiguration));
  