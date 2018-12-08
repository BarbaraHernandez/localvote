$(document).ready(function() {
  var url = window.location.search;
  var policyId;
  var voterId = "000000";
  var voteVal;
  var eligible = false;
  //get and set policy id
  if (url.indexOf("?policy=") !== -1) {
    policyId = url.split("=")[1];
    getPolicy(policyId);
  }

  //verify user id
  //if (*conditional for logged in*) {
  //capture user id
  //voterId = user id;
  //eligible = true;
  //}

  //capturing vote variables
  var voteForm = $("#voteForm");
  var yesVote = $("#yesVote").val();
  var noVote = $("#noVote").val();

  //event listener
  $(voteForm).on("submit", function handleVote(event) {
    event.preventDefault();

    $.ajax({
      method: "GET",
      url: "/api/account",
      data: get
    }).then(function(data) {
      console.log(data);
    });

    /*
    //determine vote
    if (yesVote === 1 || noVote === 0) {
      voteVal = true;
    } else if (noVote === 1) {
      voteVal = false;
    }

    var newVote = {
      postId: policyId,
      accountId: voterId,
      choice: voteVal
    };

    //validate for user has not voted
    if ((eligible = true)) {
      verifyRecord(policyId, voterId);
    } else {
      return err("Sorry, you are not eligible to vote.");
    }
    */
  });

  function verifyRecord(policyId, voterId) {
    $.get("/api/votes/" + policyId + "/" + voterId, function(err, data) {
      if (data) {
        return err("You have already voted on this policy.");
      }
      if (err) {
        console.log("No previous vote found");
        submitVote(newVote);
      }
    });
  }
});
