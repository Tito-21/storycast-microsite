// ================================================================
// StoryCast — main.js
// Vanilla JS only. No frameworks.
// ================================================================

(function () {
    'use strict';
  
    // ----------------------------------------------------------------
    // 1. MOBILE NAV TOGGLE
    // ----------------------------------------------------------------
    var toggle   = document.querySelector('.nav__mobile-toggle');
    var mobileMenu = document.getElementById('mobile-menu');
  
    if (toggle && mobileMenu) {
      toggle.addEventListener('click', function () {
        var isOpen = mobileMenu.classList.toggle('is-open');
        toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      });
  
      // Close on Escape
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && mobileMenu.classList.contains('is-open')) {
          mobileMenu.classList.remove('is-open');
          toggle.setAttribute('aria-expanded', 'false');
          toggle.focus();
        }
      });
  
      // Close when a nav link is clicked
      mobileMenu.querySelectorAll('.nav__link').forEach(function (link) {
        link.addEventListener('click', function () {
          mobileMenu.classList.remove('is-open');
          toggle.setAttribute('aria-expanded', 'false');
        });
      });
    }
  
    // ----------------------------------------------------------------
    // 2. SKIP LINK — smooth scroll + focus
    // ----------------------------------------------------------------
    var skipLink = document.querySelector('.skip-link');
    if (skipLink) {
      skipLink.addEventListener('click', function (e) {
        e.preventDefault();
        var target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.focus();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    }
  
    // ----------------------------------------------------------------
    // 3. NEWSLETTER FORM VALIDATION
    // ----------------------------------------------------------------
    var newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
      newsletterForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var emailInput = document.getElementById('email-address');
        var errorMsg   = document.getElementById('email-error');
        var emailVal   = emailInput ? emailInput.value : '';
        var emailRe    = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
        if (!emailRe.test(emailVal)) {
          if (errorMsg) errorMsg.classList.add('is-visible');
          if (emailInput) {
            emailInput.setAttribute('aria-invalid', 'true');
            emailInput.focus();
          }
          return;
        }
  
        if (errorMsg) errorMsg.classList.remove('is-visible');
        if (emailInput) emailInput.setAttribute('aria-invalid', 'false');
  
        // Success state
        var submitBtn = newsletterForm.querySelector('button[type="submit"]');
        var originalHtml = newsletterForm.innerHTML;
        newsletterForm.innerHTML =
          '<div role="status" aria-live="polite" style="background:#e8f5ee;color:#006e2d;padding:16px;border-radius:8px;font-size:14px;font-weight:600;">' +
          'Thank you — welcome to the community.' +
          '</div>';
  
        // Restore after 4 seconds
        setTimeout(function () {
          newsletterForm.innerHTML = originalHtml;
          // Re-attach event listener after DOM reset
          var newForm = document.getElementById('newsletter-form');
          if (newForm) newForm.addEventListener('submit', arguments.callee);
        }, 4000);
      });
    }
  
    // ----------------------------------------------------------------
    // 4. ACCESSIBILITY FEEDBACK FORM
    // ----------------------------------------------------------------
    var feedbackForm = document.getElementById('feedbackForm');
    if (feedbackForm) {
      feedbackForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var statusEl = document.getElementById('form-status');
        var submitBtn = feedbackForm.querySelector('button[type="submit"]');
  
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
  
        setTimeout(function () {
          if (statusEl) {
            statusEl.classList.add('is-success');
            statusEl.textContent =
              'Thank you. Your feedback has been received and will be reviewed by our accessibility team within 48 hours.';
          }
          feedbackForm.reset();
          submitBtn.disabled = false;
          submitBtn.textContent = 'Send Feedback';
  
          // Move focus to status for screen readers
          if (statusEl) statusEl.focus();
        }, 1200);
      });
    }
  
    // ----------------------------------------------------------------
    // 5. TRANSCRIPT KEYBOARD SCROLL
    // ----------------------------------------------------------------
    var transcriptScroll = document.querySelector('.transcript-panel__scroll');
    if (transcriptScroll) {
      transcriptScroll.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          this.scrollTop += 64;
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          this.scrollTop -= 64;
        }
      });
    }
  
    // ----------------------------------------------------------------
    // 6. CARD HOVER — show video player on story page
    // ----------------------------------------------------------------
    var playBtn = document.getElementById('play-btn');
    var videoEl = document.querySelector('.video-player video');
    var playerThumb = document.querySelector('.video-player__thumb');
    var playerOverlay = document.querySelector('.video-player__overlay');
  
    if (playBtn && videoEl) {
      playBtn.addEventListener('click', function () {
        playerThumb.style.display = 'none';
        playerOverlay.style.display = 'none';
        videoEl.style.display = 'block';
        videoEl.controls = true;
        videoEl.play();
      });
    }
  // ----------------------------------------------------------------
// 7. STORY VIDEO LINKS
// ----------------------------------------------------------------

var videos = {
  "Echoes of the Valley": "assets/media/echoes-of-the-valley.mp4",
  "The Weaver's Silence": "assets/media/the-weavers-silence.mp4",
  "Coastal Rhythms": "assets/media/coastal-rhythms.mp4",
  "Streets of Solidarity": "assets/media/streets-of-solidarity.mp4"
};


document.querySelectorAll(
  '.card, .featured-card, .horizontal-card'
).forEach(function(card){

  card.addEventListener('click', function(e){

    var title = card.querySelector(
      '.card__title, .featured-card__title, .horizontal-card__title'
    );


    if(!title) return;


    var video = videos[title.textContent.trim()];


    if(video){

      e.preventDefault();

      window.location.href = video;

    }

  });

});
    // ----------------------------------------------------------------
    // 7. REDUCED MOTION — honour user preference
    // ----------------------------------------------------------------
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.documentElement.style.setProperty('--transition-fast', '0ms');
      document.documentElement.style.setProperty('--transition-normal', '0ms');
    }
  
  })();