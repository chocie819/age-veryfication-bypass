// background.js

/**
 * Configuration for age verification detection patterns.
 */
const AGE_GATE_CONFIG = {
  // CSS selectors commonly used for age gate modals
  commonSelectors: [
    '.age-verification',
    '.age-gate',
    '.modal-age',
    '[class*="age"]',
    '[id*="age"]',
    '#age-verification',
    '#age-gate',
    '.verify-age'
  ],
  
  // Regex patterns to identify age gate text content
  commonTextPatterns: [
    /are you over/i,
    /confirm your age/i,
    /enter site/i,
    /are you 18\+?/i,
    /age verification/i
  ],

  // Sites requiring specific interaction logic
  specialSites: {
    'reddit.com': {
      selector: '.modal-content',
      action: 'click'
    }
  }
};

/**
 * Sanitizes HTML string to prevent XSS when injecting or parsing content.
 */
function sanitizeHTML(html) {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  
  // Remove script tags and event handlers
  const scripts = tempDiv.querySelectorAll('script, [onclick], [onload], [onerror]');
  scripts.forEach(script => script.remove());
  
  return tempDiv.innerHTML;
}

/**
 * Injects the content script into the active tab.
 */
async function injectAgeBypass() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
  if (!tab) return;

  try {
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['content.js']
    });
  } catch (error) {
    console.error('Failed to inject content script:', error);
  }
}

// Trigger bypass on extension icon click
chrome.action.onClicked.addListener(injectAgeBypass);
