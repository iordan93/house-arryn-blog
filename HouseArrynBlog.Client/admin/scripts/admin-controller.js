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
            debugger;
            if (this.repository.account.isLoggedIn()) {
                $("#nav-right").html($("<li>").html("<form class=\"navbar-form navbar-left\"><button id=\"logout-button\" class=\"btn btn-default\">Logout</button></forn>"));
                $("#logout-button").click(function (e) {
                    self.repository.account.logout()
                    .then(function (data) {
                        $("#logout-button").hide();
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
        }
    });

    return {
        get: function () {
            return new Controller()
        }
    }
})(adminRepository);
