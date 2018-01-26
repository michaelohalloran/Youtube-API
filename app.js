//Sequence: user searches term-->clicks submit-->handleSubmit-->getData-->render data

//VARIABLES

function startUp() {
	getData();
	// handleSearchBtn();
}

//BUTTON AND INPUT SELECTORS
let $userInput = $("#search");
let $searchBtn = $("#searchBtn");
let $nextBtn = $("#nextBtn");
let $searchOutput = $("#output");
let maxResults = 5;
let nextPageToken;
let userSearchTerm;

const yt = {
	channelURL: "https://www.youtube.com/channel",
	endpoint: "https://www.googleapis.com/youtube/v3/search",
	part: "snippet",
	apiKEY: "AIzaSyDROgL5-tjYKVrv4Q_g2EGCSLHB89bGAPU",
	clickable: "https://www.youtube.com/watch"
}

//EVENT LISTENERS
$searchBtn.on("click", handleSearchBtn);
$nextBtn.on("click", loadMoreResults);

//FUNCTIONS
function getData(searchTerm, callback) {
	$.getJSON(`${yt.endpoint}?part=${yt.part}&maxResults=${maxResults}&key=${yt.apiKEY}&q=${searchTerm}`, callback);	
}

// ?a=1&b=2&c=3
//? starts string, & is the separator, '&-separated values' instead of comma-separated


function renderData(item) {
	// debugger;
	return `
		<div>
			<h2>${item.snippet.title}</h2><br>
			<a href="${yt.clickable}?v=${item.id.videoId}" target="_blank"><img src="${item.snippet.thumbnails.medium.url}"</a><br>
			<a href="${yt.channelURL}/${item.snippet.channelId}" target="_blank">Click here for more videos like this one</a>
		</div>
	`;
	// put this in the a tag above?: data-lightbox="gallery" 

}

function displayData(data) {
	if(data) {
		nextPageToken = data.nextPageToken;
		//take each object in items array and run it through renderData
		const results = data.items.map((item)=>renderData(item));
		$searchOutput.html(results);

		// for(let i = 0; i<data.items.length; i++) {
		// 	$searchOutput.append(`<p>${data.items[i].snippet.title}</p>`);
		// }	
	}
}

//this should run getData and renderData
function handleSearchBtn() {

	//grab val of user input 
	userSearchTerm = $userInput.val();
	
	//clear our userSearchTerm after submitting;
	$userInput.val("");

	//this takes user input, puts it into query string and returns paragraphs of data
	getData(userSearchTerm, displayData);	
}

function loadMoreResults() {
	//re-run getJSON, this time with newPageToken, then redisplayData
	$.getJSON(`${yt.endpoint}?part=${yt.part}&pageToken=${nextPageToken}&maxResults=${maxResults}&key=${yt.apiKEY}&q=${userSearchTerm}`, displayData);

}

$(startUp);

//LOGIC FLOW: user hits search, handleSearch grabs value, gives that to getData
//getData makes query string, executes displayData callback
//displayData maps each item in the object into renderData, then feeds that into
//$searchOutput as html