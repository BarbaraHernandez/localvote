$(document).ready(function() {
  var detailInput = $("#submitDescription");
  var titleInput = $("#submitTitle");
  var topicInput = $("#selectTopic");
  var form = $("#newPolicy");
  //default value of topic
  topicInput.val("General");
  //event listener
  $(form).on("submit", function handleSubmit(event) {
    event.preventDefault();
    if (!detailInput.val() || !titleInput.val()) {
      return;
    }
    var newPolicy = {
      title: titleInput.val().trim(),
      category: topicInput.val().trim(),
      policyDetail: detailInput.val().trim()
      //not sure if I need to pass in time for timestamp
    };

    console.log("New Policy: " + newPolicy);

    submitPolicy(newPolicy);
  });

  function submitPolicy(Policy) {
    $.post("/api/posts", Policy, function() {
      window.location.href = "/policies";
    });
  }
});
