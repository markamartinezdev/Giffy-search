//topics to list
var topics = ['stars','planets','galaxy','univers','moons', 'black holes'];
//api url
var url = 'http://api.giphy.com/v1/gifs/search';
var apiKey = 'api_key=dc6zaTOxFJmzC';
//populate topics
populateTopics();

	//append each topic to topic div
	function populateTopics(){
	for(i=0;i<topics.length; i++){
	$('#topics').append('<div class="col-md-2"><p class="topic">' + topics[i] + '</p></div>');
}
}

//make ajax request when topic is clicked
$('body').on('click', '.topic', getTopic);
function getTopic(){
//encode selected item for url
	topic = encodeURIComponent($(this).text());
	console.log(topic);
	getSeachResults();
}

//get search results for selected topic
function getSeachResults(){
$.ajax({
	//get api url
	url: url + '?q=' + topic + '&' + apiKey,
	method: 'GET'
})
.done(function(response){
console.log(url);
console.log(response);
populateResults(response);
});
}

//print gif responses
function populateResults(response){
	//clear any html in div before appending
	$('#gifResults').empty();
	//append gifs
	response.data.forEach(function(result){
	$('#gifResults').append('<div class="col-md-4 gifRusult"><img class="img-responsive" src="' + result.images.original.url +'"></div>');
	console.log(result.images.original.url);
	}


		)
		
}


//activat gif when clicked

//if active deactivate gif when clicked

//when add button is pressed
	//append new value to topics div
	$('#add').click(addNewTopic);

	function addNewTopic(){
	//select input value and 
	newTopic = $('#newTopic').val();
	if(newTopic !== "" & $.inArray(newTopic,topics) === -1){
	//add new topic to topics array
	topics.push(newTopic);
	//clear topics div
	$('#topics').empty();
	//repopulate topics div
	populateTopics();
}
	}
