(function () {
    
   /* $(document).on("click", ".view-comments", function (event) {
        $(this).closest(".postContent").children(".post-comments").slideDown(300);
    });
    $(document).on("click", ".view-all", function (event) {
        $(this).closest(".postContent").children("p").css( "height", "auto");
    });*/

    $(document).on('mouseenter mouseleave', '.menu', function () {
        $(this).toggleClass('hover');
    });

    $(document).on('click', '.add-comment', function () {
        $('.comment-form').toggleClass('hidden');
    });

    $(document).on('click', '.read-more', function () {
        $('.post p').toggleClass('show');
    });
}());