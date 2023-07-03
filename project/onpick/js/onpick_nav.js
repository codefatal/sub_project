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

    $inputCheckItems.click(function() {
        if($inputCheckAll.hasClass("on")) {
            $inputCheckAll.removeClass("on");
            $.ajax({
                url : "onpick_main.html",
                success : function(result) {
                    $(".recruitingfield").parents("li.bannereach").removeClass("active");
                }
            });
        }
        if ($(this).prop('checked')) {
            $thisinputCheck = $(this).next().text();
            $inputCheckAll.prop('checked', false);
            $.ajax({
                url : "onpick_main.html",
                success : function(result) {
                    $(".recruitingfield").each(function() {
                        var recruitingfield = $(this).children().text();
                        recruitingfield = $.trim(recruitingfield);
                        if($thisinputCheck == recruitingfield) {
                            $(this).parents("li.bannereach").addClass("active");
                            count++;
                        }
                    });
                    $totalCount.text(count);
                }
            });
        } else if($inputCheckItems.filter(':checked').length === 0) {
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
            count = 0;
            e.preventDefault();
        } else {
            $.ajax({
                url : "onpick_main.html",
                success : function(result) {
                    $(".recruitingfield").each(function() {
                        var recruitingfield = $(this).children().text();
                        recruitingfield = $.trim(recruitingfield);
                        if($thisinputCheck == recruitingfield) {
                            $(this).parents("li.bannereach").removeClass("active");
                            count--;
                        }
                    });
                    $totalCount.text(count);
                }
            });
        }
        updateResultText();
        if ($inputCheckItems.prop('checked')) {
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

    $inputCheckAll.on('click', function(e) {
        e.preventDefault();
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
        var count = 0;

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