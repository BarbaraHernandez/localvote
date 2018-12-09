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
  // var voteForm = $("#voteForm");
  
  //event listener
  $("#voteForm").on("submit", function handleVote(event) {
    event.preventDefault();

    console.log("event prevent default");

    var voteVal = $("input:checked").val();

    console.log("Vote: " + voteVal);

    //get account info--not in use
    // $.ajax({
    //   method: "GET",
    //   url: "/api/account"
    // }).then(function(data) {
    //   console.log("then function");
    //   console.log(data);
    // });

    var newVote = {
      postId: policyId,
      // accountId: voterId,
      choice: choice
    };

    //determine vote
    if (voteVal === 1) {
      var choice = true;
      console.log("choice = " + choice);
      submitVote(newVote);
    } else if (voteVal === 0) {
      var choice = false;
      submitVote(newVote);
    }

    //validate for user has not voted --not in use
    // if ((eligible = true)) {
    //   verifyRecord(policyId, voterId);
    // } else {
    //   return err("Sorry, you are not eligible to vote.");
    // }
  });

  function submitVote(newVote) {
    $.post("/api/votes", newVote, function() {
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
