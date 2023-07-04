$(document).ready(function() {
    $searchText = $('#searchText');
    $searchButton = $('.search-button');

    $.ajax({
        url : "onpick_main.html",
        success : function(result) {
            $(".companyname").children().text();
            $('.bannereach');
        }
    });
});
