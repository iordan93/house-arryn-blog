var repository = (function () {
    var MainRepository = Class.extend({
        init: function (rootUrl) {
            this.rootUrl = rootUrl;
            this.tasks = new TasksRepository(this.rootUrl);
        }
    });

    var TasksRepository = Class.extend({
        init: function (rootUrl) {
            this.rootUrl = rootUrl + "tasks/"
        },
        all: function (headers) {
            return httpRequester.getJson(this.rootUrl + "all", headers);
        },
        byId: function (id, headers) {
            return httpRequester.getJson(this.rootUrl + id, headers);
        },
        inProgress: function (headers) {
            return httpRequester.getJson(this.rootUrl + "inprogress", headers);
        },
        create: function (title, body, headers) {
            var task = {
                title: title,
                body: body
            };
            return httpRequester.postJson(this.rootUrl, task, headers);
        },
        edit: function (id, title, body, headers) {
            var task = {
                title: title,
                body: body
            };
            return httpRequester.putJson(this.rootUrl + id, task, headers);
        },
        destroy: function (id, headers) {
            return httpRequester.deleteJson(this.rootUrl + id, headers);
        }
    });

    return {
        get: function (rootUrl) {
            return new MainRepository(rootUrl);
        }
    }
})();