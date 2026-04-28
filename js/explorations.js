// Explorations Page Masonry Layout
document.addEventListener('DOMContentLoaded', function() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const masonryGrid = document.querySelector('.masonry-grid');
  const masonryItems = document.querySelectorAll('.masonry-item');

  let currentFilter = 'all';
  const gap = 20; // Gap between items

  // Masonry layout function
  function layoutMasonry(items, animate = true) {
    if (!masonryGrid) return;

    const containerWidth = masonryGrid.offsetWidth;
    const isMobile = window.innerWidth < 768;

    // Determine number of columns based on minimum column width
    const minColumnWidth = isMobile ? 250 : 300;
    let numColumns = Math.max(1, Math.floor((containerWidth + gap) / (minColumnWidth + gap)));

    // Calculate actual column width to fit container perfectly
    const totalGapWidth = (numColumns - 1) * gap;
    const columnWidth = (containerWidth - totalGapWidth) / numColumns;

    const columnHeights = new Array(numColumns).fill(0);

    items.forEach((item, index) => {
      // Find the shortest column
      let shortestColumn = 0;
      let minHeight = columnHeights[0];

      for (let i = 1; i < numColumns; i++) {
        if (columnHeights[i] < minHeight) {
          minHeight = columnHeights[i];
          shortestColumn = i;
        }
      }

      // Position the item
      const left = shortestColumn * (columnWidth + gap);
      const top = columnHeights[shortestColumn];

      if (animate) {
        item.style.transition = 'all 0.3s ease';
      } else {
        item.style.transition = 'none';
      }

      item.style.left = left + 'px';
      item.style.top = top + 'px';
      item.style.width = columnWidth + 'px';

      // Update column height
      const itemHeight = item.offsetHeight || item.scrollHeight || 200; // Fallback height
      columnHeights[shortestColumn] += itemHeight + gap;
    });

    // Set container height to tallest column
    const maxHeight = Math.max(...columnHeights);
    masonryGrid.style.height = maxHeight + 'px';
  }

  // Filter function
  function filterItems(category) {
    currentFilter = category;
    let visibleItems = [];

    masonryItems.forEach(item => {
      const itemCategory = item.getAttribute('data-category');

      if (category === 'all' || itemCategory === category) {
        item.classList.remove('hidden');
        visibleItems.push(item);
      } else {
        item.classList.add('hidden');
      }
    });

    // Layout only visible items after a short delay to allow transitions
    setTimeout(() => {
      layoutMasonry(visibleItems, true);
    }, 50);
  }

  // Add click event listeners to filter buttons
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));

      // Add active class to clicked button
      this.classList.add('active');

      // Get filter category
      const filterCategory = this.getAttribute('data-filter');

      // Filter items
      filterItems(filterCategory);
    });
  });

  // Handle window resize
  let resizeTimeout;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      const visibleItems = Array.from(masonryItems).filter(item => !item.classList.contains('hidden'));
      layoutMasonry(visibleItems, false);
    }, 250);
  });

  // Handle image load events to recalculate layout
  masonryItems.forEach(item => {
    const img = item.querySelector('img');
    if (img) {
      img.addEventListener('load', () => {
        const visibleItems = Array.from(masonryItems).filter(item => !item.classList.contains('hidden'));
        layoutMasonry(visibleItems, false);
      });
    }
  });

  // Initialize with 'all' filter active
  filterItems('all');
});