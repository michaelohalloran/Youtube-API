//Sequence: user searches term-->clicks submit-->handleSubmit-->getData-->render data

//VARIABLES

function startUp() {
	getData();
	// handleSearchBtn();
}

//BUTTON AND INPUT SELECTORS
let $userInput = $("#search");
let $searchBtn = $("#searchBtn");
let $searchOutput = $("#output");
const yt = {
	endpoint: "https://www.googleapis.com/youtube/v3/search",
	part: "snippet",
	apiKEY: "AIzaSyDROgL5-tjYKVrv4Q_g2EGCSLHB89bGAPU"
}

//EVENT LISTENERS
$searchBtn.on("click", handleSearchBtn);

//FUNCTIONS
function getData(searchTerm, callback) {
	

	$.getJSON(`${yt.endpoint}?part=${yt.part}&key=${yt.apiKEY}&q=${searchTerm}`, callback);

	
}

// ?a=1&b=2&c=3
//? starts string, & is the separator, '&-separated values' instead of comma-separated


function renderData(item) {
	//put search data into DOM
	// debugger;
	return `
		<div>
			<h2>${item.snippet.title}</h2><br>
			<p>${item.smippet.thumbnails.url}</p>
		</div>
	`;

}

function displayData(data) {
	if(data) {
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
	let userSearchTerm = $userInput.val();
	
	//clear our userSearchTerm after submitting;
	$userInput.val("");

	//this takes user input, puts it into query string and returns paragraphs of data
	getData(userSearchTerm, displayData);	
}

$(startUp);

//LOGIC FLOW: user hits search, handleSearch grabs value, gives that to getData
//getData makes query string, executes displayData callback
//displayData maps each item in the object into renderData, then feeds that into
//$searchOutput as html