(function (controller, repository) {
    //var repository = repository.get("http://housearrynblog.apphb.com/api/");
    //repository.posts.create("New title", "Some sample content goes here... :P", ["tag", "programming", "sample"])
    //.then(function (data) {
    //    console.log("Created post!");
    //    console.log(data);
    //    console.log("-----------------");
    //    repository.posts.getAll()
    //    .then(function (data2) {
    //        console.log("Got all posts!");
    //        console.log(data2);
    //        console.log("-----------------");
    //    }, function (err) {
    //        console.log(err);
    //    });
    //}, function (err) {
    //    console.log(err);
    //});
    var repository = repository.get("http://housearrynblog.apphb.com/api/");
    repository.account.login("admin", "admin123")
        .then(function (data) {
            console.log(data);
        }, function (err) {
            console.log(err);
        });
    //var controller = controller.get();
    //controller.loadMainPage();
})(controller, repository);