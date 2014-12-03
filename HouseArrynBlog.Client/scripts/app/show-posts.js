(function () {
    var headers = {
        'X-Parse-Application-Id': 'IvEahynuZviRfRywsAjsEwA12zBXNL99wwaDnmkq',
        'X-Parse-REST-API-Key': 'ayNFyMqECrWWtq3mwdsUsBZ3eOlPDAXOqjBEzZ3S'
    };

    $(document).ready(function () {
        loadPosts();
        showPosts();
        $(document).on('click', "#home", showPosts);
    });

    function showPosts() {
        $('#post-form').hide();
        $('.content').show();
    }

    function loadPosts() {
        var post,
            comment,
            allComments,
            idString;

        var commentHtml = "<li><article class='comment'>" +
                            "<h3>Comment by Pesho</h3>" +
                            "<h4>Email: pesho_grobarq@abv.bg</h4>" +
                            "<p>${CommentContent}</p>" +
                        "</article</li>";

        var html = "<li><article class='postContent'>" +
				"<h3>${Title}</h3>" +
				"<p>${PostContent}</p>" +
				"<a class='view-all' href='#'>view entire post...</a>" +
				"<div><a class='view-comments' href='#'>view comments...</a></div>" +
                "<div class='post-comments'><ul id=${PostId}>No comments yet.. :(</ul></div>" +
				"<div><a class='add-comment-button' href='#'>add comment...</a></div>" +
				"<div class='comment-form'>" +
					"<form>" +
						"<h1>Add Comment</h1>" +
						"<input type='text' class='user-name' placeholder='Name'></input></br>" +
						"<input type='text' class='email' placeholder='E-mail'></input></br>" +
						"<textarea rows='20' cols='50' class='comment' placeholder='Description'></textarea></br>" +
			    		"<input id='${Id}' class='comment-button' type='button' value='Comment'></input></br>" +
		      		"</form>" +
				"</div>" +
			"</article></li>";

        $.ajax({
            url: 'https://api.parse.com/1/classes/Post',
            method: 'GET',
            headers: headers,
            success: function (data) {
                var posts = data.results;
                allComments = "";
                for (var i in posts) {
                    post = html
                        .replace("${Title}", posts[i].title)
                        .replace("${PostContent}", posts[i].content)
                        .replace("${PostId}", "post" + i);

                    $('#posts').append(post);
                    if (posts[i].comments.length) {
                        idString = "#post" + i;
                        $(idString).html("")
                        for (var j = 0; j < posts[i].comments.length; j++) {
                            
                            comment = commentHtml.replace("${CommentContent}", posts[i].comments[j]);
                            console.log(posts[i].comments[j]);
                            $(idString).append(comment);
                        }
                    }
                }
            }
        });
    }
}());