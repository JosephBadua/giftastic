var search = "";
var queryURL = "";
var returncount = "";
var rightImage = false;
var buttonarr = [];
var favorites = [];
var storage = [];
var gifCount = 0
returncount = $(".number");
/* if (returncount = NaN){
    alert("This is not a number")
}     
*/


$(document).ready(function() { 
  var storedButtons = JSON.stringify(localStorage.getItem("buttons"));
  console.log(storedButtons);
  buttonarr = storedButtons.split(',');
  for (var i = 0; i < buttonarr.length; i++) {
    gifCount++;
    var pastDiv = $("<div>");
    var pastButton = $("<button>")
    pastButton.text(buttonarr[i]);
    pastButton.attr("id", "gif-" + gifCount);
    pastButton.attr("searchname", buttonarr[i]);
    pastButton.addClass("searchbutton");
    var cancelbutton = $("<button>");
    cancelbutton.attr("remove", gifCount);
    cancelbutton.addClass("removal"); 
    cancelbutton.text("X");
    cancelbutton.css("color", "red");
    pastDiv.css("display", "inline");
    pastDiv.css("margin-right", "1%")
    pastDiv.css("margin-left", "1%")
    pastButton.append(cancelbutton);
    pastDiv.append(pastButton);
    $(".buttons").append(pastDiv);
  }
    $("#submit2").on("click", function() {
      buttonarr = [];
      $(".buttons").empty();
      console.log(buttonarr);
      JSON.stringify(buttonarr)
      localStorage.setItem("buttons", buttonarr);
      console.log(buttonarr);
    });
    $("#submit").on("click", function() {
        var wholeDiv = $("<div>");
        wholeDiv.attr("count", gifCount);
        var newbutton = $("<button>");
        var searchitem = $("#search").val().trim();
        if (searchitem == ""){
          return;
        } else if (buttonarr.indexOf(searchitem) == -1) {
        newbutton.text(searchitem);
        newbutton.attr("id", "gif-" + gifCount);
        newbutton.attr("searchname", searchitem);
        newbutton.attr("class", "searchbutton");
        var cancelbutton = $("<button>");
        cancelbutton.attr("remove", gifCount);
        cancelbutton.addClass("removal"); 
        cancelbutton.text("X");
        cancelbutton.css("color", "red");
        wholeDiv.css("display", "inline");
        wholeDiv.css("margin-right", "1%")
        newbutton.append(cancelbutton);
        gifCount++;
        wholeDiv.append(newbutton);
        $(".buttons").append(wholeDiv);
        buttonarr.push(searchitem);
        JSON.stringify(buttonarr)
        localStorage.setItem("buttons", buttonarr);
        console.log(buttonarr);
        } 
    });   
    $(document).on('click', '.removal', function() {
      $(this).parent().hide();
      var xButton = $(this).attr("remove");
      buttonarr.splice(xButton);
      $("#remove" + gifCount).remove();
      JSON.stringify(buttonarr)
      localStorage.setItem("buttons", buttonarr);
      console.log(buttonarr);
    })
    $("#favoview2").click(function() {
      $(".favbody").empty();
      favorites = [];
      console.log(favorites);
    });
    $(document).on('click', '.favbutton', function() {
    $(".maingifbody").empty();
    search = $(this).attr("data");  
    queryURL = "http://api.giphy.com/v1/gifs/" + search + "?&api_key=P8PaoNi48NLBISkpwyN45QzEEbrFkVdi"
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function(response) {
          console.log(response);
        var results = response.data;
        console.log(results);
          var resultshow = $("<div>");
          var rating = results.rating;    
          var gifrating = $("<p>").text("Rating: " + rating);
          var personImage = $("<img>");
          personImage.attr("class", "picture");
          personImage.attr("src", results.images.original_still.url);
          personImage.attr("running", results.images.original.url);
          personImage.attr("stop", results.images.original_still.url);
          personImage.attr("id", "still");
          personImage.css("height", "500px")
          personImage.css("margin-right", "30px")
          personImage.css("width", "700px")
          gifrating.css("font-size", "30px")
          resultshow.css("float", "left")
          resultshow.css("text-align", "center")
          resultshow.css("margin-bottom", "20px")
          resultshow.prepend(gifrating);
          resultshow.prepend(personImage);
          $(".maingifbody").append(resultshow);
        
        $("img").click(function() {
          if (rightImage) {
            $(this).attr("src", $(this).attr("stop"));
            $(this).attr("id", "still");
            rightImage = false;
          } else {
            $(this).attr("src", $(this).attr("running"));
            $(this).attr("id", "active");
            rightImage = true;
          }
        })
      });
    })
    $(document).on('click', '#favoview', function() {
      $(".maingifbody").empty();
      favorites.push("3dpMzeUbG6TPq9OaSL")
    search = $(this).attr("data");  
    queryURL = "http://api.giphy.com/v1/gifs?ids=" + favorites + "?&api_key=P8PaoNi48NLBISkpwyN45QzEEbrFkVdi"
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function(response) {
          console.log(response);
        var results = response.data;

        for (var i = 0; i < results.length; i++) {
          var resultshow = $("<div>");
          var rating = results[i].rating;    
          var gifrating = $("<p>").text("Rating: " + rating);
          var personImage = $("<img>");
          personImage.attr("class", "picture");
          personImage.attr("src", results[i].images.original_still.url);
          personImage.attr("running", results[i].images.original.url);
          personImage.attr("stop", results[i].images.original_still.url);
          personImage.attr("id", "still");
          personImage.css("height", "500px")
          personImage.css("margin-right", "30px")
          personImage.css("width", "700px")
          gifrating.css("font-size", "30px");
          resultshow.css("float", "left")
          resultshow.css("text-align", "center")
          resultshow.css("margin-bottom", "20px")
          resultshow.prepend(gifrating);
          resultshow.prepend(personImage);
          $(".maingifbody").append(resultshow);
        }
        $("img").click(function() {
          if (rightImage) {
            $(this).attr("src", $(this).attr("stop"));
            $(this).attr("id", "still");
            rightImage = false;
          } else {
            $(this).attr("src", $(this).attr("running"));
            $(this).attr("id", "active");
            rightImage = true;
          }
        })
      })
      favorites.splice(-1,1)
    });
    $(document).on('click', '.searchbutton', function() {
      $(".maingifbody").empty();
       search = $(this).attr("searchname");
       var random = Math.floor(Math.random() * 1000 + 1)
       var number = $("#numRecords").val().trim();
       console.log(search);
       console.log(number)
       queryURL = "http://api.giphy.com/v1/gifs/search?q=" + search + "&offset=" + random + "&api_key=P8PaoNi48NLBISkpwyN45QzEEbrFkVdi&limit=" + number 
    
        $.ajax({
          url: queryURL,
          method: "GET"
        })
          .then(function(response) {
              console.log(response);
            var results = response.data;
    
            for (var i = 0; i < results.length; i++) {
              var resultshow = $("<div>");
              var rating = results[i].rating;    
              var gifrating = $("<p>").text("Rating: " + rating);
              var favorite = $("<button>").text("Add to Favorites");
              favorite.attr("class", "favorito");
              favorite.attr("title", results[i].title);
              var personImage = $("<img>");
              personImage.attr("class", "picture");
              favorite.attr("entire-data", results[i].id)
              personImage.attr("src", results[i].images.original_still.url);
              personImage.attr("running", results[i].images.original.url);
              personImage.attr("stop", results[i].images.original_still.url);
              personImage.attr("id", "still");
              personImage.css("height", "500px")
              personImage.css("margin-right", "30px")
              personImage.css("width", "700px")
              gifrating.css("font-size", "30px")
              resultshow.css("float", "left")
              resultshow.css("text-align", "center")
              resultshow.css("margin-bottom", "20px")
              resultshow.prepend(gifrating);
              resultshow.prepend(personImage);
              resultshow.append(favorite);
              $(".maingifbody").append(resultshow);
            }
            $(".favorito").click(function() {
              var titleName = $(this).attr("title")
              var titleData = $(this).attr("entire-data")
              if (favorites.indexOf(titleData) == -1 ){
              var favoriteGif = $("<button>");
              favoriteGif.attr("class", "favbutton");
              favoriteGif.css("font-size", "16px")
              favoriteGif.css("text-align", "center")
              favoriteGif.css("width", "100%")
              favoriteGif.attr("data", titleData);
              favoriteGif.text(titleName);
              favorites.push(titleData);
              console.log(favorites)
              $(".favbody").append(favoriteGif);
              }
            });
            $("img").click(function() {
              if (rightImage) {
                $(this).attr("src", $(this).attr("stop"));
                $(this).attr("id", "still");
                rightImage = false;
              } else {
                $(this).attr("src", $(this).attr("running"));
                $(this).attr("id", "active");
                rightImage = true;
              }
            })
          });
      });

});
  