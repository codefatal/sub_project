$(document).ready(function() {
    var $inputCheckAll = $('input.dev-check-all');
    var $inputCheckItems = $('input.dev-check-item');
    var $BtnCheckAll = $('button.dev-check-all');
    var $BtnCheckItems = $('button.dev-check-item');
    var $recruitTxt = $('.recruitTxt .dev-select-partName');
    var $badgeCount = $('#badgeCount');
    var $totalCount = $('#totalCount');
    var count = 0;

    $.ajax({
        url : "onpick_main.html",
        success : function(result) {
            $(".recruitingfield").parents("li.bannereach").addClass("active");
            $totalCount.text($("li.bannereach").length);
        }
    });

    // nav swiper 부분 버튼 클릭 기능
    $inputCheckAll.click(function() {
        $inputCheckAll.addClass("on");
        $.ajax({
            url : "onpick_main.html",
            success : function(result) {
                $(".recruitingfield").parents("li.bannereach").addClass("active");
                $totalCount.text($("li.bannereach").length);
            }
        });
        count = 0;
        $recruitTxt.text("전체");
        $('button.dev-check-item, button.dev-check-all').removeClass('active'); // 모든 버튼에서 'active' 클래스 제거
        $BtnCheckAll.addClass('active');
        if ($(this).prop('checked')) {
            $badgeCount.css('display', 'none');
            $badgeCount.text('0');
        }
        if ($(this).prop('checked')) {
            $inputCheckItems.prop('checked', false);
            e.preventDefault();
        }
    });

    // 원픽공고 밑에 버튼 클릭 시
    $inputCheckItems.click(function() {
        // 전체 버튼이 활성화 되어 있는 경우
        if($inputCheckAll.hasClass("on")) {
            // 전체 버튼 비활성화
            $inputCheckAll.removeClass("on");
            // main html로 들어가서 li.bannereach 클래스 모든 active 클래스 제거
            $.ajax({
                url : "onpick_main.html",
                success : function(result) {
                    $(".recruitingfield").parents("li.bannereach").removeClass("active");
                }
            });
        }
        // 버튼 클릭 시 
        if ($(this).prop('checked')) {
            // 버튼 텍스트 추출
            $thisinputCheck = $(this).next().text();
            // 전체 버튼 비활성화
            $inputCheckAll.prop('checked', false);
            // main html 불러오기
            $.ajax({
                url : "onpick_main.html",
                success : function(result) {
                    // .recruitingfield 클래스 반복 돌리기
                    $(".recruitingfield").each(function() {
                        // .recruitingfield 클래스 자식 요소의 텍스트 추출
                        var recruitingfield = $(this).children().text();
                        // 추출한 텍스트 양옆 공백 제거
                        recruitingfield = $.trim(recruitingfield);
                        // 텍스트 비교
                        if($thisinputCheck == recruitingfield) {
                            // 텍스트가 동일한 경우 li.bannereach 클래스에 active 클래스 추가
                            $(this).parents("li.bannereach").addClass("active");
                            // 카운터 증가
                            count++;
                        }
                    });
                    // 증가한 카운터 값 총 건수 갱신
                    $totalCount.text(count);
                }
            });
            // 전체 버튼 외 모든 버튼이 비활성화 시
        } else if($inputCheckItems.filter(':checked').length === 0) {
            // 전체 버튼 활성화
            $inputCheckAll.addClass("on");
            $inputCheckAll.prop('checked', true);
            $recruitTxt.text("전체");
            $badgeCount.css('display', 'none');
            $badgeCount.text('0');
            $.ajax({
                url : "onpick_main.html",
                success : function(result) {
                    $(".recruitingfield").parents("li.bannereach").addClass("active");
                    $totalCount.text($("li.bannereach").length);
                }
            });
            // 카운터 초기화
            count = 0;
            e.preventDefault();
        } else {
            // 버튼 텍스트 추출
            $thisinputCheck = $(this).next().text();
            // main html 불러오기
            $.ajax({
                url : "onpick_main.html",
                success : function(result) {
                    // .recruitingfield 클래스 반복 돌리기
                    $(".recruitingfield").each(function() {
                        // .recruitingfield 클래스 자식 요소의 텍스트 추출
                        var recruitingfield = $(this).children().text();
                        // 추출한 텍스트 양옆 공백 제거
                        recruitingfield = $.trim(recruitingfield);
                        // 텍스트 비교
                        if($thisinputCheck == recruitingfield) {
                            // 텍스트가 동일한 경우 li.bannereach 클래스에 active 클래스 삭제
                            $(this).parents("li.bannereach").removeClass("active");
                            // 카운터 감소
                            count--;
                        }
                    });
                    // 감소한 카운터 값 총 건수 갱신
                    $totalCount.text(count);
                }
            });
        }
        updateResultText();
        // 전체 버튼 외 체크된 버튼이 1개 이상인 경우
        if ($('input.dev-check-item:checked').length >= 1) {
            $badgeCount.css('display', 'block');
            $badgeCount.text('1');
        } else {
            $badgeCount.css('display', 'none');
            $badgeCount.text('0');
        }

    });

    // 상세검색 버튼 기능
    $BtnCheckAll.click(function() {
        $BtnCheckAll.addClass("active");
        $recruitTxt.text("전체");
        if ($(this).hasClass('active')) {
            $BtnCheckItems.removeClass('active');
            e.preventDefault();
        }
    });

    $BtnCheckItems.click(function() {
        $(this).toggleClass("active");
        if ($BtnCheckItems.hasClass('active')) {
            $BtnCheckAll.removeClass('active');
        } else {
            $BtnCheckAll.addClass('active');
        }
    });

    // checked 된 버튼에 따라 원픽공고 오른쪽에 버튼 이름 기재
    function updateResultText() {
        var selectedItems = $inputCheckItems.filter(':checked');
        var selectedLabels = selectedItems.siblings('label').map(function() {
            return $(this).text();
        }).get();
        $recruitTxt.text(selectedLabels.join(', '));

        $('button.dev-check-item, button.dev-check-all').removeClass('active'); // 모든 버튼에서 'active' 클래스 제거

        selectedItems.each(function() {
            var itemValue = $(this).val();
            $('button.dev-check-item[data-code="' + itemValue + '"]').addClass('active');
        });
    }

    // 오름차순 기능 드롭박스 활성화 유무 버튼
    $('.drop-down-box .button-box').click(function() {
        $('.drop-down-box .button-box').toggleClass("active");
    });

    // 드롭박스 버튼 클릭 시 적용
    $('.sort-select-modal button').click(function() {
        var code = $(this).data('code');
        $('#searchOrder').val(code);
        $('.sort-button').text($(this).text());
    });
    
    // 필터 버튼 클릭 시 팝업 활성화
    $('.filter-button').click(function() {
        $('.filter-modal').addClass("active");
    });

    // 초기화 버튼 활성화
    $('.search-reset').click(function() {
        $BtnCheckItems.removeClass("active");
        $BtnCheckAll.addClass("active");
    });

    // 팝업 활성 화 후 적용 버튼 누를 시
    $('.search-button, .close-button').click(function() {
        $('.filter-modal').removeClass("active");
        let count = 0;

        $('.filter-box').each(function() {
            if ($(this).find('.dev-check-item.active').length > 0) {
                count++;
            }
        });
        if ($BtnCheckAll.hasClass("active")) {
            $inputCheckItems.prop('checked', false);
            $inputCheckAll.prop('checked', true);
            $inputCheckAll.addClass("on");
            $badgeCount.css('display', 'none');
            $badgeCount.text('0');
        } else if (!$BtnCheckAll.hasClass("active")) {
            $BtnCheckItems.each(function() {
                $inputCheckAll.removeClass("on");
                $inputCheckAll.prop('checked', false);
                var currentItem = $(this);
                var currentDataCode = currentItem.data('code');

                $inputCheckItems.each(function() {
                    var currentCheckbox = $(this);
                    var currentVal = currentCheckbox.val();

                    if (currentItem.hasClass("active") && currentDataCode == currentVal) {
                        currentCheckbox.prop('checked', true);
                    }
                });
                $badgeCount.css('display', 'block');
                $badgeCount.text(count);
            });
            updateResultText();
        }
    });
});