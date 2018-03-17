var randomDate = "02/23/1999";
    var randomFormat = "MM/DD/YYYY";
    var convertedDate = moment(randomDate, randomFormat);

    // Using scripts from moment.js write code below to complete each of the following.
    // Console.log to confirm the code changes you made worked.

    // 1 ...to convert the randomDate into three other date formats
    console.log(moment(convertedDate).format("MM/DD/YY"));
    console.log(moment(convertedDate).format("MMM Do, YYYY hh:mm:ss"));
    console.log(moment(convertedDate).format("X"));
    console.log("----------------------------------------");

    // 2 ...to determine the time in years, months, days between today and the randomDate
    console.log(moment(convertedDate).toNow());
    console.log(moment(convertedDate).diff(moment(), "years"));
    console.log(moment(convertedDate).diff(moment(), "months"));
    console.log(moment(convertedDate).diff(moment(), "days"));
    console.log("----------------------------------------");

    // 3 ...to determine the number of days between the randomDate and 02/14/2001
    var newDate = moment("02/14/2001", randomFormat);
    console.log(moment(convertedDate).diff(moment(newDate), "days"));

    // 4 ...to convert the randomDate to unix time (be sure to look up what unix time even is!!!)
    console.log(moment(convertedDate).format("X"));
    console.log("----------------------------------------");

    // 5 ...to determine what day of the week and what week of the year this randomDate falls on.
    console.log(moment(convertedDate).format("DDD"));
    console.log(moment(convertedDate).format("dddd"));
/*//////////////////////*/


  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCNTdgCZgdGmhgcQkbsUl_A98EJX6FDaDw",
    authDomain: "train-scheduler-pro.firebaseapp.com",
    databaseURL: "https://train-scheduler-pro.firebaseio.com",
    projectId: "train-scheduler-pro",
    storageBucket: "train-scheduler-pro.appspot.com",
    messagingSenderId: "20176884134"
  };
  firebase.initializeApp(config);

  var database = firebase.database();


var apiKey = "";
var url = "";
var trainName = "";
var destination = "";
var firstTrain = "";
var frequencyMin = "";
var nextArrival = "";
var minutesAway = "";
var currenTime = "";
var submit = $("#buton-submit");





$("form").on("submit", function(e){
    e.preventDefault();
    trainName = $("#train-input").val().trim();
    destination = $("#destination-input").val().trim();
    firstTrain = moment($("#first-train-time-input").val().trim(), "HHmmss").format("HH:mm");
    frequencyMin =moment($("#frequency-input").val().trim(), "HHmmss").format("mm");
    // database.ref("destination").set(destination);
    // database.ref("firstDeparture").set(firstDeparture);
    // database.ref("frequencyMin").set(frequencyMin);


var trains = {
    trainName: trainName,
    destination: destination,
    firstTrain: firstTrain,
    frequencyMin: frequencyMin,

}
   database.ref().push(trains); 

    var tBody = $("tbody");
    var tRow = tBody.append("<tr>");
    var tData = tRow.append("<td>");

    database.ref().on("child_added", function(childSnapshot, prevChildKey){
        

         trainName = childSnapshot.val().trainName;
         destination = childSnapshot.val().destination;
         firstTrain = childSnapshot.val().firstTrain;
         frequencyMin = childSnapshot.val().frequencyMin;

        $("tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + firstTrain + "</td><td>" + frequencyMin+ "</td></tr>");
        
      })

   $("#train-input").val("");
   $("#destination-input").val("");
   $("#first-train-time-input").val("");
   $("#frequency-input").val("");

   return false;

});

