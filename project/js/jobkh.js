// Swiper 라이브러리 사용
document.addEventListener("DOMContentLoaded", function() {
  var swiper = new Swiper('.swiper-container', {
    direction: 'vertical', // 수직 슬라이드 설정
    slidesPerView: 'auto', // 슬라이드 간격 설정
    loop: true, // 무한 반복 설정
    autoplay: {
      delay: 3000, // 슬라이드 간의 딜레이 설정 (3초)
      disableOnInteraction: false, // 사용자와의 상호작용이 발생해도 자동 슬라이드 동작 유지
    },
  });
});