$( document ).ready(function() {

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDdSeUVMnAMapB8XPpfsw7lx5sHHIlyTO0",
    authDomain: "fir-intro-e70c5.firebaseapp.com",
    databaseURL: "https://fir-intro-e70c5.firebaseio.com",
    storageBucket: "fir-intro-e70c5.appspot.com",
    messagingSenderId: "877686617996"
  };

  firebase.initializeApp(config);

  var db = firebase.database();

	$("#submit").on("click", function(event){
  	event.preventDefault();

  	//Assigning the inputted data to variables
  	var train = $("#train").val().trim();
  	var destination = $("#destination").val().trim();
  	var firstTrain = $("#firstTrain").val().trim();
  	var frequency = $("#frequency").val().trim();

  	//Empties the input fields after input has been submitted
  	$("#train").val('');
		$("#destination").val('');
		$("#firstTrain").val('');
		$("#frequency").val('');

		//Pushing the inputted data to firebase
  	db.ref().push({
  		train: train,
  		destination: destination,
  		firstTrain: firstTrain,
  		frequency: frequency,
  	});
  });

	//Creating an event for when the inputted data is added as a child to the database
	db.ref().on("child_added", function(snapshot) {

		//Grabbing the static data
    var trainName = snapshot.val().train;
    var destinationName = snapshot.val().destination;
    var frequency = snapshot.val().frequency;

    //Grabbing then converting the user inputted First Train Time into Military Time Format
		var firstTrainTime = snapshot.val().firstTrain;
		var firstMilitaryTime = moment(firstTrainTime, "hh:mm a").format("HH:mm");

		//Breaking up the first Military Time into smaller pieces so we can do math
		var firstTime = firstMilitaryTime.split(':');
		var firstHour = firstTime[0];
		var firstMin = firstTime[1];

		//Grabbing the current hour and minute so we can do math
		var currentHour = moment().format('H');
		var currentMin = moment().format('m');

		// Parsing and converting all the values into Total Minutes 
		var current = (currentHour * 60) + parseInt(currentMin);
		var first = (firstHour * 60) + parseInt(firstMin);

		// First part of conditional handles if first train has already gone
		if (first < current) {
			// If train has already gone, subtract the first train's total minutes value from the current time's total minutes value, then divide that by the train frequency. Then round up using the Math.ceil function to get the nth value of the next train. Then multiply that rounded up value (which represents the next train) by the frequency, add the first train time and then subtract the curent time to get the minAway value.
			var minAway = (((Math.ceil((current-first)/frequency)) * frequency) + first) - current;
			// Add the minAway value to the current time and convert to proper time format
			var nextArrivalTime = moment().add(minAway, "minutes").format('h:mm A');
		} 
		// Second part of conditional handles if first train has NOT yet arrived
		else {
			// If train has NOT yet arrived simply subtract current total minutes from first train total minutes
			var minAway = first - current;
			// Then simply return the value of the First Train Time as inputted by the user, but converted to Military Time in order to convert back into the desired time format
			var nextArrivalTime = moment(firstMilitaryTime, "HH:mm").format('h:mm A');
		}	

		// Append the desired data results to the table
  	$("#schedule").append(
			'<tr>' + 
				'<td>' + trainName + '</td>' +
				'<td>' + destinationName + '</td>' +
				'<td>' + frequency + '</td>' +
				'<td>' + nextArrivalTime + '</td>' + 
				'<td>' + minAway + '</td>' +
			'</tr>'	
		);

	});

});