function () {
        $(document).on('click', "#view-comments", showAllCommants);

    function showAllComments() {
        var	allComments = '<ul>';

        for(var i = 0; i < comments.length; i++) { 
            var comment = comments[i];
            allComments += 
            '<li>' + 
            	'<strong>' + comment.username + '<strong>' +
            	'<span>' + comment.publishDate + '<span>' +
            	'<br />' + comment.text + 
            '</li>';
    	}
    	allComments += '</ul>';

    	$('#all-comments').html(allComments);
    }
}());
