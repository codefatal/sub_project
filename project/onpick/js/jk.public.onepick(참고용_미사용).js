jk.create('jk.public.onepick.joblist', function(options){
    var jkctx                   = this;
    var $el                     = jkctx.$el = $( options.el ).data("class", jkctx);
    var $filterModal            = $el.find(".filter-modal");
    var $sortBox                = $el.find(".drop-down-box .button-box");
    var $totalCount             = $el.find("#totalCount");
    var $form                   = $el.find("#searchForm");
    var $selectPartName         = $el.find(".dev-select-partName"); // 선택한 직무 텍스트
    var $partCtgrAll            = $el.find(".job-tab-list .dev-check-all"); // 탭 직무 전체
    var $partCtgrItem           = $el.find(".job-tab-list .dev-check-item"); // 탭 직무 
    var $recruitJobFilterWrap   = $el.find(".recruitJobFilterWrap");
    var $badgeCount             = $el.find("#badgeCount");
    var $searchLog              = $el.find("#searchLog");
    var $searchList             = $el.find("#searchList");
    var $loading                = $el.find(".dev-wrap-loading");
    var $topButton              = $el.find(".dev-top-button"); // TOP 버튼
    var $searchAjax             = null;
    
    // 필터
    var $filterPartCtgrAll  = $filterModal.find(".dev-wrap-filterPartCtgr .dev-check-all"); // 필터 직무 전체
    var $filterPartCtgrItem = $filterModal.find(".dev-wrap-filterPartCtgr .dev-check-item"); // 필터 직무
    var $filterLocalAll     = $filterModal.find(".dev-wrap-filterLocal .dev-check-all"); // 필터 지역 전체
    var $filterLocalItem    = $filterModal.find(".dev-wrap-filterLocal .dev-check-item"); // 필터 지역
    var $filterCareerItem   = $filterModal.find(".dev-wrap-filterCareer .dev-check-item"); // 필터 경력
    var $filterEduLevelItem = $filterModal.find(".dev-wrap-filterEduLevel .dev-check-item"); // 필터 학력
    var $filterCoTypeItem   = $filterModal.find(".dev-wrap-filterCoType .dev-check-item"); // 필터 기업 형태
    var $filterDayItem      = $filterModal.find(".dev-wrap-filterDay .dev-check-item"); // 필터 날짜

    // form value
    var $pageNo             = $form.find("#pageNo"); 
    var $pageSize           = $form.find("#pageSize"); 
    var $searchOrder        = $form.find("#searchOrder");
    var $codePartCtgr       = $form.find("#codePartCtgr"); // 직무
    var $codeLocal          = $form.find("#codeLocal"); // 지역
    var $codeCareer         = $form.find("#codeCareer"); // 경력
    var $codeEduLevel       = $form.find("#codeEduLevel"); // 학력
    var $codeCoType         = $form.find("#codeCoType"); // 기업형태
    var $codeDay            = $form.find("#codeDay"); // 필터 날짜

    var Mem_Chk             = $el.data("memcheck");

    jkctx.opt = {
        
    };

    function init() {
        jkctx.events.bind();

        new Swiper(".job-tab", {
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },

            initialSlide: 0,
            slidesPerView: "auto",
            spaceBetween: 0,
            observer: true,
            observeParents: true,
            freeMode: true,
            watchSlidesProgress: true,
        });
    }

    jkctx.events = {
        bind: function () {
            $(window).scroll(jkctx.events.onWindowScroll);
             
            $(document).ready(jkctx.events.onDocumentReady);
            $(document).on('mouseenter focus', '.topMenu .top-menu-button', { focus : true }, jkctx.events.onDocumentMouseMoveTopMenu);
            $(document).on('mouseleave', '.topMenu .top-menu-button', { focus : false }, jkctx.events.onDocumentMouseMoveTopMenu);            

            $form.on("submit", jkctx.events.onClickSearchSubmit);

            $el.on("click", ".filter-button", jkctx.events.onClickFilterModalShow);
            $el.on("click", ".drop-down-box .sort-button", jkctx.events.onClickSortBoxShow);
            $el.on("click", ".drop-down-box .sort-select-modal button", jkctx.events.onClickSortBoxItem);
            $el.on("click", ".search-box .search-button", jkctx.events.onClickSearch);
            $el.on("click", ".job-tab-list :checkbox", jkctx.events.onClickTabPartCtgr);
            $el.on("click", ".recruitWrap .foot_banner a", jkctx.events.onClickFooterBanner);
            $el.on("click", ".dev-wrap-dim", jkctx.events.onClickFilterModalDim);
            $el.on("click", ".btnKeywordClear", jkctx.events.onClickBtnKeywordClear);
            $el.on('click', '.dev-top-button', jkctx.events.onClickTopButton);
            $el.on("keydown", "#searchText", jkctx.events.onKeyDownSearchText)

            $filterModal.on("click", ".close-button", jkctx.events.onClickFilterModalClose);
            $filterModal.on("click", ".search-reset", jkctx.events.onClickFilterModalSearchReset);
            $filterModal.on("click", ".search-button", jkctx.events.onClickFilterModalSearchApply);
            $filterModal.on("click", ".dev-wrap-filterPartCtgr button", jkctx.events.onClickFilterPartCtgr);
            $filterModal.on("click", ".dev-wrap-filterLocal button", jkctx.events.onClickFilterLocal);
            $filterModal.on("click", ".dev-wrap-filterCareer button", jkctx.events.onClickFilterCareer);
            $filterModal.on("click", ".dev-wrap-filterEduLevel button", jkctx.events.onClickFilterEduLevel);
            $filterModal.on("click", ".dev-wrap-filterCoType button", jkctx.events.onClickFilterCoType);
            $filterModal.on("click", ".dev-wrap-filterDay button", jkctx.events.onClickFilterDay);
            
            $searchList.on("click", ".devAddScrap", jkctx.events.onClickAddScrap);
            $searchList.on("click", ".devAddFavor", jkctx.events.onClickAddFavorCo);
            $searchList.on("click", ".listCell", jkctx.events.onClickSearchListItem);            
        },
        onImageError: function () {  
            var $this = $(this);
            
            $this.parent().addClass("no-image");
            $this.remove();
        },
        onDocumentMouseMoveTopMenu: function (e) {
            if(e.data.focus)
                $(this).addClass('active').children('.top-menu-select-modal').addClass('active');
            else
                $(this).removeClass('active').children('.top-menu-select-modal').removeClass('active');
        },
        onWindowScroll: function () {
            var $window     = $(window);
            var $document   = $(document);

            //Top 버튼
            if ($window.scrollTop() > 0) {
                $topButton.fadeIn();
	        } else {
                $topButton.fadeOut();
	        }

            //채용공고 직무분야 스크롤시 상단 고정
            if ( $window.scrollTop() >= 630 )
            {
			    $recruitJobFilterWrap.addClass("fixed");
		    }
		    else 
            {
			    $recruitJobFilterWrap.removeClass("fixed");
		    }

            // 더불러오기
            if( $window.scrollTop() + $window.height() > $document.height() - 1 ) 
            {
				if(0 < $pageNo.data("no") /*&& $pageNo.data("no") < $pageNo.data("maxno")*/)
                {
                    var pageNo      = $pageNo.data("no") + 1;
                    var totalcount  = $totalCount.data("totalcount");
                    var itemCount   = $searchList.children("ul").children("li").length;

                    if(itemCount < totalcount)
                    {
                        jkctx.methods.searchSubmit(pageNo);
                    }
                }
			}
        },
        onDocumentReady: function () {

            jkctx.methods.load();
            
        },
        onClickFooterBanner: function () {
            jkctx.methods.sendGA_Event('하단 배너', '원픽 서비스 바로가기');
        },
        onClickSearchListItem: function (e) {
            e.preventDefault();
            var $this = $(this);
            jkctx.methods.sendGA_Event('합격축하금 공고', "클릭");
            window.open($this.attr("href"), "_blank");
        },
        onClickBtnKeywordClear: function () {
            jkctx.methods.hideModalAll();

            $("#searchText").val("");
            $el.find(".btnKeywordClear").hide();

            jkctx.methods.searchSubmit(1);
        },
        onKeyDownSearchText: function () {
            $el.find(".btnKeywordClear").hide();
        },
        onClickAddFavorCo: function (e) {
            e.preventDefault();
            var $this = $(this);

            var params = {
                memSysNo:   $this.data("mem-sys"),
                favorState: $this.hasClass("heart_on") ? 0 : 1
            };

            if(jkctx.methods.checkLogin() == false)
                return false;

            jk.user.core.favorCo(params, jkctx.methods.favorCo);

            return false;
        },
        onClickAddScrap: function (e) {
            e.preventDefault();
            var $this = $(this);

            var params = {
                giNo: $this.data("gino"),
                gNo: $this.data("gno"),
                memTypeCode: $this.data("memtypecode"),
                scrapState: $this.hasClass("str_on") ? 0 : 1
            };

            if(jkctx.methods.checkLogin() == false)
                return false;

            jk.user.core.scrap(params, jkctx.methods.scrap);            

            return false;
        },
        onClickFilterDay: function () {
            var $this = $(this);

            $this.toggleClass("active");

            if($this.hasClass("active"))
            {
                jkctx.methods.sendGA_Event('상세검색_필터', $this.text());
            }
        },
        onClickFilterCoType: function () {
            var $this = $(this);

            $this.toggleClass("active");

            if($this.hasClass("active"))
            {
                jkctx.methods.sendGA_Event('상세검색_기업형태', $this.text());
            }
        },
        onClickFilterEduLevel: function () {
            var $this = $(this);

            $this.toggleClass("active");

            if($this.hasClass("active"))
            {
                jkctx.methods.sendGA_Event('상세검색_학력', $this.text());
            }
        },
        onClickFilterCareer: function () {
            var $this = $(this);

            $this.toggleClass("active");

            if($this.hasClass("active"))
            {
                jkctx.methods.sendGA_Event('상세검색_경력', $this.text());
            }
        },
        onClickFilterPartCtgr: function () {
            var $this       = $(this);
            var isAllCheck  = $this.hasClass("dev-check-all");
            
            $this.toggleClass("active");

            if(isAllCheck)
            {
                // 전체 체크 해제는 안함
                if($this.hasClass("active") == false) 
                {
                    $this.addClass("active");
                    return;
                }

                jkctx.methods.setFilterPartCtgrAll();
            }
            else
            {
                var activeLength = $filterPartCtgrItem.filter(".active").length;

                if( activeLength == 0 || $filterPartCtgrItem.length == activeLength )
                    jkctx.methods.setFilterPartCtgrAll();
                else
                    jkctx.methods.setFilterPartCtgrItem();
            }

            if($this.hasClass("active"))
            {
                jkctx.methods.sendGA_Event('상세검색_직무', $this.text());
            }
        },
        onClickFilterLocal: function () {
            var $this       = $(this);
            var isAllCheck  = $this.hasClass("dev-check-all");
            
            $this.toggleClass("active");

            if(isAllCheck)
            {
                // 전체 체크 해제는 안함
                if($this.hasClass("active") == false) 
                {
                    $this.addClass("active");
                    return;
                }

                jkctx.methods.setFilterLocalAll();
            }
            else
            {
                var activeLength = $filterLocalItem.filter(".active").length;

                if( activeLength == 0 || $filterLocalItem.length == activeLength )
                    jkctx.methods.setFilterLocalAll();
                else
                    jkctx.methods.setFilterLocalItem();
            }

            if($this.hasClass("active"))
            {
                jkctx.methods.sendGA_Event('상세검색_지역', $this.text());
            }
        },
        onClickTabPartCtgr: function () {
            var $this       = $(this);
            var isAllCheck  = $this.hasClass("dev-check-all");
            var checked     = $this.prop("checked");

            if(isAllCheck)
            {
                // 전체 체크 해제는 안함
                if(checked == false) 
                    return false;

                jkctx.methods.setTabPartCtgrAll();
            }
            else
            {
                var checkedLength = $partCtgrItem.filter(":checked").length;

                if( checkedLength == 0 || $partCtgrItem.length == checkedLength )
                    jkctx.methods.setTabPartCtgrAll();
                else
                    jkctx.methods.setTabPartCtgrItem();
            }

            jkctx.methods.uiUpdateBadgeCount();
            $form.submit();

            if($this.prop("checked"))
            {
                jkctx.methods.sendGA_Event('상단필터', $this.next().text());
            }
        },
        onClickSearch: function () {
            $form.submit();
        },
        onClickSearchSubmit: function () {

            jkctx.methods.hideModalAll();

            var $searchText = $form.find("#searchText");
            $searchText.val( $.trim($searchText.val()) );

            if ($("#searchText").val() == "") {
                $el.find(".btnKeywordClear").hide();
            } else {
                $el.find(".btnKeywordClear").show();
            }

            jkctx.methods.searchSubmit(1);
        },
        onClickSortBoxItem: function () {
            var $this = $(this);

            jkctx.methods.hideSortBox();

            if($searchOrder.val() == $this.data("code") )
                return;

            $searchOrder.val( $this.data("code") );
            $sortBox.find(".sort-button").text( $this.text() );

            $form.submit();

            jkctx.methods.sendGA_Event('합격축하금 공고', "정렬_" + $this.text());
        },
        onClickSortBoxShow: function () {

            if($sortBox.hasClass("active"))
            {
                jkctx.methods.hideSortBox();
                return;
            }

            jkctx.methods.hideModalAll();
            jkctx.methods.showSortBox();
        },
        onClickFilterModalShow: function () {

            if($filterModal.hasClass("active"))
            {
                jkctx.methods.hideFilterModal();
                return;
            }
        
            // 직무
            if( $codePartCtgr.val() == "" )
            {
                $filterPartCtgrItem.removeClass("active");
                $filterPartCtgrAll.addClass("active");
            }
            else
            {
                $filterPartCtgrAll.removeClass("active");
                jkctx.methods.setActiveFilterItem( $codePartCtgr.val(), $filterPartCtgrItem );
            }

            // 지역
            if( $codeLocal.val() == "" )
            {
                $filterLocalItem.removeClass("active");
                $filterLocalAll.addClass("active");
            }
            else
            {
                $filterLocalAll.removeClass("active");
                jkctx.methods.setActiveFilterItem( $codeLocal.val(), $filterLocalItem );
            }

            // 경력
            jkctx.methods.setActiveFilterItem( $codeCareer.val(), $filterCareerItem );
            // 학력
            jkctx.methods.setActiveFilterItem( $codeEduLevel.val(), $filterEduLevelItem );
            // 기업형태
            jkctx.methods.setActiveFilterItem( $codeCoType.val(), $filterCoTypeItem );
            // 날짜
            jkctx.methods.setActiveFilterItem( $codeDay.val(), $filterDayItem );

            jkctx.methods.hideModalAll();
            jkctx.methods.showFilterModal();
        },
        onClickFilterModalDim: function () {
            jkctx.methods.hideFilterModal();
        },
        onClickFilterModalClose: function () {
            jkctx.methods.hideFilterModal();
        },
        onClickFilterModalSearchApply: function () {

            // 직무
            jkctx.methods.setValueFilterItem( $codePartCtgr, $filterPartCtgrItem );
            // 지역
            jkctx.methods.setValueFilterItem( $codeLocal, $filterLocalItem );
            // 경력
            jkctx.methods.setValueFilterItem( $codeCareer, $filterCareerItem );
            // 학력
            jkctx.methods.setValueFilterItem( $codeEduLevel, $filterEduLevelItem );
            // 기업형태
            jkctx.methods.setValueFilterItem( $codeCoType, $filterCoTypeItem );
            // 날짜
            jkctx.methods.setValueFilterItem( $codeDay, $filterDayItem );

            // 탭 직무
            jkctx.methods.setCheckedTabPartCtgrItem( $codePartCtgr, $partCtgrItem );

            if($codePartCtgr.val() == "")
                jkctx.methods.setTabPartCtgrAll(); // 탭 전체 선택
            else
                jkctx.methods.setTabPartCtgrItem(); // 탭 직무 선택

            jkctx.methods.uiUpdateBadgeCount();

            $form.submit();
        },
        onClickFilterModalSearchReset: function () {
            jkctx.methods.setFilterPartCtgrAll();
            jkctx.methods.setFilterLocalAll();
            
            $filterCareerItem.removeClass("active");
            $filterEduLevelItem.removeClass("active");
            $filterCoTypeItem.removeClass("active");
            $filterDayItem.removeClass("active");
        },
        onClickTopButton: function () {
            $('html, body').animate({ scrollTop: 0 }, '300');
        }
    }

    jkctx.methods = {
        load: function () {
            var $sort = $sortBox.find("button[data-code]:first");

            $searchOrder.val($sort.data("code"));
            $sortBox.find(".sort-button").text( $sort.text() );

            $form.submit();
        },
        uiUpdateBadgeCount: function () {
            var count = 0;
            var $badge = $form.find("[badge]");

            $.each($badge, function(index, item){

                if(item.value !== "")
                    count++;
            });

            $badgeCount.text(count);

            if(count > 0)
                $badgeCount.show();
            else
                $badgeCount.hide();
        },
        hideModalAll: function () {
            jkctx.methods.hideFilterModal(); // 필터창 닫기
            jkctx.methods.hideSortBox(); // 정렬창 닫기
        },
        getTabPartCtgrCode: function () {
            var $checkItem = $partCtgrItem.filter(":checked");
            
            if($checkItem.length == 0)
                return "";

            var dataList = $.map($checkItem, function(item, index){
                return item.value;
            });

            return dataList.join(",");
        },
        setTabPartCtgrAll: function () {

            $partCtgrAll.prop("checked", true);
            $partCtgrItem.prop("checked", false);

            $selectPartName.text($partCtgrAll.next().text());
            $selectPartName.data("text", $partCtgrAll.next().text());

            $codePartCtgr.val("");
        },
        setTabPartCtgrItem: function () {
            
            $partCtgrAll.prop("checked", false); // 전체 체크 해제

            var $checkItem = $partCtgrItem.filter(":checked");

            var codeList = $.map($checkItem, function(item, index){
                return item.value;
            });
            var textList = $.map($checkItem, function(item, index){
                return $(item).next().text();
            });

            if($checkItem.length > 3) // 3개 이상 선택시 ... 줄 추가
            {
                $selectPartName.text( textList.slice(0, 3).join(", ") + " ,..." );
            }
            else
            {
                $selectPartName.text( textList.join(", ") );
            }

            $codePartCtgr.val( codeList.join(",") );
        },
        setFilterPartCtgrAll: function () {
            $filterPartCtgrAll.addClass("active");
            $filterPartCtgrItem.removeClass("active");
        },
        setFilterPartCtgrItem: function () {
            $filterPartCtgrAll.removeClass("active");
        },
        setFilterLocalAll: function () {
            $filterLocalAll.addClass("active");
            $filterLocalItem.removeClass("active");
        },
        setFilterLocalItem: function () {
            $filterLocalAll.removeClass("active");
        },
        showSortBox: function () {
            $sortBox.addClass("active");
        },
        hideSortBox: function () {
            $sortBox.removeClass("active");
        },
        showFilterModal: function () {            
            $filterModal.addClass("active");
            $('body').addClass('scroll-lock');
        },
        hideFilterModal: function () {
            $filterModal.removeClass("active");
            $('body').removeClass('scroll-lock');
        },
        setCheckedTabPartCtgrItem: function ($code, $items) {

            var codeList = $code.val().split(",");

            $items.prop("checked", false);

            codeList.forEach(function(code){
                $items.filter("[value='" + code + "']").prop("checked", true);
            });
        },
        setActiveFilterItem: function (code, $items) {
            var codeList = code.split(",");

            $items.removeClass("active");

            codeList.forEach(function(code){
                $items.filter("[data-code='" + code + "']").addClass("active");
            });
        },
        setValueFilterItem: function ($code, $items) {

            var codeList = $.map($items.filter(".active"), function(item, index){
                return $(item).data("code");
            });

            $code.val( codeList.join(",") );
        },
        searchSubmit: function (pageNo) {

            var isAbort     = pageNo == 1;
            var isFirstNo   = pageNo == 1;

            if($searchAjax)
            {
                if(isAbort == false)
                    return;

                $searchAjax.abort();
                $searchAjax = null;

                jkctx.methods.hideLoading();
            }

            if(isFirstNo)
            {
                $totalCount.text("-");
            }
            
            jkctx.methods.showLoading(isFirstNo);

            $pageNo.val(pageNo).data("no", pageNo);

            var param       = $form.find("[search]").serialize();
            var codeDayList = $codeDay.val().toLowerCase().split(',');

            codeDayList.forEach(function(code){
                if(code == "todayregist")
                    param += "&FilterTodayRegist=true";
                else if(code == "todayclose")
                    param += "&FilterTodayClose=true";
            });

            var $ajax = jkctx.service.jobList(param);

            $ajax.done(function(response, textStatus, jqXHR)
            {
                var $html       = $(response);
                var $logData    = $html.filter(".logData");
                var $data       = $html.filter("ul");
                
                if(isFirstNo)
                {
                    $searchLog.html($logData);
                    $searchList.html($data);
                    jkctx.methods.uiUpdateTotalCount();
                }
                else
                {
                    $data = $($data.html());

                    $searchList.children().append($data);
                    $searchLog.append($logData);

                    if($html.data("count") == 0) // 검색 데이터가 없으면 번호 수정
                    {
                        pageNo = pageNo - 1;
                        $pageNo.val(pageNo).data("no", pageNo);
                    }
                }

                $data.find("img").on("error", jkctx.events.onImageError);

                jkctx.methods.hideLoading();

                $searchAjax = null;
            })
            .fail(function(jqXHR, textStatus, errorThrown){

                if (textStatus == "abort") 
                    return;

                jkctx.methods.hideLoading();
            });

            $searchAjax = $ajax;
        },
        uiUpdateTotalCount: function () {
            var $item = $searchList.children("ul[data-totalcount]");

            $totalCount.text( $item.data("totalcounttext") );
            $totalCount.data("totalcount", $item.data("totalcount"));
        },
        showLoading: function (isFirstNo) {
            $loading.addClass("on");
        },
        hideLoading: function () {
            $loading.removeClass("on");
        },
        checkLogin: function () {

            var login = jk.biz.core.layerlogin.loginCheck();

            if (login.memCheck == "0" || (login.memCheck != "1")) 
            {
                if (confirm("개인회원 로그인 후 이용해 주세요.\n로그인 페이지로 이동 하시겠습니까?")) {
                    window.location.href = "/Login/Login_tot.asp?re_url=" + encodeURIComponent(window.location.href).replace(/'/g, "%27").replace(/"/g, "%22");
                    // /Login/logout.asp
                }

                return false;
            } 

            return true;
        },
        scrap: function (result, params) {
            if (result.code === 1) {
                var $item = $searchList.find(".devAddScrap[data-gino='" + params.giNo + "']");

                if(params.scrapState == 1)
                {
                    $item.addClass("str_on").removeClass("str_off");
                    jkctx.methods.sendGA_Event('합격축하금 공고', '스크랩_등록');
                }
                else
                {
                    $item.addClass("str_off").removeClass("str_on");
                    jkctx.methods.sendGA_Event('합격축하금 공고', '스크랩_해제');
                }
            } else {
                alert(result.msg);
            }
        },
        favorCo: function (result, params) {
            if (result.code === 1) {
                var $item = $searchList.find(".devAddFavor[data-mem-sys='" + params.memSysNo + "']");
                    
                if(params.favorState == 1)
                {
                    $item.addClass("heart_on").removeClass("heart_off");
                    jkctx.methods.sendGA_Event('합격축하금 공고', '관심기업_등록');
                }
                else
                {
                    $item.addClass("heart_off").removeClass("heart_on");
                    jkctx.methods.sendGA_Event('합격축하금 공고', '관심기업_해제');
                    
                }
            } else {
                alert(result.msg);
            }
        },
        sendGA_Event: function (action, label) {
            GA_Event('합격축하금 채용관_PC', action, label);
        },
    }

    jkctx.service = {
        jobList: function (data) {
            return $.ajax({
                method  : "get",
                url     : "/OnePick/JobList/List",
                data    : data,
                cache   : false
            });
        },
    }

    init();
});