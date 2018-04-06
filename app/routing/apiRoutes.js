
var friends = require('../data/friends.js');

module.exports = function(app) {

    // The get for api
    app.get('/api/friends', function(req, res) {
        res.json(friends);
    });

    // The post for api
    app.post('/api/friends', function(req, res) {
        var difference = 40;
        var matchName = '';
        var matchPhoto = '';
        // each loop needs to go through friends.js
        friends.forEach(function(friend) {
            var matchedScoresArray = [];
            var totalDifference = 40;

            function add(total, num) {
                return total + num;
            }

            // loop through the scores and calculate new value
            for (var i = 0; i < friend.scores.length; i++) {
                matchedScoresArray.push(Math.abs(parseInt(req.body.scores[i]) - parseInt(friend.scores[i])));

            }

            // final difference
            totalDifference = matchedScoresArray.reduce(add, 0);

            
            if (totalDifference < difference) {
                difference = totalDifference;
                matchName = friend.name;
                matchPhoto = friend.photo;
            }
        });
        // Final match
        res.json({
            name: matchName,
            photo: matchPhoto
        });

        
        friends.push(req.body);
    });
}