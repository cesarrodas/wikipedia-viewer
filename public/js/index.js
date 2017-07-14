//Productivity Tips for Web Designers

$(document).ready(function(){
    var title = "";
    var article;

    $('.random').click(function(){
      window.location.href = "https://en.wikipedia.org/wiki/Special:Random";
    });

    $(document).keypress(function(e) {
      if(e.which == 13) {
        title = document.getElementById("searchbox").value;
        search();
      }
    });

    // My button clicking
    $('.search').click(function(){
      title = document.getElementById("searchbox").value;
      search();
    });


    // My ajax call to Wikipedia API
    function search(){
    $.ajax({
        type: "GET",
        url: "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0|1&gsrlimit=20&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=3&exlimit=max&pithumbsize=400&gsrsearch=" + title + "&callback=?",
        contentType: "application/json; charset=utf-8",
        async: false,
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
          var paging = data.query.pages;
          hit(paging);
        },
        error: function (errorMessage) {
          alert("There was an error getting the content.")
        }
    });
    };
    // This is the hits to the search
    function hit(pages){
      var count = 0;
      var result = "";
      for(var key in pages){
        console.log(pages);
        if(!pages[key].thumbnail || !pages[key].title
          || !pages[key].extract
          || pages[key] === undefined
          || !pages[key].thumbnail.source){
          continue;
        }

        count++;
        if(count % 3 === 1 || count === 1){
          result += "<div class='row text-center'>"+
            "<div class='col-md-10 col-md-offset-1'>";
        }
        result += "<a href='https://en.wikipedia.org/?curid="
          + pages[key].pageid +"' target='_blank'>" +
        "<div class='col-md-4 text-center answer'>" +
        "<div class='thumbnail wiki_img'>" +
        "<div class=' img-responsive'>" +
        "<img src='"+ pages[key].thumbnail.source +
          "' max-height='300px' max-width='300px'>" +
        "</div>"
        + "<div class='caption'>" +
        "<h3>" + pages[key].title + "</h3>" +
        "<p>"+ pages[key].extract +"</p>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</a>";

        if(count % 3 === 0){
          result += "</div></div>";
        }
      }
      $('.query').html(result);
    }
});
