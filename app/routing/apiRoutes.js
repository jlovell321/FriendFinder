//route to the friends
var friends = require("../data/friends");


module.exports = function(app) {

  //API get request 
  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });

  // API post request 
  app.post("/api/friends", function(req, res) {
    // Create an array for the criteria of best match then parse that
    var bestMatch = {
      name: "",
      photo: "",
      friendDifference: Infinity
    };
    var userData = req.body;
    var userScores = userData.scores;

   //Calculate the difference for the users (used the Star wars 6 application to help work through below)
    var totalDifference;

    //looping through all the friend possibilites then consoling the current friend
    for (var i = 0; i < friends.length; i++) {
      var currentFriend = friends[i];
      totalDifference = 0;

      console.log(currentFriend.name);

      // loop through every friends scores and calculate it 
      for (var j = 0; j < currentFriend.scores.length; j++) {
        var currentFriendScore = currentFriend.scores[j];
        var currentUserScore = userScores[j];

        totalDifference += Math.abs(parseInt(currentUserScore) - parseInt(currentFriendScore));
      }

      // change the friend if it's not the highest score
      if (totalDifference <= bestMatch.friendDifference) {
        bestMatch.name = currentFriend.name;
        bestMatch.photo = currentFriend.photo;
        bestMatch.friendDifference = totalDifference;
      }
    }

   // this took me the longest to figure out... (got help from the solution)
    friends.push(userData);

    // Return bestMatch
    res.json(bestMatch);
  });
};
