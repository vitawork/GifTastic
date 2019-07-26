$(document).ready(function() {
  var buttonsarray = ["sad", "angry", "happy", "mad", "aa", "bb", "cc", "dd"];

  /////////////a click button > going API > showing img and rating
  function buttonsclick() {
    $("#right").empty();
    queryURL =
      "https://api.giphy.com/v1/gifs/search?api_key=ejByJgCwq5JnuHGK49TUEVRB5lh5wQx4&q=" +
      $(this).attr("data-name") +
      "&limit=10&offset=0&rating=G&lang=en";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response); //////////////////////////////////////////
      var imgarray = response.data;

      for (let i = 0; i < imgarray.length; i++) {
        var imgdiv = $("<div class='image'>");
        var rating = imgarray[i].rating;
        var p = $("<p>").text("Rating: " + rating);
        imgdiv.append(p);

        var imgURL = imgarray[i].images.original_still.url;
        var image = $("<img data-state='still' class='gif'>").attr(
          "src",
          imgURL
        );
        image.attr("data-still", imgURL);
        image.attr("data-animate", imgarray[i].images.original.url);
        imgdiv.append(image);

        $("#right").prepend(imgdiv);
      }
    });
  }

  //////////////Showing buttons from the buttonsarray
  function renderButtons() {
    $("#ul-buttons").empty();
    for (let i = 0; i < buttonsarray.length; i++) {
      var newb = $(
        "<button type='button' class='but btn btn-outline-secondary'>"
      ).html(buttonsarray[i]);
      newb.attr("data-name", buttonsarray[i]);

      $("#ul-buttons").prepend(newb);
    }
  }

  ///////////////pausing gif
  $(document).on("click", ".gif", function() {
    var state = $(this).attr("data-state");
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });

  $("#button-add").on("click", function() {
    /////////////tratar de hacer una funcion para ajax///////////////////////////////

    queryURL =
      "https://api.giphy.com/v1/gifs/search?api_key=ejByJgCwq5JnuHGK49TUEVRB5lh5wQx4&q=" +
      $("#textbox")
        .val()
        .trim() +
      "&limit=10&offset=0&rating=G&lang=en";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      var found = false;
      if (response.data.length > 0) {
        found = true;
      }
      if (
        found &&
        $("#textbox")
          .val()
          .trim() !== ""
      ) {
        buttonsarray.push(
          $("#textbox")
            .val()
            .trim()
        );
        renderButtons();
        $("#textbox").val("");
      }
    });
  });

  $(document).on("click", ".but", buttonsclick);

  renderButtons();
});
