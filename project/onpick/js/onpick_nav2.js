$(document).ready(function() {
    $searchText = $('#searchText');
    $('#searchText').on("click", function(){
        var val = $(this).val();
        $(".bannereach").hide();
        var temp = $(".bannereach:contains('" + val +"')");
        $(temp).show(); 

     
    })

    $searchButton = $('.search-button'); //on("click")
    $('.search-button').on("click")

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

 