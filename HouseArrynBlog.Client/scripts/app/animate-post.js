(function () {
    $(document).on('mouseenter mouseleave', '.menu', function () {
        $(this).toggleClass('hover');
    });

    $(document).on('click', '.add-comment', function () {
        $(this).closest('.post').children('div').children('.comment-form').toggleClass('hidden');
    });

    $(document).on('click', '.read-more', function () {
        $('.post p').toggleClass('show');
    });
}());