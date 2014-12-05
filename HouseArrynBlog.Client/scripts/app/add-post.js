(function () {
    var makeReq = function () {
        var ctrlr = controller.get();
        ctrlr.submitPostForm();
    };
    $(document).on('click', "#add-post", showPostPage);
    $(document).on('click', "#post-button", makeReq);
    function showPostPage() {
        $('#post-form').show(600);
        $(".content").hide(300);
    }
})();