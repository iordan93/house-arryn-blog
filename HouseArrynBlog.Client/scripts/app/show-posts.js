(function () {
        $(document).on('click', "#home", showPosts);

    function showPosts() {
        $('#post-form').hide(600);
        $('.content').show(600);
    }
}());