/* ============================================================
   Fusion Feast — Shared JavaScript
   ============================================================ */

/* ----------  Utility: Current Year in Footer  ---------- */
document.addEventListener('DOMContentLoaded', () => {
    const yearSpan = document.getElementById('year');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();
});

/* ============================================================
   Mobile Nav Hamburger Toggle
   ============================================================ */
const toggleBtn  = document.querySelector('.toggle');
const navLinksEl = document.querySelector('.nav-links');

if (toggleBtn && navLinksEl) {
    toggleBtn.addEventListener('click', () => {
        navLinksEl.classList.toggle('show');
        toggleBtn.setAttribute('aria-expanded', navLinksEl.classList.contains('show'));
    });

    /* Close nav when any link is clicked (mobile UX) */
    navLinksEl.addEventListener('click', e => {
        if (e.target.tagName === 'A') {
            navLinksEl.classList.remove('show');
            toggleBtn.setAttribute('aria-expanded', 'false');
        }
    });
}

/* ============================================================
   Lightbox for Gallery Images
   ============================================================ */
const galleryImgs = document.querySelectorAll('.gallery-grid img');

galleryImgs.forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => openLightbox(img.src, img.alt));
});

function openLightbox(src, alt = '') {
    const overlay = document.createElement('div');
    overlay.className = 'lightbox';
    overlay.innerHTML = `<img src="${src}" alt="${alt}">`;
    document.body.appendChild(overlay);

    const close = () => overlay.remove();
    overlay.addEventListener('click', close);
    window.addEventListener('keydown', escHandler);
    function escHandler(e) { if (e.key === 'Escape') close(); }
}

/* ============================================================
   Simple Form Validation (HTML5 Constraint API wrapper)
   ============================================================ */
const forms = document.querySelectorAll('form');

forms.forEach(form => {
    form.addEventListener('submit', e => {
        if (!form.checkValidity()) {
            e.preventDefault();
            /* Find first invalid field and focus it */
            const firstInvalid = form.querySelector(':invalid');
            if (firstInvalid) firstInvalid.focus({ preventScroll: true });

            /* Optional toast / alert (basic) */
            alert('Please complete the required fields highlighted in red.');
        }
    });

    /* Visual cue on invalid fields */
    form.addEventListener('input', e => {
        if (e.target.matches(':invalid')) {
            e.target.style.borderColor = 'var(--orange)';
        } else {
            e.target.style.borderColor = 'var(--gray)';
        }
    });
});

forms.forEach(form => {
    form.addEventListener('submit', e => {
        /* If the form is valid we show a message and keep the user on the page. */
        if (form.checkValidity()) {
            e.preventDefault();                                 // stop the redirect
            alert('Thanks! Your reservation has been sent. 😊'); // simple pop‑up
            form.reset();                                       // optional: clear fields
        }
    });
});