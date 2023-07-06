$(document).ready(function () {
    $searchText = $('#searchText');
    $searchButton = $('.search-button');

    $('#searchText').on("keyup", function () {
        //Enter의 키코드 13
        if (event.keyCode === 13) {

            //텍스트필드에 입력한 값을 val에 저장
            var val = $(this).val();

            //입력한 값을 읽어낸 후 클래스 bennereach에 hide메소드 호출하여 화면에 보이지 않게함
            $(".bannereach").hide();

            //val 변수에 저장된 검색어를 포함하는 모든 bannereach 클래스 요소를 선택하여 temp 변수에 할당
            //:contains 선택자 - 특정 문자열을 포함한 요소를 선택함.
            var temp = $(".bannereach:contains('" + val + "')");

            //temp에 할당된 요소들을 보여줌.
            $(temp).show();
        }
    })

    clickHandler();
    function clickHandler() {
        $('.search-button').on("click", function () {
            //텍스트필드에 입력한 값을 val에 저장
            var val = $('#searchText').val();

            //입력한 값을 읽어낸 후 클래스 bennereach에 hide메소드 호출하여 화면에 보이지 않게함
            $(".bannereach").hide();

            //val 변수에 저장된 검색어를 포함하는 모든 bannereach 클래스 요소를 선택하여 temp 변수에 할당
            //:contains 선택자 - 특정 문자열을 포함한 요소를 선택함.
            var temp = $(".bannereach:contains('" + val + "')");

            //temp에 할당된 요소들을 보여줌.
            $(temp).show();
        });
    }


    $.ajax({
    url: "onpick_main.html",
    success: function (result) {
        $(".companyname").children().text();
        $('.bannereach');
        }
    });
});

