$(document).ready(function() {
  console.log("js loaded");

  var url = window.location.search;
  var policyId = 00000;
  var voteVal;
  // var voterId = "000000";
  // var eligible = false;
  //get and set policy id
  if (url.indexOf("?policy=") !== -1) {
    policyId = url.split("=")[1];
    getPolicy(policyId);
  }

  //if logged in, mark as eligible
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

    console.log("event prevent default");

    //get account info--not in use
    // $.ajax({
    //   method: "GET",
    //   url: "/api/account"
    // }).then(function(data) {
    //   console.log("then function");
    //   console.log(data);
    // });

    //determine vote
    if (yesVote === 1 || noVote === 0) {
      voteVal = true;
    } else if (noVote === 1) {
      voteVal = false;
    }

    var newVote = {
      postId: policyId,
      // accountId: voterId,
      choice: voteVal
    };

    console.log("New vote: " + newVote);

    //validate for user has not voted --not in use
    // if ((eligible = true)) {
    //   verifyRecord(policyId, voterId);
    // } else {
    //   return err("Sorry, you are not eligible to vote.");
    // }

    submitVote(newVote);
  });

  function submitVote(Vote) {
    $.post("/api/votes", Vote, function() {
      window.location.href = "/policies";
    });
  }
  // function verifyRecord(policyId, voterId) {
  //   $.get("/api/votes/" + policyId + "/" + voterId, function(err, data) {
  //     if (data) {
  //       return err("You have already voted on this policy.");
  //     }
  //     if (err) {
  //       console.log("No previous vote found");
  //       submitVote(newVote);
  //     }
  //   });
  // }
});
