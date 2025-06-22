function waitForSidebar() {
  const secondaryColumn = document.querySelector('ytd-watch-next-secondary-results-renderer');

  if (secondaryColumn) {
    // Only inject if we haven't already
    if (!document.querySelector('#youvalue-container')) {
      const container = document.createElement('div');
      container.id = 'youvalue-container'; // <== this goes here
      container.innerHTML = `
        <div class="youvalue-money">$0.00</div>
        <div class="youvalue-sub">Active Time: 0m 0s</div>
      `;
      secondaryColumn.parentElement.insertBefore(container, secondaryColumn);
    }
  } else {
    setTimeout(waitForSidebar, 1000);
  }
}

window.addEventListener('load', waitForSidebar);

let activeSeconds = 0;
let lastRecordedTime = Date.now();

function trackActiveTime() {
  const video = document.querySelector('video');
  if (!video) return;

  video.addEventListener('timeupdate', () => {
  if (!video.paused && !video.ended) {
    const now = Date.now();
    const delta = now - lastRecordedTime;

    if (delta >= 1000) {
      activeSeconds += Math.floor(delta / 1000); // handle any missed time
      lastRecordedTime = now;
      updateDisplay(activeSeconds);
    }
  }
  });
}

function updateDisplay(seconds) {
  const container = document.querySelector('#youvalue-container');
  if (!container) return;

  // Convert seconds to m:s
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  const formattedTime = `${m}m ${s}s`;

  // Calculate money lost assuming $7.25/hour (minimum wage example)
  const hourlyRate = 7.25;
  const moneyLost = (hourlyRate / 3600) * seconds;
  const moneyLostFormatted = `$${moneyLost.toFixed(2)}`;

  container.querySelector('.youvalue-money').textContent = moneyLostFormatted;
  container.querySelector('.youvalue-sub').textContent = `Active Time: ${formattedTime}`;
}

// Call this after page load and container injection
window.addEventListener('load', () => {
  trackActiveTime();
});