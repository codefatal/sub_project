// Get the banner list and banner items
// 배너 리스트와 배너 아이템 가져오기
let bannerList = document.getElementById('banner_list');
let bannerItems = document.querySelectorAll('.bannereach');

// Define the number of items to show initially and the current count of visible items
// 초기에 보여줄 항목의 개수와 현재 보이는 항목의 개수 정의
let itemsToShow = 20;
let visibleItems = itemsToShow;

// Add a scroll event listener to the window
// 윈도우에 스크롤 이벤트 리스너 추가
window.addEventListener('scroll', updateList);

function updateList() {
  // Check if all items are already visible
  // 모든 항목이 이미 보이는 경우
  if (visibleItems >= bannerItems.length) {
    return;
  }

  // Get the index of the last visible item
  // 마지막으로 보이는 항목의 인덱스 가져오기
  let lastVisibleIndex = getLastVisibleIndex();

  // Check if the scroll is at the bottom of the page
  // 스크롤이 페이지 하단에 도달한 경우 추가 항목을 보여줍니다.
  let isScrollAtBottom = (window.innerHeight + window.scrollY) >= document.body.offsetHeight;

  // If the last visible item is the last item in the list and the scroll is at the bottom, show more items
  // 마지막 표시된 항목이 목록의 마지막 항목이고 스크롤이 하단에 있는 경우, 더 많은 항목을 표시
  if (lastVisibleIndex !== -1 && isScrollAtBottom) {
    showMoreItems();
  }
};

// Function to show more items
// 더 많은 항목을 표시하는 함수
function showMoreItems() {
  // Calculate the index range of the next set of items to show
  // 다음 표시할 항목의 인덱스 범위를 계산
  let nextEndIndex = Math.min(visibleItems + itemsToShow, bannerItems.length);

  // Show the items in the calculated range
  // 계산된 범위 내의 항목을 표시
  showItemsInRange(visibleItems, nextEndIndex);

  // Update the count of visible items
  // 표시된 항목 수를 업데이트
  visibleItems = nextEndIndex;
}

// Function to show items in a given range
// 주어진 범위 내의 항목을 표시하는 함수
function showItemsInRange(start, end) {
  for (let i = start; i < end; i++) {
    let bannerItem = bannerItems[i];
    let isActive = bannerItem.classList.contains('active');

    if (isActive) {
      bannerItem.style.display = 'grid';
    } else {
      bannerItem.style.display = 'none';
    }
  }
}

// Function to get the index of the last visible item
// 마지막으로 표시된 항목의 인덱스를 가져오는 함수
function getLastVisibleIndex() {
  // Get the current scroll position and window height
  // 현재 스크롤 위치와 윈도우의 높이를 확인
  let scrollPosition = window.pageYOffset;
  let windowHeight = window.innerHeight;
  let scrollBottom = scrollPosition + windowHeight;

  // Iterate through the items starting from the current visible items count
  // 현재 표시된 항목 수부터 시작하여 항목을 반복
  for (let i = visibleItems; i < bannerItems.length; i++) {
    // Get the bounding rectangle of the item
    // 항목의 경계 사각형 추출
    let rect = bannerItems[i].getBoundingClientRect();
    // If the top of the item is above the bottom of the visible window, return the index
    // 항목의 상단이 보이는 창의 하단보다 위에 있는 경우 인덱스를 반환
    if (rect.top < scrollBottom) {
      return i;
    }
  }

  // If all items are below the bottom of the visible window, return -1
  // 모든 항목이 보이는 창의 하단보다 아래에 있는 경우 -1을 반환
  return -1;
}

// Initially hide all items except the first 20
// 처음에 첫 번째 20개를 제외한 모든 항목을 숨김
for (let i = itemsToShow; i < bannerItems.length; i++) {
  bannerItems[i].style.display = 'none';
}