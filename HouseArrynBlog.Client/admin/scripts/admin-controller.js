var adminController = (function (repository) {
    var rootUrl = "http://housearrynblog.apphb.com/api/";

    var Controller = Class.extend({
        init: function () {
            this.repository = repository.get(rootUrl);
        },
        displayMessage: function (type, text) {
            $("<div>")
                .addClass("alert alert-" + type)
                .text(text)
                .appendTo(("#messages"))
                .fadeOut(4000);
        },
        loadMainPage: function () {
            var self = this;
            if (isLoggedIn()) {
                $("#nav-right").html($("<li>").html("<form class=\"navbar-form navbar-left\"><button id=\"logout-button\" class=\"btn btn-default\">Logout</button></forn>"));
                $("#nav-left").show();

                $("#menu-add-post").click(function () {
                    self.loadCreateForm();
                });
                $("#menu-edit-post").click(function () {
                    self.loadEditForm();
                });

                $("#logout-button").click(function (e) {
                    self.repository.account.logout()
                    .then(function (data) {
                        $("#logout-button").hide();
                        $("#nav-left").hide();
                        self.displayMessage("success", "You have logged out successfully.");
                        self.loadMainPage();
                    }, function (err) {
                        console.log(err);
                    });
                    e.preventDefault();
                });
            } else {
                ui.loadHtml("admin-login")
                .then(function (result) {
                    $("#main-content").html(result.templateString);

                    $("#login-button").click(function (e) {
                        var username = $("#admin-username").val();
                        var password = $("#admin-password").val();
                        self.repository.account.login(username, password)
                        .then(function (data) {
                            $("#login-form").hide();
                            self.displayMessage("success", "You have logged in successfully.");
                            self.loadMainPage();
                        }, function (err) {
                            self.displayMessage("danger", "Invalid username and / or password.");
                            console.log(err);
                        });
                        e.preventDefault();
                    });
                }, function (err) {
                    console.log(err);
                });
            }
        },
        loadCreateForm: function () {
            var self = this;
            ui.loadHtml("new-post-form")
            .then(function (result) {
                $("#main-content").html(result.templateString);
                self.initTinyMce("#post-text");

                $("#submit-post-button").click(function (e) {
                    var title = $("#post-title").val();
                    if (title == "") {
                        self.displayMessage("danger", "The title is required.");
                        return;
                    }
                    var content = tinyMCE.activeEditor.getContent();
                    if (content == "") {
                        self.displayMessage("danger", "The content is required.");
                        return;
                    }
                    var tags = $("#post-tags").val().split(/,\s+/g);
                    if (!tags || !tags[0]) {
                        self.displayMessage("danger", "The tags are required.");
                        return;
                    }

                    self.repository.posts.create(title, content, tags)
                    .then(function (data) {
                        self.displayMessage("success", "New post added successfully,");
                        $("#new-post-form").hide();
                        self.loadMainPage();
                    }, function (err) {
                        self.displayMessage("danger", "The post could not be submitted.");
                    });
                    e.preventDefault();
                });
            }, function (err) {
                console.log(err);
            });
        },
        loadEditForm: function () {
            var self = this;
            this.repository.posts.getAll()
            .then(function (data) {
                return ui.loadHtml("choose-post", data);
            }, function (err) {
                console.log(err);
            })
            .then(function (result) {
                var postsHtml = "<h2>Select a post to edit:</h2><div class=\"list-group\">";
                for (var i = 0; i < result.data.length; i++) {
                    postsHtml += tmpl(result.templateString, result.data[i]);
                }

                $("#main-content").html(postsHtml);
                $(".post-select").click(function (e) {
                    var postId = $(this).data("postId");
                    self.repository.posts.getById(postId)
                    .then(function (data) {
                        self.loadUpdateForm(data);
                    }, function (err) {
                        console.log(err);
                    });
                    e.preventDefault();
                });
            }, function (err) {
                console.log(err);
            });
        },
        loadUpdateForm: function (data) {
            var self = this;
            ui.loadHtml("edit-post-form", data)
            .then(function (result) {
                $("#main-content").html(tmpl(result.templateString, result.data));

                $("#update-post-button").click(function (e) {
                    var title = $("#post-title").val();
                    if (title == "") {
                        self.displayMessage("danger", "The title is required.");
                        return;
                    }
                    var content = tinyMCE.activeEditor.getContent();
                    if (content == "") {
                        self.displayMessage("danger", "The content is required.");
                        return;
                    }
                    
                    var id = $(this).data("updateId");
                    self.repository.posts.update(id, title, content)
                    .then(function (data) {
                        self.displayMessage("success", "Post edited successfully,");
                        $("#edit-post-form").hide();
                        self.loadMainPage();
                    }, function (err) {
                        self.displayMessage("danger", "The post could not be edited.");
                    });
                    e.preventDefault();
                });
            }, function (err) {
                console.log(err);
            });
        },
        initTinyMce: function (selector) {
            if (typeof (tinyMCE) != "undefined") {
                if (tinyMCE.activeEditor == null || tinyMCE.activeEditor.isHidden() != false) {
                    tinyMCE.editors = [];
                }
            }
        }
    });

    return {
        get: function () {
            return new Controller()
        }
    }
})(adminRepository);
