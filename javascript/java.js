var search = "";
var queryURL = "";
var returncount = "";
var rightImage = false;
var buttonarr = [];
var gifCount = 0
returncount = $(".number");
/* if (returncount = NaN){
    alert("This is not a number")
}     
*/


$(document).ready(function() {  
    $("#submit").on("click", function() {
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
        cancelbutton.css("margin-left", "1%");
        cancelbutton.attr("remove", gifCount);
        cancelbutton.addClass("removal"); 
        cancelbutton.text("X");
        cancelbutton.css("color", "red");
        newbutton.append(cancelbutton);
        gifCount++;
        $(".buttons").append(newbutton);
        buttonarr.push(searchitem);
        console.log(buttonarr);
        JSON.stringify(buttonarr);
        localStorage.setItem("buttons", buttonarr);
        } else {
          return;
        }
    });
    $(document).on('click', '.removal', function() {
      //removal function
    })
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
              rating = rating.toUpperCase();
    
    
              var gifrating = $("<p>").text("Rating: " + rating);
              var favorite = $("<button>").text("Add to Favorites");
              favorite.attr("class", "favorito");
              var personImage = $("<img>");
              personImage.attr("class", "picture");
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
              alert("Hello");
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
  