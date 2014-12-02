var controller = (function () {
    var rootUrl = "http://localhost:12977/api/";

    var Controller = Class.extend({
        init: function () {
            this.repository = repository.get(rootUrl);
        },

        loadMainPage: function (selector) {
            this.repository.tasks.all()
            .then(function (tasks) {
                return ui.loadHtml("task-template", tasks);
            }, function (err) {
                console.log(err);
                return err;
            })
            .then(function (result) {
                for (var i = 0; i < result.data.length; i++) {
                    $("<div>")
                        .html(tmpl(result.templateString, result.data[i]))
                        .appendTo($("body"));
                }
            }, function (err) {
                console.log(err);
                return err;
            });
        }
    });

    return {
        get: function () {
            return new Controller()
        }
    }
})();