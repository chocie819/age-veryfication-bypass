// content.js

(function() {
  'use strict';

  /**
   * Sanitizes text content for safe DOM comparison.
   */
  function sanitizeText(text) {
    const tempDiv = document.createElement('div');
    tempDiv.textContent = text;
    return tempDiv.innerHTML;
  }

  /**
   * Checks if an element matches known age gate patterns.
   */
  function isAgeGate(element) {
    // Check by class/id attributes
    for (const selector of AGE_GATE_CONFIG.commonSelectors) {
      if (element.matches(selector)) return true;
    }

    // Check by text content regex matching
    const textContent = element.textContent.trim();
    for (const pattern of AGE_GATE_CONFIG.commonTextPatterns) {
      if (pattern.test(textContent)) return true;
    }

    return false;
  }

  /**
   * Identifies the primary age gate overlay in the DOM.
   */
  function findAgeGateOverlay() {
    const overlays = document.querySelectorAll('div, section, article');
    
    for (const overlay of overlays) {
      if (isAgeGate(overlay)) {
        return overlay;
      }
    }
    return null;
  }

  /**
   * Executes the bypass logic: clicking confirmation or removing overlay.
   */
  function bypassAgeGate() {
    const overlay = findAgeGateOverlay();
    if (!overlay) return;

    // Special handling for Reddit's specific modal structure
    if (window.location.hostname.includes('reddit.com')) {
      const redditModal = document.querySelector('.modal-content');
      if (redditModal) {
        const confirmButton = redditModal.querySelector('button[type="submit"], button[data-testid="confirm-age"]');
        if (confirmButton && !confirmButton.disabled) {
          confirmButton.click();
          console.log('[AgeBypass] Reddit age gate confirmed.');
          return;
        }
      }
    }

    // Heuristic fallback: Attempt to trigger confirmation via keyword matching
    const buttons = overlay.querySelectorAll('button, a');
    for (const btn of buttons) {
      const text = sanitizeText(btn.textContent);
      if (/confirm|enter|yes|ok/i.test(text)) {
        btn.click();
        console.log(`[AgeBypass] Triggered confirmation: ${text}`);
        return;
      }
    }

    // Last resort: Remove overlay from DOM tree
    overlay.remove();
  }

  /**
   * Observes DOM mutations to detect dynamically loaded age gates.
   */
  function observeDOM() {
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.addedNodes.length) {
          bypassAgeGate();
        }
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  // Initialize on page load
  document.addEventListener('DOMContentLoaded', () => {
    bypassAgeGate();
    observeDOM();
  });

})();
