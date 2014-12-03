var controller = (function (repository) {
    var rootUrl = "http://housearrynblog.apphb.com/api/";

    var Controller = Class.extend({
        init: function () {
            this.repository = repository.get(rootUrl);
        },

        loadMainPage: function () {
            var self = this;
            this.repository.posts.getAll()
            .then(function (posts) {
                return ui.loadHtml("post-concise", posts);
            }, function (err) {
                console.log(err);
            })
            .then(function (result) {
                var div = $("<div>");
                for (var i = 0; i < result.data.length; i++) {
                    div.append(tmpl(result.templateString, result.data[i]));
                }

                div.appendTo($("#wrapper"));

                $(".get-single-post").off("click")
                    .on("click", function (e) {
                        var id = $(this).data("id");
                        self.repository.posts.getById(id)
                        .then(function (post) {
                            return ui.loadHtml("post-concise", post);
                        }, function (err) {
                            console.log(err);
                        })
                        .then(function (result) {
                            var div = $("<div>").html("Single post");
                            div.append(tmpl(result.templateString, result.data));
                            $("#wrapper").html("");
                            div.appendTo($("#wrapper"));
                        }, function (err) {
                            console.log(err);
                        });
                        e.preventDefault();
                    });
            }, function (err) {
                console.log(err);
            });
        },
        submitPostForm: function () {
            var self = this;
            var title = $('#title').val();
            var content = $('#post-content').val();
            var tags = $('#tags').val().split(',');
            self.repository.posts.create(title, content, tags)
            .then(function (post) {
                console.log("Post created!");
            }, function (err) {
                console.log("You have been pwned!");
            });
        }
    });

    return {
        get: function () {
            return new Controller()
        }
    }
})(repository);