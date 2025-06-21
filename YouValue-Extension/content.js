function waitForSidebar() {
  const secondaryColumn = document.querySelector('ytd-watch-next-secondary-results-renderer');

  if (secondaryColumn) {
    // Only inject if we haven't already
    if (!document.querySelector('#youvalue-container')) {
      const container = document.createElement('div');
      container.id = 'youvalue-container'; // <== this goes here
      container.textContent = '💸 Time Lost: $0.00';
      secondaryColumn.parentElement.insertBefore(container, secondaryColumn);
    }
  } else {
    setTimeout(waitForSidebar, 1000);
  }
}

window.addEventListener('load', waitForSidebar);