var adminController = (function (repository) {
    var rootUrl = "http://housearrynblog.apphb.com/api/";

    var Controller = Class.extend({
        init: function () {
            this.repository = repository.get(rootUrl);
        },

        loadMainPage: function () {
            var self = this;
            if (this.repository.account.isLoggedIn()) {
                console.log($("#nav-right"));

                $("#nav-right").append($("<li>").html("<form class=\"navbar-form navbar-left\"><button id=\"logout-button\" class=\"btn btn-default\">Logout</button></forn>"));
                $("#logout-button").click(function (e) {
                    self.repository.account.logout()
                    .then(function (data) {
                        console.log(    'fa');
                        self.loadMainPage();
                    }, function (err) { 
                        console.log(err); });
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
                            self.loadMainPage();
                        }, function (err) {
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
