var search = "";
var queryURL = "";
var returncount = "";

returncount = $(".number");
/* if (returncount = NaN){
    alert("This is not a number")
}     
*/


$(document).ready(function() {  
    $("button").on("click", function() {
       search = $(this).attr("searchname");
       queryURL = "http://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=P8PaoNi48NLBISkpwyN45QzEEbrFkVdi&limit=10" 
    
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
              var personImage = $("<img>");
              personImage.attr("src", results[i].images.original.url);
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
          });
      });
});
