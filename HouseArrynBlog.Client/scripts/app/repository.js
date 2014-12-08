var repository = (function () {
    var MainRepository = Class.extend({
        init: function (rootUrl) {
            this.rootUrl = rootUrl;
            this.posts = new PostsRepository(this.rootUrl);
            this.comments = new CommentsRepository(this.rootUrl);
            this.tags = new TagsRepository(this.rootUrl);
            this.search = new SearchRepository(this.rootUrl);
        }
    });

    var PostsRepository = Class.extend({
        init: function (rootUrl) {
            this.rootUrl = rootUrl + "posts/";
        },
        getAll: function () {
            return httpRequester.getJson(this.rootUrl);
        },
        getById: function (id) {
            return httpRequester.getJson(this.rootUrl + id);
        },
        list: function () {
            return httpRequester.getJson(this.rootUrl + "list");
        }
    });

    var CommentsRepository = Class.extend({
        init: function (rootUrl) {
            this.rootUrl = rootUrl + "comments/";
        },
        getAll: function() {
            return httpRequester.getJson(this.rootUrl);
        },
        create: function (id, username, email, text) {
            // TODO: Add validation
            var comment = {
                username: username,
                email: email,
                text: text
            };

            return httpRequester.postJson(this.rootUrl + id, comment);
        }
    });

    var TagsRepository = Class.extend({
        init: function (rootUrl) {
            this.rootUrl = rootUrl + "tags/";
        },
        popular: function () {
            return httpRequester.getJson(this.rootUrl + "popular");
        }
    });

    var SearchRepository = Class.extend({
        init: function (rootUrl) {
            this.rootUrl = rootUrl + "search/";
        },
        search: function (query) {
            return httpRequester.getJson(this.rootUrl + "?query=" + query);
        }
    });

    return {
        get: function (rootUrl) {
            return new MainRepository(rootUrl);
        }
    }
})();
