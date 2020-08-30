// from data.js
var tableData = data;

// LEVEL 2: MULTIPLE SEARCH CATEGORIES

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
	})
})

// Create arrays to store distinct countries, states, and shapes
var uniqueCountry = [... new Set(tableData.map(ufo => ufo.country))];
console.log(uniqueCountry);

var uniqueState = [... new Set(tableData.map(ufo => ufo.state))];
console.log(uniqueState);

var uniqueShape = [... new Set(tableData.map(ufo => ufo.shape))];
console.log(uniqueShape);

// Dynamically add unique countries, states and shapes to dropdown menus
uniqueCountry.forEach((country) => {
	d3.select("#country").append("option").text(country)
});

uniqueState.forEach((state) => {
	d3.select("#state").append("option").text(state)
});

uniqueShape.forEach((shape) => {
	d3.select("#shape").append("option").text(shape)
});

// Select the button Clear Filter and the form's inputs and dropdown selections
var country = d3.select("#country");
var state = d3.select("#state");
var shape = d3.select("#shape");
var city = d3.select("#city");
var datetime = d3.select("#datetime");
var button = d3.select("#filter-btn");

// Create event handlers on 
// button.on("click", filterTable);
// form.on("submit", filterTable);
country.on("change", updateFilters);
state.on("change", updateFilters);
shape.on("change", updateFilters);
city.on("change", updateFilters);
datetime.on("change", updateFilters);
button.on("click", clear);

// Create filter object to keep track of all filters
var multifilters = {};

// Create a function to dynamically add a filter value each time user add any filter
function updateFilters() {

  // Save the element, value, and id of the filter that was changed
	// In an event, "this" refers to the html element that received the event.
  var inputElement = d3.select(this);

	console.log(this)

 // select(".form-control")
  //var inputValue = inputElement.property("value");
  var filterId = inputElement.attr("id");
  var inputValue = inputElement.property("value");

  // If a filter value was entered then add that filterId and value
  // to the filters list. Otherwise, clear that filter from the filters object.
  if (inputValue) {
	  multifilters[filterId] = inputValue;
  }
  else {
    delete multifilters[filterId];
  }

  // Call function to apply all filters and rebuild the table
  filterTable();
}

// Complete the event handler function for the form
function filterTable() {

  // Prevent the page from refreshing
  d3.event.preventDefault();

	// Use the form's inputs and dropdown selections to filter the data by multiple attributes
	var results = tableData.filter(function(ufo) {
		for (var key in multifilters) {
			if (multifilters[key] === undefined || ufo[key] != multifilters[key])
				return false;
		}
		return true;
	});
	
	// Clear out current contents in the table
	tbody.html("");

	// Handle no matching results
	if (results.length === 0) {
		tbody.text(`No ufo sightings found.`);
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

function clear() {
	multifilters = {};
	filterTable();
	document.getElementById("filter-form").reset();
}