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
        logout: function () {
            if (isLoggedIn()) {
                var headers = getLoginHeaders();
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

            return httpRequester.postJson(this.rootUrl, post, getLoginHeaders());
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

function isLoggedIn() {
    return localStorage.getItem("HouseArrynBlogLogin") != null;
}

function getLoginHeaders() {
    if (isLoggedIn()) {
        return {
            "Authorization": "Bearer " + JSON.parse(localStorage.getItem("HouseArrynBlogLogin")).access_token
        };
    }
}