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
                    console.log(result.data[i].id);
                    tempHtml += tmpl(result.templateString, result.data[i]);

                }
                $('#posts').html(tempHtml);
                $('.content').stop(true, true).show(600);
                $(".get-single-post").off("click")
                    .on("click", function (e) {
                        var id = $(this).data("id");
                        self.repository.posts.getById(id)
                        .then(function (post) {
                            return ui.loadHtml("post-details", post);
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
        },
        loadPostsByTag: function () {
            var self = this;
            this.repository.posts.getAll()
            .then(function (posts) {
                $('#posts').html("");
                $('#post-form').stop(true, true).hide(300); 
                var tagMatch = $('#search-tag').val();
                
                var matches = [];
                for (var i = 0; i < posts.length; i++) {
                    for (var j = 0; j < posts[i].tags.length; j++) {
                        var currentTag = posts[i].tags[j].Name;
                        if(currentTag === tagMatch) {
                            matches.push(posts[i]);
                        }
                    }
                }
                console.log(matches);
                return ui.loadHtml("post-concise", matches);
            }, function (err) {
                console.log(err);
            })
            .then(function (result) {
                var tempHtml = "<h1>Results for: " + $('#search-tag').val() + "</h1>";
                
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
        }
    });

    return {
        get: function () {
            return new Controller()
        }
    }
})(repository);
