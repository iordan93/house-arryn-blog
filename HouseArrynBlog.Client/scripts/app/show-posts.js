(function () {
        $(document).on('click', "#home", showPosts);

    function showPosts() {
        $('#post-form').hide();
        $('.content').show();
    }
      
}());