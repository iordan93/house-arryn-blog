(function() {

	var postForm = '<div id="post-form"><form>'
	 + '<h1>Add new Post</h1>'
	  + '<input type="text" id="title" placeholder="Title"></input></br>'
	   + '<textarea id="post-content" rows="20" cols="50" placeholder="Description"></textarea></br>'
	    + '<input type="text" id="tags" placeholder="Tags"></input></br>'
	     + '<input type="button" id="post" value="POST"></input></br>'
	      + '</form></div>';

	$(document).on('click', "#add-post", showPostPage);
	$(document).on('click', "#post", sendPostQuery);

	function showPostPage() {
		$(".content").html(postForm);
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
		tags = $.grep(tags, function(n) {
			return (n)
		});
		var comments = [];

		Parse.initialize("ybCjiIR2L3fiVTE10gz4M2dKQl4kaHqUIysTuWPH", "SguJDNRuOWPh2deQoXhZQRZQCdgoO0Dyxzefkl7E");

		var Post = Parse.Object.extend("Post");
		var post = new Post();
		post.save({
			title: title,
			content: content,
			tags: tags,
			comments: comments,
			visits: 0
		}, {
			success: function(object) {
				alert("Congrats! You successfully created a new Post!");
			},
			error: function(model, error) {
				alert("Sorry! Shit happens!");
			}
		});
	}
}());