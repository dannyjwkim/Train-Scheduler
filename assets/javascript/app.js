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

  	var train = $("#train").val().trim();
  	var destination = $("#destination").val().trim();
  	var firstTrain = $("#firstTrain").val().trim();
  	var frequency = $("#frequency").val().trim();

  	$("#train").val('');
		$("#destination").val('');
		$("#firstTrain").val('');
		$("#frequency").val('');

  	db.ref().push({
  		train: train,
  		destination: destination,
  		firstTrain: firstTrain,
  		frequency: frequency,
  	});
  });

	db.ref().on("child_added", function(snapshot) {

    var trainName = snapshot.val().train;
    var destinationName = snapshot.val().destination;
    var frequency = snapshot.val().frequency;

		var firstTrainTime = snapshot.val().firstTrain;

  	$("#schedule").append(
				'<tr>' + 
					'<td>' + trainName + '</td>' +
					'<td>' + destinationName + '</td>' +
					'<td>' + frequency + '</td>' +
					// '<td>' + nextArrivalTime + '</td>' + 
					// '<td>' + minAwayTime + '</td>' +
				'</tr>'
		);

				// $("#schedule")
  		// .append(trainName)
  		// .append(destinationName)
  		// .append(frequency)



	});



});