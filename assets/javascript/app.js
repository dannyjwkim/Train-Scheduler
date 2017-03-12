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

 //  var train = "";
	// var destination = "";
	// var firstTrain = "";
	// var frequency = "";

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
      // TIMESTAMP records when data was added around the globe according to the server time
  		dateAdded: firebase.database.ServerValue.TIMESTAMP
  	});
  });

	db.ref().on("child_added", function(childSnapshot) {



});