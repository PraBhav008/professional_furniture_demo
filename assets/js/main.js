/**
 * VERDANT ATELIER — ARCHITECTURAL FURNITURE & DESIGN
 * Master JavaScript Controller
 * High-performance, zero-dependency, standalone script.
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileNav();
  initLookbook();
  initFaqAccordions();
  initCollectionFilters();
  initQuickViewModal();
  initContactForm();
  initNewsletter();
  initCookieBanner();
  initSmoothScroll();
});

/* --------------------------------------------------------------------------
   1. STICKY HEADER SCROLL LISTENER
   -------------------------------------------------------------------------- */
function initHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* --------------------------------------------------------------------------
   2. MOBILE NAVIGATION DRAWER
   -------------------------------------------------------------------------- */
function initMobileNav() {
  const toggleBtn = document.querySelector('.mobile-nav-toggle');
  const drawer = document.querySelector('.mobile-drawer');
  const backdrop = document.querySelector('.mobile-drawer-backdrop');
  if (!toggleBtn || !drawer) return;

  const openDrawer = () => {
    toggleBtn.classList.add('open');
    drawer.classList.add('open');
    if (backdrop) backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
    toggleBtn.setAttribute('aria-expanded', 'true');
  };

  const closeDrawer = () => {
    toggleBtn.classList.remove('open');
    drawer.classList.remove('open');
    if (backdrop) backdrop.classList.remove('open');
    document.body.style.overflow = '';
    toggleBtn.setAttribute('aria-expanded', 'false');
  };

  toggleBtn.addEventListener('click', () => {
    const isOpen = drawer.classList.contains('open');
    if (isOpen) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  if (backdrop) {
    backdrop.addEventListener('click', closeDrawer);
  }

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeDrawer();
    }
  });

  // Close when clicking internal links
  const links = drawer.querySelectorAll('a');
  links.forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });
}

/* --------------------------------------------------------------------------
   3. LOOKBOOK / SAVED PIECES SYSTEM
   -------------------------------------------------------------------------- */
let savedItems = [];

function initLookbook() {
  try {
    const stored = localStorage.getItem('verdant_lookbook');
    if (stored) {
      savedItems = JSON.parse(stored);
    }
  } catch (e) {
    savedItems = [];
  }

  updateLookbookBadges();

  // Attach click listeners to all save buttons
  document.querySelectorAll('.card-save-btn').forEach(btn => {
    const itemId = btn.getAttribute('data-id');
    if (savedItems.includes(itemId)) {
      btn.classList.add('saved');
      btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`;
    }

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleSaveItem(itemId, btn);
    });
  });

  // Lookbook trigger click
  const lookbookTrigger = document.querySelector('.lookbook-trigger');
  if (lookbookTrigger) {
    lookbookTrigger.addEventListener('click', (e) => {
      e.preventDefault();
      if (savedItems.length === 0) {
        showToast('Your Lookbook is currently empty. Explore our collection to curate pieces.');
      } else {
        showToast(`Your Lookbook contains ${savedItems.length} curated piece${savedItems.length > 1 ? 's' : ''}.`);
      }
    });
  }
}

function toggleSaveItem(itemId, btnElement) {
  const index = savedItems.indexOf(itemId);
  if (index > -1) {
    savedItems.splice(index, 1);
    if (btnElement) {
      btnElement.classList.remove('saved');
      btnElement.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>`;
    }
    showToast('Piece removed from your Lookbook');
  } else {
    savedItems.push(itemId);
    if (btnElement) {
      btnElement.classList.add('saved');
      btnElement.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`;
    }
    showToast('Piece saved to your Curated Lookbook');
  }

  try {
    localStorage.setItem('verdant_lookbook', JSON.stringify(savedItems));
  } catch (e) {}

  updateLookbookBadges();
}

function updateLookbookBadges() {
  const badges = document.querySelectorAll('.lookbook-badge');
  badges.forEach(b => {
    b.textContent = savedItems.length;
  });
}

/* --------------------------------------------------------------------------
   4. FAQ ACCORDION COMPONENT & SEARCH
   -------------------------------------------------------------------------- */
function initFaqAccordions() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (faqItems.length === 0) return;

  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question-btn');
    const answer = item.querySelector('.faq-answer');

    btn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all other open items in the same container for clean elegance
      faqItems.forEach(other => {
        if (other !== item && other.classList.contains('active')) {
          other.classList.remove('active');
          const otherAns = other.querySelector('.faq-answer');
          if (otherAns) otherAns.style.maxHeight = null;
        }
      });

      if (isActive) {
        item.classList.remove('active');
        answer.style.maxHeight = null;
      } else {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 32 + 'px';
      }
    });
  });

  // Open first item by default if on faqs.html
  const firstFaq = faqItems[0];
  if (firstFaq && window.location.pathname.includes('faqs')) {
    firstFaq.classList.add('active');
    const firstAns = firstFaq.querySelector('.faq-answer');
    if (firstAns) {
      setTimeout(() => {
        firstAns.style.maxHeight = firstAns.scrollHeight + 32 + 'px';
      }, 100);
    }
  }

  // FAQ Live Search
  const faqSearch = document.getElementById('faq-search-input');
  if (faqSearch) {
    faqSearch.addEventListener('input', (e) => {
      const term = e.target.value.toLowerCase().trim();
      faqItems.forEach(item => {
        const text = item.textContent.toLowerCase();
        if (text.includes(term)) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
    });
  }

  // FAQ Category Filter Pills
  const faqPills = document.querySelectorAll('.faq-filter-pill');
  faqPills.forEach(pill => {
    pill.addEventListener('click', () => {
      faqPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const cat = pill.getAttribute('data-category');

      faqItems.forEach(item => {
        const itemCat = item.getAttribute('data-category');
        if (cat === 'all' || itemCat === cat) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   5. COLLECTIONS FILTERING & LIVE SORTING
   -------------------------------------------------------------------------- */
function initCollectionFilters() {
  const container = document.getElementById('collections-grid');
  if (!container) return;

  const cards = Array.from(container.querySelectorAll('.collection-card'));
  const pills = document.querySelectorAll('.collection-filter-pill');
  const searchInput = document.getElementById('collection-search');
  const sortSelect = document.getElementById('collection-sort');
  const countDisplay = document.getElementById('collection-count');

  let currentCategory = 'all';
  let searchTerm = '';
  let currentSort = 'curated';

  function applyFilters() {
    let visibleCards = cards.filter(card => {
      const cardCat = card.getAttribute('data-category') || '';
      const cardTitle = (card.querySelector('.collection-title')?.textContent || '').toLowerCase();
      const cardDesc = (card.querySelector('.collection-desc')?.textContent || '').toLowerCase();
      const cardTags = (card.getAttribute('data-materials') || '').toLowerCase();

      const matchesCat = currentCategory === 'all' || cardCat === currentCategory;
      const matchesSearch = !searchTerm || cardTitle.includes(searchTerm) || cardDesc.includes(searchTerm) || cardTags.includes(searchTerm);

      return matchesCat && matchesSearch;
    });

    // Sort visible cards
    if (currentSort === 'price-asc') {
      visibleCards.sort((a, b) => parseFloat(a.dataset.price || 0) - parseFloat(b.dataset.price || 0));
    } else if (currentSort === 'price-desc') {
      visibleCards.sort((a, b) => parseFloat(b.dataset.price || 0) - parseFloat(a.dataset.price || 0));
    } else if (currentSort === 'name-asc') {
      visibleCards.sort((a, b) => {
        const titleA = a.querySelector('.collection-title')?.textContent || '';
        const titleB = b.querySelector('.collection-title')?.textContent || '';
        return titleA.localeCompare(titleB);
      });
    }

    // Render cards
    cards.forEach(card => card.style.display = 'none');
    visibleCards.forEach(card => {
      card.style.display = '';
      container.appendChild(card);
    });

    if (countDisplay) {
      countDisplay.textContent = `Showing ${visibleCards.length} of ${cards.length} archival pieces`;
    }
  }

  // Pill click handlers
  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentCategory = pill.getAttribute('data-category');
      applyFilters();
    });
  });

  // Search input handler
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchTerm = e.target.value.toLowerCase().trim();
      applyFilters();
    });
  }

  // Sort dropdown handler
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      currentSort = e.target.value;
      applyFilters();
    });
  }
}

/* --------------------------------------------------------------------------
   6. QUICK VIEW MODAL
   -------------------------------------------------------------------------- */
function initQuickViewModal() {
  const modal = document.getElementById('quick-view-modal');
  if (!modal) return;

  const closeBtn = modal.querySelector('.modal-close-btn');
  const modalImg = document.getElementById('modal-img');
  const modalCategory = document.getElementById('modal-category');
  const modalTitle = document.getElementById('modal-title');
  const modalPrice = document.getElementById('modal-price');
  const modalDesc = document.getElementById('modal-desc');
  const modalDimensions = document.getElementById('modal-dimensions');
  const modalWood = document.getElementById('modal-wood');
  const modalLead = document.getElementById('modal-lead');
  const modalInquireBtn = document.getElementById('modal-inquire-btn');

  const openModal = (data) => {
    if (modalImg) modalImg.src = data.img;
    if (modalCategory) modalCategory.textContent = data.category;
    if (modalTitle) modalTitle.textContent = data.title;
    if (modalPrice) modalPrice.textContent = data.price;
    if (modalDesc) modalDesc.textContent = data.desc;
    if (modalDimensions) modalDimensions.textContent = data.dimensions || 'Custom upon commission';
    if (modalWood) modalWood.textContent = data.wood || 'French Oak / Smoked Walnut';
    if (modalLead) modalLead.textContent = data.lead || '6–8 weeks';

    if (modalInquireBtn) {
      modalInquireBtn.href = `contact.html?piece=${encodeURIComponent(data.title)}`;
    }

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });

  // Attach quick view triggers
  document.querySelectorAll('.btn-quick-view').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const card = btn.closest('.collection-card');
      if (!card) return;

      const data = {
        img: card.querySelector('img')?.getAttribute('src') || '',
        category: card.querySelector('.collection-category')?.textContent || '',
        title: card.querySelector('.collection-title')?.textContent || '',
        price: card.querySelector('.collection-price')?.textContent || '',
        desc: card.querySelector('.collection-desc')?.textContent || '',
        dimensions: card.getAttribute('data-dimensions') || 'W: 240cm × D: 105cm × H: 76cm',
        wood: card.getAttribute('data-wood') || 'Solid European Oak & Brushed Brass',
        lead: card.getAttribute('data-lead') || 'Made to order (6–8 weeks)'
      };

      openModal(data);
    });
  });
}

/* --------------------------------------------------------------------------
   7. CONTACT & COMMISSION FORM VALIDATION
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('atelier-contact-form');
  if (!form) return;

  // Auto-populate piece from URL query params
  const urlParams = new URLSearchParams(window.location.search);
  const requestedPiece = urlParams.get('piece');
  const messageField = document.getElementById('contact-message');
  const projectTypeField = document.getElementById('contact-project-type');

  if (requestedPiece && messageField) {
    messageField.value = `I am inquiring regarding the bespoke acquisition/custom sizing of "${requestedPiece}". Please provide material swatches and delivery specifications.`;
    if (projectTypeField) {
      projectTypeField.value = 'bespoke';
    }
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    // Fields to validate
    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const phoneInput = document.getElementById('contact-phone');
    const msgInput = document.getElementById('contact-message');

    // Reset error states
    form.querySelectorAll('.form-group').forEach(fg => fg.classList.remove('has-error'));

    // Validate Name
    if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
      setError(nameInput, 'Please state your full name.');
      isValid = false;
    }

    // Validate Email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailInput.value.trim())) {
      setError(emailInput, 'Please provide a valid electronic mail address.');
      isValid = false;
    }

    // Validate Phone (optional but if provided must be >= 7 chars)
    if (phoneInput.value.trim() && phoneInput.value.trim().length < 7) {
      setError(phoneInput, 'Please provide a valid telephone number.');
      isValid = false;
    }

    // Validate Message
    if (!msgInput.value.trim() || msgInput.value.trim().length < 10) {
      setError(msgInput, 'Please provide details regarding your inquiry (min 10 characters).');
      isValid = false;
    }

    if (!isValid) return;

    // Simulation of transmission
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="spin-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
        <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor"></path>
      </svg>
      Transmitting Dossier...
    `;

    setTimeout(() => {
      form.style.display = 'none';
      const feedbackCard = document.getElementById('form-feedback-success');
      if (feedbackCard) {
        feedbackCard.classList.add('show');
        const refNum = 'VA-' + Math.floor(100000 + Math.random() * 900000);
        const refElem = document.getElementById('dossier-ref');
        if (refElem) refElem.textContent = refNum;
      }
      showToast('Dossier received. Our concierge will contact you within 24 hours.');
    }, 1200);
  });

  function setError(inputElement, message) {
    const parent = inputElement.closest('.form-group');
    if (!parent) return;
    parent.classList.add('has-error');
    const errSpan = parent.querySelector('.form-error-msg');
    if (errSpan) errSpan.textContent = message;
  }
}

/* --------------------------------------------------------------------------
   8. NEWSLETTER SUBSCRIPTION
   -------------------------------------------------------------------------- */
function initNewsletter() {
  const forms = document.querySelectorAll('.newsletter-form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      if (!input) return;

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(input.value.trim())) {
        showToast('Please enter a valid email address.');
        return;
      }

      input.value = '';
      showToast('Thank you for subscribing to the Verdant Gazette.');
    });
  });
}

/* --------------------------------------------------------------------------
   9. COOKIE CONSENT BANNER
   -------------------------------------------------------------------------- */
function initCookieBanner() {
  const banner = document.getElementById('cookie-consent-banner');
  if (!banner) return;

  let cookieChoice = null;
  try {
    cookieChoice = localStorage.getItem('verdant_cookies_choice');
  } catch (e) {
    cookieChoice = null;
  }

  if (!cookieChoice) {
    setTimeout(() => {
      banner.classList.add('show');
    }, 1000);
  }

  const acceptBtn = document.getElementById('cookie-accept');
  const declineBtn = document.getElementById('cookie-decline');

  if (acceptBtn) {
    acceptBtn.addEventListener('click', () => {
      try {
        localStorage.setItem('verdant_cookies_choice', 'accepted');
      } catch (e) {}
      banner.classList.remove('show');
      showToast('Preferences preserved. Enjoy your architectural experience.');
    });
  }

  if (declineBtn) {
    declineBtn.addEventListener('click', () => {
      try {
        localStorage.setItem('verdant_cookies_choice', 'declined');
      } catch (e) {}
      banner.classList.remove('show');
      showToast('Non-essential cookies declined.');
    });
  }
}

/* --------------------------------------------------------------------------
   10. TOAST NOTIFICATION UTILITY
   -------------------------------------------------------------------------- */
function showToast(message) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  // Trigger show transition
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      toast.remove();
    }, 400);
  }, 3800);
}

/* --------------------------------------------------------------------------
   11. SMOOTH SCROLL HELPER
   -------------------------------------------------------------------------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || !targetId) return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}
