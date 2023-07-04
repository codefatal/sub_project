$(document).ready(function() {
    $searchText = $('#searchText');
    $searchButton = $('.search-button'); //on("click")
    
    $('#searchText').on("click", function(){
        var val = $(this).val();
        $(".bannereach").hide();
        var temp = $(".bannereach:contains('" + val +"')");
        $(temp).show(); 

     
    })

    $(clickHandler);
    function clickHandler(){
        $('.search-button').on("click", function(){
            $("temp").show();
            $(".bannereach").hide();
        });
    }

    $.ajax({
        url : "onpick_main.html",
        success : function(result) {
            $(".companyname").children().text();
            $('.bannereach');
        }
    });
});
//   $('#searchText').on("", function(){
    // var val = $(this).val();
    // $(".bannereach").hide();
    // var temp = $(".bannereach:contains('" + val +"')");
    // $(temp).show(); 

 