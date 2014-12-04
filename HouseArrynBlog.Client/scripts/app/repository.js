var repository = (function () {
    var MainRepository = Class.extend({
        init: function (rootUrl) {
            this.rootUrl = rootUrl;
            this.account = new AccountRepository(this.rootUrl);
            this.posts = new PostsRepository(this.rootUrl);
            this.comments = new CommentsRepository(this.rootUrl);
            this.tags = new TagsRepository(this.rootUrl);
            this.search = new SearchRepository(this.rootUrl);
        }
    });

    var AccountRepository = Class.extend({
        init: function (rootUrl) {
            this.rootUrl = rootUrl + "account/";
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
        }, // TODO: Implement other methods
        create: function (title, content, tags) {
            // TODO: Add validation
            var post = {
                title: title,
                content: content,
                categoryId: 1,
                tags: tags
            };

            return httpRequester.postJson(this.rootUrl, post, {
                "Authorization": "Bearer twFpvZFX-x4oD1HdqTpXpaBOu6CsS52XAVA_G7jee6CcrSGSRT_GnW0ES-cjTUUsPa8v635QPqocv2MYsTLojcTO1jUDEmqSEnzUdpQcX71r9bPWozYBWBNw2v9YzmmJEKw5YYlV-ojj4rzRuF56D5ZWpBy98_88oJMVczGwnpXFg5UjP57IPbNdsYiKscZYpI0UuU7OhfJQ9Hr0vvAFlO-5C3dlX4VDwgqz1TTZDWd_WvEundXJtvUGCXlebeqdTDATGhUFp3HiOvN9HViufIjKGWYoXBM_B47YSFNCyo7RHHnbY00JHcb_-f3E7fgkk1ecV9A7ZN41NZnHin4NV8uyNPTe_JVa3c7ojfyA0FdXxgeAvAXFLIAO1raAv6HZMqh863F9xEbXgrcBpZnHDPQqsNspyg0jFab7RhyaD_aiPJ_rbN03dmgpKrCHwTDgk8rKCLLUvA25Vpx4DmlqfTiL5CK4X9kl9SjWl6NyvBPNQPG7-qXYyTj2L48Wwtjc"
            });
        }
    });

    var CommentsRepository = Class.extend({
        init: function (rootUrl) {
            this.rootUrl = rootUrl + "comments/";
        },
        getAll: function() {
            return httpRequester.getJson(this.rootUrl);
        },
        create: function (username, email, text) {
            // TODO: Add validation
            var comment = {
                username: username,
                email: email,
                text: text
            };

            return httpRequester.postJson(this.rootUrl, post);
        }
    });

    var TagsRepository = Class.extend({
        init: function (rootUrl) {
            this.rootUrl = rootUrl + "tags/";
        }
    });

    var SearchRepository = Class.extend({
        init: function (rootUrl) {
            this.rootUrl = rootUrl + "search/";
        }
    });

    return {
        get: function (rootUrl) {
            return new MainRepository(rootUrl);
        }
    }
})();
