$(document).ready(function () {

    var topics = ['hiking', 'skiing', 'snowboarding', 'driving', 'photography', 'hockey', 'offroad'];

    // function to display the buttons for each topic
    function displayButtons() {
        $('.gifButtons').empty();
        for (var i = 0; i < topics.length; i++) {
            var gifButton = $('<button>');
            gifButton.addClass('btn btn-primary btn-lg topics');
            gifButton.attr('topic', topics[i]);
            gifButton.text(topics[i]);
            $('.gifButtons').append(gifButton);
        }
    }

    // function for user to add a new button to topics
    function newButton() {
        $('#newGifButton').on('click', function () {
            event.preventDefault();
            var newTopic = $('#newGif').val().trim();

            // prevent blank buttons
            if (newTopic == "") {
                return false;
            }
            // add new topic to the topics array
            topics.push(newTopic);
            // recreate the buttons with new topic included
            displayButtons();
        });
    };

    function gifDisplay() {
        var topic = $(this).attr('topic');
        var queryURL = 'http://api.giphy.com/v1/gifs/search?q=' + topic + "&api_key=q8DzXAzr51yQTBfpkVxh318Zp856sWx2&limit=10";

        $.ajax({
            url: queryURL,
            method: 'GET'
        })
            .done(function (response) {
                $('#gifDisplay').empty();
                var returnedGifs = response.data;

                for (var i = 0; i < returnedGifs.length; i++) {
                    var gif = $('<div>');
                    gif.addClass('gif');

                    var gifRated = $('<p>').text('Rated: ' + returnedGifs[i].rating);
                    gifRated.appendTo(gif);

                    var gifImage = $('<img>');
                    gifImage.attr("src", returnedGifs[i].images.fixed_height_still.url);
                    gifImage.attr("data-still", returnedGifs[i].images.fixed_height_still.url);
                    gifImage.attr("data-animate", returnedGifs[i].images.fixed_height.url);
                    gifImage.attr("data-state", "still"); // set the image state
                    gifImage.addClass("image");
                    gifImage.appendTo(gif);

                    $('#gifDisplay').prepend(gif);
                }

            });
    };



    $(document).on('click', '.topics', gifDisplay);




    displayButtons();
    newButton();


});