(function (controller, repository) {
    var repository = repository.get("http://housearrynblog.apphb.com/api/");
    repository.account.login("admin", "admin123").then(function (d) {
        console.log(d);
    });
    var controller = controller.get();
    controller.loadMainPage();
    controller.loadSidebar("#sidebar");
})(controller, repository);