$(document).ready(function() {
    $searchText = $('#searchText');
    $searchButton = $('.search-button');
    
    $('#searchText').on("click", function(){
        var val = $(this).val();
        $(".bannereach").hide();
        var temp = $(".bannereach:contains('" + val +"')");
        $(temp).show(); 
    })

    clickHandler();
    function clickHandler(){
        $('.search-button').on("click", function(){
            var val = $('#searchText').val();
            $(".bannereach").hide();
            var temp = $(".bannereach:contains('" + val +"')");
            $(temp).show();
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

 