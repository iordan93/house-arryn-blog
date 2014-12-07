(function () {
    var loadPostsByTag = function () {
        var ctrlr = controller.get();
        ctrlr.loadPostsByTag();
    };
    $(document).on('click', '.search-button', loadPostsByTag);
})();