(function () {
    var post;
    var headers = {
        'X-Parse-Application-Id': 'IvEahynuZviRfRywsAjsEwA12zBXNL99wwaDnmkq',
        'X-Parse-REST-API-Key': 'ayNFyMqECrWWtq3mwdsUsBZ3eOlPDAXOqjBEzZ3S'
    };

    $(document).on('click', "#add-post", showPostPage);
    $(document).on('click', "#post", sendPostQuery);

    function showPostPage() {
        $('#post-form').show();
        $(".content").hide();
    }

    function sendPostQuery() {
        var title = $('#title').val();
        var content = $('#post-content').val();
        var tags = $('#tags')
			.val()
			.split(',');

        for (var tag in tags) {
            tags[tag] = tags[tag].trim();
        }
        //filters empty elements
        tags = $.grep(tags, function (n) {
            return (n)
        });
        var comments = [];
        post = {
            title: title,
            content: content,
            tags: tags,
            comments: comments,
            visits: 0
        };
        console.log(post);
        $.ajax({
            url: 'https://api.parse.com/1/classes/Post',
            method: 'POST',
            contentType: "application/json",
            data: JSON.stringify(post),
            dataType: "json",
            headers: headers,
            success: function (data) {
                alert("Congrats! You successfully created a new Post!");
            },
            error: function (model, error) {
                alert("Sorry! Shit happens!");
            }
        });
    }
}());