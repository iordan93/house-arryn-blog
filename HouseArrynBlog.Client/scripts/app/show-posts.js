(function () {
    var makeReq = function () {
        var ctrlr = controller.get();
        ctrlr.loadMainPage();
    };
    $(document).on('click', "#home", makeReq);

    function showPosts() {
        $('#post-form').hide(600);
        $('.content').show(600);
    }
}());