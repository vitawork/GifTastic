$(document).ready(function() {
  var buttonsarray = ["sad", "angry", "happy", "mad"];

  /////////////a click button > going API > showing img and rating
  function buttonsclick() {
    var buttonname = $(this).attr("data-name");
    console.log(buttonname);

    queryURL =
      "https://api.giphy.com/v1/gifs/search?api_key=ejByJgCwq5JnuHGK49TUEVRB5lh5wQx4&q=" +
      buttonname +
      "&limit=10&offset=0&rating=G&lang=en";

    // Creating an AJAX call for the specific movie button being clicked
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response); //////////////////////////////////////////
      var imgarray = response.data;
      var imgdiv = $("<div class='image'>");

      for (let i = 0; i < imgarray.length; i++) {
        var rating = imgarray[i].rating;
        var p = $("<p>").text("Rating: " + rating);
        imgdiv.append(p);

        var imgURL = imgarray[i].images.original_still.url;
        var image = $("<img>").attr("src", imgURL);
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
        "<li type='button' class='but list-group-item btn btn-light'>"
      ).html(buttonsarray[i]);
      newb.attr("data-name", buttonsarray[i]);

      $("#ul-buttons").prepend(newb);
    }
  }

  $("#button-add").on("click", function() {
    /////////////falta validar///////////////////////////////
    buttonsarray.push(
      $("#textbox")
        .val()
        .trim()
    );
    renderButtons();
    $("#textbox").val("");
  });

  $(document).on("click", ".but", buttonsclick);

  renderButtons();
});
