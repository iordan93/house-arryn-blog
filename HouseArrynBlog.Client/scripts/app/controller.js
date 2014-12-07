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
                $('#posts').html("");
                $('.content').show(600);
                $('#post-form').stop(true, true).hide(300);
                return ui.loadHtml("post-concise", posts);
            }, function (err) {
                console.log(err);
            })
            .then(function (result) {
                var tempHtml = '';
                for (var i = 0; i < result.data.length; i++) {
                    tempHtml += tmpl(result.templateString, result.data[i]);

                }
                $('#posts').html(tempHtml);
                $('.content').stop(true, true).show(600);
                $(document).on("click", ".get-post", function (e) {
                    var id = $(this).data("id");
                    self.repository.posts.getById(id)
                    .then(function (post) {
                        return ui.loadHtml("post-details", post);
                    }, function (err) {
                        console.log(err);
                    })
                    .then(function (result) {
                        $('#posts').html("");
                        $('.content').show(600);
                        $('#post-form').stop(true, true).hide(300);
                        $('#posts').append(tmpl(result.templateString, result.data));
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
        },
        loadPostsByTag: function (tag) {
            var self = this;
            this.repository.posts.getAll()
            .then(function (posts) {
                $('#posts').html("");
                $('#post-form').stop(true, true).hide(300);
                var tagMatch = tag || $('#search-tag').val();
                var matches = [];
                for (var i = 0; i < posts.length; i++) {
                    for (var j = 0; j < posts[i].tags.length; j++) {
                        var currentTag = posts[i].tags[j].name;
                        if (currentTag === tagMatch) {
                            matches.push(posts[i]);
                        }
                    }
                }
                return ui.loadHtml("post-concise", matches);
            }, function (err) {
                console.log(err);
            })
            .then(function (result) {
                var tempHtml = "<h1>Results for: " + (tag || $('#search-tag').val()) + "</h1>";

                if (!result.data.length) {
                    tempHtml = "<br /><hr /><h1>Sorry, son! There are no matches for this tag!<h1 />";
                }
                else {
                    for (var i = 0; i < result.data.length; i++) {
                        tempHtml += tmpl(result.templateString, result.data[i]);
                    }
                }
                $('#posts').html(tempHtml);
                $('.content').stop(true, true).show(600);
            }, function (err) {
                console.log(err);
            });
        },
        loadSidebar: function (selector) {
            var self = this;
            var element = $(selector);
            var tags = element.find("#most-popular-tags");
            tags.html("");
            var tagsHtml = "<h2>Most visited tags</h2><br />";
            this.repository.tags.popular()
            .then(function (tags) {
                return ui.loadHtml("sidebar-tag", tags);
            }, function (err) {
                console.log(err);
            })
            .then(function (result) {
                for (var i = 0; i < result.data.length; i++) {
                    tagsHtml += tmpl(result.templateString, result.data[i]);
                }
                tags.html(tagsHtml);

                element.off("click", ".tag-link")
                    .on("click", ".tag-link", function (e) {
                        self.loadPostsByTag($(this).data("tagName"));
                        e.preventDefault();
                    });
            }, function (err) {
                console.log(err);
            });
            var postsHtml = "<h2>Posts by month</h2><br />";
            var posts = element.find("#posts-by-month");
            this.repository.posts.list()
            .then(function (posts) {
                return ui.loadHtml("sidebar-post", posts);
            }, function (err) {
                console.log(err);
            })
            .then(function (result) {
                for (var i = 0; i < result.data.length; i++) {
                    postsHtml += tmpl(result.templateString, result.data[i]);
                }
                posts.html(postsHtml);

                element.off("click", ".post-link")
                    .on("click", ".post-link", function (e) {
                        var id = $(this).data("postId");
                        self.repository.posts.getById(id)
                        .then(function (post) {
                            return ui.loadHtml("post-details", post);
                        }, function (err) {
                            console.log(err);
                        })
                        .then(function (result) {
                            $('#posts').html("");
                            $('.content').show(600);
                            $('#post-form').stop(true, true).hide(300);
                            $('#posts').append(tmpl(result.templateString, result.data));
                        }, function (err) {
                            console.log(err);
                        });
                        e.preventDefault();
                    });
            }, function (err) {
                console.log(err);
            });
        }
    });

    return {
        get: function () {
            return new Controller()
        }
    }
})(repository);
