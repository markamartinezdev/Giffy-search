//topics to list
var topics = ['stars', 'planets', 'galaxy', 'univers', 'moons', 'black holes'];
//api url
var url = 'https://api.giphy.com/v1/gifs/search';
var apiKey = 'api_key=dc6zaTOxFJmzC';
//populate topics
populateTopics();

//append each topic to topic div
function populateTopics() {
    for (i = 0; i < topics.length; i++) {
        $('#topics').append('<div class="col-md-2"><p class="topic">' + topics[i] + '</p></div>');
    }
}

//make ajax request when topic is clicked
$('body').on('click', '.topic', getTopic);

function getTopic() {
    //encode selected item for url
    topic = encodeURIComponent($(this).text());
    console.log(topic);
    getSeachResults();
}

//get search results for selected topic
function getSeachResults() {
    $.ajax({
            //get api url
            url: url + '?q=' + topic + '&' + apiKey,
            method: 'GET'
        })
        .done(function(response) {
            console.log(url);
            console.log(response);
            populateResults(response);
        });
}

//print gif responses
function populateResults(response) {
    //clear any html in div before appending
    $('#gifResults').empty();
    //append gifs
    response.data.forEach(function(result) {
            $('#gifResults').append('<div class="col-md-4 gifResult"><p>' + result.rating + '</p><img src="'+ result.images.fixed_height_still.url +'" data-state="still" class="img-responsive" data-still="' + result.images.fixed_height_still.url + '" data-animate="' + result.images.fixed_height.url + '"></div>');
        }


    )

}


//activat gif when clicked
$('body').on('click', '.gifResult', gifState);
//if active deactivate gif when clicked
function gifState() {
    if ($(this).find('img').attr('data-state') === 'still') {
        $(this).find('img').attr("src", $(this).find('img').attr("data-animate"));
        $(this).find('img').attr('data-state', 'animate');
    } else {
        //stop gif when pressed
        $(this).find('img').attr("src", $(this).find('img').attr("data-still"));
        $(this).find('img').attr('data-state', 'still');
    }
console.log($(this).find('img').attr('data-state'));
}



//when add button is pressed
//append new value to topics div
$('#add').click(addNewTopic);

function addNewTopic() {
    //select input value and 
    newTopic = $('#newTopic').val();
    if (newTopic !== "" & $.inArray(newTopic, topics) === -1) {
        //add new topic to topics array
        topics.push(newTopic);
        //clear topics div
        $('#topics').empty();
        //repopulate topics div
        populateTopics();
    }
}
