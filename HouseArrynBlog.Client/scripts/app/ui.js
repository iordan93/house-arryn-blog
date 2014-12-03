var ui = (function () {
    function loadHtml(templateName, data) {
        if (templateName.indexOf("/" == -1)) {
            templateName = "scripts/partials/" + templateName + ".html";
        }

        var promise = new RSVP.Promise(function (resolve, reject) {
            $.ajax({
                url: templateName,
                type: "GET",
                dataType: "html",
                success: function (templateString) {
                    resolve({
                        templateString: templateString,
                        data: data
                    });
                },
                error: function (err) {
                    reject(err);
                }
            });
        });

        return promise;
    }

    return {
        loadHtml: loadHtml
    }
})();