$( document ).ready(function() {

var train = '';
var destination = '';
var firstTrain = '';
var frequency = '';

//Firebase URL Listed Below
var dataRef = new Firebase("https://traintimenyc.firebaseio.com/");

//On Button Click - Will Add Train Data
	$('#addTrainBtn').on('click', function() {
	  train = $('#trainNameInput').val();
		destination = $('#destinationInput').val();
		firstTrain = $('#firstTrainInput').val();
		frequency = $('#frequencyInput').val();

	// Empties Fields After Submitting Data
		$('#trainNameInput').val('');
		$('#destinationInput').val('');
		$('#firstTrainInput').val('');
		$('#frequencyInput').val('');

		dataRef.push({

			train: train,
			destination: destination,
			firstTrain: firstTrain,
			frequency: frequency

		});

		return false;

// End of Click Function

	});

// Child Added Function for Data

		dataRef.on("child_added", function(snapshot) {

		// Logs all of the user-input data to the console
		console.log(snapshot.val().train + " = train");
		console.log(snapshot.val().destination + " = destination");
		console.log(snapshot.val().firstTrain + " = nextTrain");
		console.log(snapshot.val().frequency +" = frequency");

		// Variables assigned to equal value of child_added inputs
		var train = snapshot.val().train;
		var destination = snapshot.val().destination;
		var firstTrain = snapshot.val().firstTrain;
		var frequency = snapshot.val().frequency;

		// Moment JS
		var timeHour = moment().format('H');
		var timeMin = moment().format('m');
		var ftHour = moment(firstTrain, "HH:mm").format('H');
		var ftMin = moment(firstTrain, "HH:mm").format('m');

		var ftMoment = (ftHour * 60) + (ftMin * 1);
		var timeMoment = (timeHour * 60) + (timeMin * 1);

	// Find how much time has passed since the first train
		var diff = timeMoment - ftMoment;

	// Find how many trains have come so far
		var trainsSinceFirst = Math.floor(diff/frequency);

	// Find how long until the next train comes
		var nextArrival = ((trainsSinceFirst + 1) * frequency) + ftMoment;
		
	// Handle negative values for minAway and nextArrival
		if (ftMoment < timeMoment) {
			var minAway = nextArrival - timeMoment;
			var nextArrival = moment().add(minAway, 'minutes').format('HH:mm');
		} 
		else {
			var nextArrival = firstTrain;
			var minAway = ftMoment - timeMoment;
		};

	// Appends new information to table
	$("#trainData").append("<tr><td>" + train + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextArrival + "</td><td>" + minAway + "</td></tr>");

			}, function (errorObject) {
					console.log('The read failed' + errorObject.code);

		}); 


// End of Javascript

});