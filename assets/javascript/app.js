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

    //Converting the user inputted First Train Time into Military Time Format
		var firstTrainTime = snapshot.val().firstTrain;
		var firstMilitaryTime = moment(firstTrainTime, "hh:mm a").format("HH:mm");

		//Breaking up the first Military Time into smaller pieces so we can do math
		var firstTime = firstMilitaryTime.split(':');
		var firstHour = firstTime[0];
		var firstMin = firstTime[1];

		console.log(firstHour);
		console.log(firstMin);

		//Grabbing the current hour and minute so we can do math
		var currentHour = moment().format('H');
		var currentMin = moment().format('m');

		var current = (currentHour * 60) + parseInt(currentMin);
		var first = (firstHour * 60) + parseInt(firstMin);

		if (first < current) {
			var minAway = (((Math.ceil((current-first)/frequency)) * frequency) + first) - current;
			console.log (minAway);
			var nextArrivalTime = moment().add(minAway, "minutes").format('h:mm A');
		} 
		else {
			var minAway = first - current;
			var nextArrivalTime = moment(firstMilitaryTime, "HH:mm").format('h:mm A');
		}	

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