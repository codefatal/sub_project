
// Get the banner list and banner items
let bannerList = document.getElementById('banner_list');
let bannerItems = document.querySelectorAll('.bannereach');

// Define the number of items to show initially and the current count of visible items
let itemsToShow = 20;
let visibleItems = itemsToShow;

// Add a scroll event listener to the window
window.addEventListener('scroll', function() {
  // Check if all items are already visible
  if (visibleItems >= bannerItems.length) {
    return;
  }

  // Get the index of the last visible item
  let lastVisibleIndex = getLastVisibleIndex();

  // Check if the scroll is at the bottom of the page
  let isScrollAtBottom = (window.innerHeight + window.scrollY) >= document.body.offsetHeight;

  // If the last visible item is the last item in the list and the scroll is at the bottom, show more items
  if (lastVisibleIndex !== -1 && isScrollAtBottom) {
    showMoreItems();
  }
});

// Function to show more items
function showMoreItems() {
  // Calculate the index range of the next set of items to show
  let nextEndIndex = Math.min(visibleItems + itemsToShow, bannerItems.length);

  // Show the items in the calculated range
  showItemsInRange(visibleItems, nextEndIndex);

  // Update the count of visible items
  visibleItems = nextEndIndex;
}

// Function to show items in a given range
function showItemsInRange(start, end) {
  for (let i = start; i < end; i++) {
    bannerItems[i].style.display = 'grid';
  }
}

// Function to get the index of the last visible item
function getLastVisibleIndex() {
  // Get the current scroll position and window height
  let scrollPosition = window.pageYOffset;
  let windowHeight = window.innerHeight;
  let scrollBottom = scrollPosition + windowHeight;

  // Iterate through the items starting from the current visible items count
  for (let i = visibleItems; i < bannerItems.length; i++) {
    // Get the bounding rectangle of the item
    let rect = bannerItems[i].getBoundingClientRect();
    // If the top of the item is above the bottom of the visible window, return the index
    if (rect.top < scrollBottom) {
      return i;
    }
  }

  // If all items are below the bottom of the visible window, return -1
  return -1;
}

// Initially hide all items except the first 20
for (let i = itemsToShow; i < bannerItems.length; i++) {
  bannerItems[i].style.display = 'none';
}
