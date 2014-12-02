(function () {
    $(document).on("click", ".add-comment-button", function (event) {
        $(this).closest(".postContent").children(".comment-form").slideDown(300);
    });
    $(document).on("click", ".view-comments", function (event) {
        $(this).closest(".postContent").children(".post-comments").slideDown(300);
    });
    $(document).on("click", ".view-all", function (event) {
        $(this).closest(".postContent").children("p").css( "height", "auto");
    });
}());