/* 《 공통 스크립트 》 */

$(document).ready(function(){
	$('.m_site_menu').length && siteMenu(); //모바일 사이트 메뉴
	// $('.btn_slide').length && tagNameSwiper(); //버튼 슬라이드
	$('.lnb').length && lnbMenu(); //Left Menu
	$('.info').length && logInfo(); //로그아웃 팝업
	$('.popup').length && alertPop(); //팝업
	$('.btn_detail').length && detailPop(); //상세 검색
	$('.item_list').length && moveBtn(); //조회항목 설정
	$('.menu_select').length && menuSelect(); //셀렉트박스
	$('.js-select').length && menuSelect_02(); //셀렉트박스
	$('.tooltip').length && tooltip(); //툴팁

	// 롤링 배너 복제본 생성
	let roller = document.querySelector('.txt_wrap');
	roller.id = 'roller1';
	let clone = roller.cloneNode(true)
	clone.id = 'roller2';
	document.querySelector('.marq_wrap').appendChild(clone);
	document.querySelector('#roller1').style.left = '0px';
	document.querySelector('#roller2').style.left = document.querySelector('.txt_wrap p').offsetWidth + 'px';

	roller.classList.add('original');
	clone.classList.add('clone');

	$(window).on('resize', function () {//nav 컨트롤
		var ww = $(window).width();
		if(ww < 1200){
			// $('.lnb').css('display', 'none');
			$('.lnb').removeClass('off')
		}else {
			$('.lnb').css('display', 'flex');
		}
	});
});

function siteMenu() { //모바일 사이트 메뉴
	$('.m_site_menu').on('click', function(){
		$('.lnb').css('display', 'flex');
		$('body').css('overflow', 'hidden')
	})
	$('.lnb_close').on('click', function(){
		$('.lnb').css('display', 'none');
		$('body').css('overflow', '')
	})
}

function tagNameSwiper() { //버튼 슬라이드
	var ww = $(window).width();
	var tagSlide = undefined;

	function tagSwiper() {
		if(ww < 1200 && tagSlide == undefined){
			tagSlide = new Swiper('.btn_slide', {
				slidesPerView : 'auto',
			});
		}else if (ww >= 1200 && tagSlide != undefined){
			tagSlide.destroy();
			tagSlide = undefined;
		}
	}

	tagSwiper();

	$(window).on('resize', function () {
		ww = $(window).width();
		tagSwiper();
	});
}

function lnbMenu() {
	var depth01_list = $('.depth_1 > li'),
		depth02 = $('.depth_2');

	$('.depth_1 > li > a').on('click', function(e){ //1 depth menu 클릭
			e.preventDefault();
			var findParent = $(this).parent()

		if(!findParent.hasClass('on')){
			depth01_list.removeClass('on');
			findParent.addClass('on')
			if($('.lnb').hasClass('off')){//lnb 닫혔을경우
				depth02.hide()
				findParent.find('.depth_2').show()
			}else{//lnb 열려있을경우
				depth02.slideUp(300)
				findParent.find('.depth_2').slideDown(300)
			}

		}else {
			depth01_list.removeClass('on');
			if($('.lnb').hasClass('off')){//lnb 닫혔을경우
				depth02.hide()
			}else{//lnb 열려있을경우
				depth02.slideUp(300)
			}
		}
	})

	$('.btn_control').on('click', function(e){ //lnb on/off
		$('.lnb').toggleClass('off');
		depth01_list.removeClass('on');
		depth02.slideUp(0)
	})

	$(document).mouseup(function (e){ /* 닫기 */
		var popArea = $('.lnb');
		if(!popArea.has(e.target).length){
			if($('.lnb').hasClass('off')){//lnb 닫혔을경우
				depth02.hide()
				depth01_list.removeClass('on');
			}
		}
	});
}

function logInfo() { //로그아웃 팝업
	$('.user').on('click', function(){
		$(this).toggleClass('on')
	})

	$(document).mouseup(function (e){ /* 닫기 */
		var popArea = $('.user');
		if(popArea.has(e.target).length === 0){
			popArea.removeClass('on')
		}
	});
}

function dimShow(){ /* 딤드 show */
	$('body').addClass('dim');
}
function dimHide(){ /* 딤드 hide */
	$('body').removeClass('dim');
}

function alertPop(){ //알럿팝업
	$('.btn_alert').on('click', function(e){ /* 팝업열기 */
		e.preventDefault();
		var target = $(this).attr('open-pop') || e;
		$('.popup' + '.' + target).fadeIn(200);
		dimShow();
	});

	$('.btn_close').on('click', function(e){ /* 팝업닫기 */
		e.preventDefault();
		var target= $(this).closest('.popup');
		target.fadeOut(200);
		setTimeout(dimHide, 150);
	});

	$(document).mouseup(function (e){ /* 닫기 */
		var popArea = $('.popup');
		if(popArea.has(e.target).length === 0 && $('body').hasClass('dim')){
			popArea.fadeOut(200);
			setTimeout(dimHide, 150);
		}
	});
}

function detailPop() { //상세검색 열기/닫기
	$('.btn_detail').on('click', function(){
		$(this).toggleClass('on')
		$('.dt_srch .js-accod').slideToggle()
	})
}

function moveBtn() { //조회항목 설정
	$('.list_wrap a').on('click', function(e){
		e.preventDefault();

		$('.list_wrap a').removeClass('active')
		$(this).addClass('active')
	})

	$('.move_btn .to_show').on('click', function(){
		var txt = $('.list_wrap a.active').text();

		$('.list_wrap a.active').parent().remove();
		$('<li><a href="#" class="active">'+ txt +'</a></li>').appendTo('#show .list_wrap ul')
	})

	$('.move_btn .to_all').on('click', function(){
		var txt = $('.list_wrap a.active').text();

		$('.list_wrap a.active').parent().remove();
		$('<li><a href="#" class="active">'+ txt +'</a></li>').appendTo('#all .list_wrap ul')
	})
}

function menuSelect() { //우측 상단 셀렉트 박스
	$('.menu_select button').on('click', function(){
		var selectBox = $(this).parent()
		if(selectBox.hasClass('on')){
			selectBox.removeClass('on')
		}else{
			$('.menu_select').removeClass('on')
			selectBox.addClass('on')
		}
	})
	$(document).mouseup(function (e){ /* 닫기 */
		var popArea = $('.menu_select');
		if(popArea.has(e.target).length === 0){
			popArea.removeClass('on')
		}
	});
}

function menuSelect_02() { //셀렉트 박스
	$('.js-select button').on('click', function(){
		var selectBox = $(this).parent()
		if(selectBox.hasClass('on')){
			selectBox.removeClass('on')
		}else{
			$('.js-select').removeClass('on')
			selectBox.addClass('on')
		}
	})
	$('.js-select a').on('click', function(e){
		e.preventDefault();
		var select_text = $(this).text();
		$(this).closest('.js-select').find('button').text(select_text)
	})
	$(document).mouseup(function (e){ /* 닫기 */
		var popArea = $('.js-select');
		if(popArea.has(e.target).length === 0){
			popArea.removeClass('on')
		}
	});
}

function tooltip() { //툴팁
	$('.tooltip button').on('click', function(){
		$('.tool').toggleClass('on')
	})
	$(document).mouseup(function (e){ /* 닫기 */
		if($('.tooltip').has(e.target).length === 0){
			$('.tool').removeClass('on')
		}
	});
}