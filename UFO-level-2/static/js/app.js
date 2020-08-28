// from data.js
var tableData = data;

// Level 2: Multiple Search Categories

// Get a reference to the table body
var tbody = d3.select("tbody");

// Loop through each ufo object in the data array
tableData.forEach((ufo) => {

	// Use d3 to append one table row `tr` for each ufo object
	var row = tbody.append("tr");

	// Use `Object.entries` and forEach to iterate through keys and values
	Object.entries(ufo).forEach(([key, value]) => {

		// Use d3 to append one cell per ufo object value (date, city, state, country, shape, duration, and comments)  
		var cell = row.append("td");
		cell.text(value);
	});
});

// Create empty arrays to store countries, states, and shapes
var country = tableData.map(ufo => ufo.country);
var state = tableData.map(ufo => ufo.state);
var shape = tableData.map(ufo => ufo.shape);

// Select the button
var button = d3.select("#filter-btn");

// Select the form
var form = d3.select("form");

// Create event handlers 
button.on("click", runEnter);
form.on("submit", runEnter);

// Complete the event handler function for the form
function runEnter() {

  // Prevent the page from refreshing
  d3.event.preventDefault();

  // Select the input element and get the raw HTML node
  var inputElement = d3.select(".form-control");

  // Get the value property of the input element
  var inputValue = inputElement.property("value");

  // Use the form input to filter the data by datetime
	var results = tableData.filter(ufo => ufo.datetime === inputValue);
	
	// Clear out current contents in the table
	tbody.html("");

	// Handle no matching results
	if (results.length === 0) {
		tbody.text(`No ufo sightings on ${inputValue}.`);
	}
	else {
		results.forEach((ufo) => {
			var row = tbody.append("tr");
			Object.entries(ufo).forEach(([key, value]) => {
				var cell = row.append("td");
				cell.text(value);
			});
		});
	};
};