$(document).ready(function() {
    var $inputCheckAll = $('input.dev-check-all');
    var $inputCheckItems = $('input.dev-check-item');
    var $filterModal = $('.filter-modal');

    var $filterPartCtgrAll = $filterModal.find(".dev-wrap-filterPartCtgr .dev-check-all");
    var $filterPartCtgrItem = $filterModal.find(".dev-wrap-filterPartCtgr .dev-check-item");
    var $filterLocalAll = $filterModal.find(".dev-wrap-filterLocal .dev-check-all");
    var $filterLocalItem = $filterModal.find(".dev-wrap-filterLocal .dev-check-item");
    var $filterCareerItem = $filterModal.find(".dev-wrap-filterCareer .dev-check-item");
    var $filterEduLevelItem = $filterModal.find(".dev-wrap-filterEduLevel .dev-check-item");
    var $filterCoTypeItem = $filterModal.find(".dev-wrap-filterCoType .dev-check-item");
    var $filterDayItem = $filterModal.find(".dev-wrap-filterDay .dev-check-item");
    var $recruitTxt = $('.recruitTxt .dev-select-partName');
    var $badgeCount = $('#badgeCount');
    var $totalCount = $('#totalCount');

    var count = 0;
    var totalcount = 0;

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
        totalcount = 0;
        $recruitTxt.text("전체");
        $filterPartCtgrAll.removeClass("active");
        $filterPartCtgrItem.removeClass("active");
        $filterPartCtgrAll.addClass('active');
        if ($(this).prop('checked')) {
            if(count == 0) {
                $badgeCount.css('display', 'none');
                $badgeCount.text(0);
            } else {
                $badgeCount.css('display', 'block');
                $badgeCount.text(count-1);
            }
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
                    updateList();
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
                    if($('input.dev-check-item:checked').length == 1) {
                        $("li.bannereach").css('display', 'none');
                    }
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
                            $(this).parents("li.bannereach").css('display', 'grid');
                            // 카운터 증가
                            totalcount++;
                        }
                    });
                    updateList();
                    // 증가한 카운터 값 총 건수 갱신
                    $totalCount.text(totalcount);
                }
            });
            // 전체 버튼 외 모든 버튼이 비활성화 시
        } else if($inputCheckItems.filter(':checked').length === 0) {
            // 전체 버튼 활성화
            $inputCheckAll.addClass("on");
            $inputCheckAll.prop('checked', true);
            $filterPartCtgrAll.addClass("active");
            $filterPartCtgrItem.removeClass("active");
            $recruitTxt.text("전체");
            $badgeCount.css('display', 'none');
            $badgeCount.text('0');
            $.ajax({
                url : "onpick_main.html",
                success : function(result) {
                    $(".recruitingfield").parents("li.bannereach").addClass("active");
                    $(".recruitingfield").parents("li.bannereach").css('display', 'grid');
                    $totalCount.text($("li.bannereach").length);
                    updateList();
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
                            $(this).parents("li.bannereach").css('display', 'none');
                            // 카운터 감소
                            totalcount--;
                        }
                    });
                    updateList();
                    // 감소한 카운터 값 총 건수 갱신
                    $totalCount.text(totalcount);
                }
            });
        }
        updateResultText();
        // 전체 버튼 외 체크된 버튼이 1개 이상인 경우
        if ($('input.dev-check-item:checked').length >= 1) {
            if(count == 0) {
                $badgeCount.css('display', 'block');
                $badgeCount.text(count+1);
            } else {
                $badgeCount.css('display', 'block');
                $badgeCount.text(count);
            }
        } else {
            if(count == 0) {
                $badgeCount.css('display', 'none');
                $badgeCount.text(0);
            } else {
                $badgeCount.css('display', 'block');
                $badgeCount.text(count-1);
            }
        }
    });

    // 상세검색 팝업 내 버튼 기능
    $filterPartCtgrAll.click(function() {
        $filterPartCtgrAll.addClass("active");
        if ($(this).hasClass('active')) {
            $filterPartCtgrItem.removeClass('active');
        }
    });

    $filterPartCtgrItem.click(function() {
        $(this).toggleClass("active");
        if ($filterPartCtgrItem.hasClass('active')) {
            $filterPartCtgrAll.removeClass('active');
        } else {
            $filterPartCtgrAll.addClass('active');
        }
    });
    
    $filterLocalAll.click(function() {
        $filterLocalAll.addClass("active");
        if ($(this).hasClass('active')) {
            $filterLocalItem.removeClass('active');
        }
    });

    $filterLocalItem.click(function() {
        $(this).toggleClass("active");
        if ($filterLocalItem.hasClass('active')) {
            $filterLocalAll.removeClass('active');
        } else {
            $filterLocalAll.addClass('active');
        }
    });

    $filterCareerItem.click(function() {
        $(this).toggleClass("active");
    });

    $filterEduLevelItem.click(function() {
        $(this).toggleClass("active");
    });

    $filterCoTypeItem.click(function() {
        $(this).toggleClass("active");
    });

    $filterDayItem.click(function() {
        $(this).toggleClass("active");
    });



    // checked 된 버튼에 따라 원픽공고 오른쪽에 버튼 이름 기재
    function updateResultText() {
        var selectedItems = $inputCheckItems.filter(':checked');
        var selectedLabels = selectedItems.siblings('label').map(function() {
            return $(this).text();
        }).get();
        $recruitTxt.text(selectedLabels.join(', '));

        $filterPartCtgrAll.removeClass('active');
        $filterPartCtgrItem.removeClass('active');

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
        $filterPartCtgrAll.addClass("active");
        $filterPartCtgrItem.removeClass("active");
        $filterLocalAll.addClass("active");
        $filterLocalItem.removeClass("active");
        $filterCareerItem.removeClass("active");
        $filterEduLevelItem.removeClass("active");
        $filterCoTypeItem.removeClass("active");
        $filterDayItem.removeClass("active");
    });

    // 팝업 활성 화 후 적용 버튼 누를 시
    $('.search-button, .close-button').click(function() {
        $('.filter-modal').removeClass("active");
        count = 0;

        $('.filter-box').each(function() {
            if ($(this).find('.dev-check-item.active').length > 0) {
                count++;
            }
        });
        if ($filterPartCtgrAll.hasClass("active")) {
            $inputCheckItems.prop('checked', false);
            $inputCheckAll.prop('checked', true);
            $inputCheckAll.addClass("on");
            $recruitTxt.text("전체");
        } else if (!$filterPartCtgrAll.hasClass("active")) {
            $filterPartCtgrItem.each(function() {
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
            });
            updateResultText();
        }
        if(count >= 1) {
            $badgeCount.css('display', 'block');
            $badgeCount.text(count);
        } else {
            $badgeCount.css('display', 'none');
            $badgeCount.text(0);
        }
    });
});