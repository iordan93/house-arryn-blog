var adminRepository = (function () {
    var MainRepository = Class.extend({
        init: function (rootUrl) {
            this.rootUrl = rootUrl;
            this.account = new AccountRepository(this.rootUrl);
            this.posts = new PostsRepository(this.rootUrl);
        }
    });

    var AccountRepository = Class.extend({
        init: function (rootUrl) {
            this.rootUrl = rootUrl + "account/";
        },
        register: function (username, email, firstName, lastName, password, confirmPassword) {
            var user = {
                username: username,
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
                confirmPassword: confirmPassword
            };

            return httpRequester.postJson(this.rootUrl + "register", user);
        },
        login: function (username, password) {
            // TODO: Add validation
            return httpRequester.login(username, password);
        },
        isLoggedIn: function () {
            return localStorage.getItem("HouseArrynBlogLogin") != null;
        },
        getLoginHeaders: function () {
            if (this.isLoggedIn()) {
                return {
                    "Authorization": "Bearer " + JSON.parse(localStorage.getItem("HouseArrynBlogLogin")).access_token
                }
            }
        },
        logout: function () {
            if (this.isLoggedIn()) {
                var headers = this.getLoginHeaders();
                localStorage.removeItem("HouseArrynBlogLogin");
                return httpRequester.postJson(this.rootUrl + "logout", null, headers);
            }
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
        },
        list: function () {
            return httpRequester.getJson(this.rootUrl + "list");
        }
    });

    return {
        get: function (rootUrl) {
            return new MainRepository(rootUrl);
        }
    }
})();
