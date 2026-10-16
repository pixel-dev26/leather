/* ==========================================================================
   MORUCHA — Homepage Version 2 interactions & animation
   ========================================================================== */
(() => {
  'use strict';

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

  // Product photos are local copies in /images/products/<handle>/ (see data/products.json). Cards and the bag load
  // the smaller WebP copies scripts/resize-product-images.mjs makes in <handle>/w320/, w640/ and w960/.
  // BASE is the folder the site is served from: this script lives at <BASE>/v5/main.js ("" in dev, e.g. /l/next
  // in the static export), so root paths like /images/… get it as a prefix.
  const BASE = new URL('..', document.currentScript?.src || location.href).pathname.replace(/\/$/, '');
  const money = (n) => `£${n.toFixed(2)}`;
  const sized = (src, w) => `${BASE}${src.replace(/\/([^/]+)\.(?:webp|jpe?g|png)$/i, `/w${w}/$1.webp`)}`;
  const srcset = (src) => [320, 640, 960].map((w) => `${sized(src, w)} ${w}w`).join(', ');
  const photoAttrs = (src, sizes) => `src="${sized(src, 960)}" srcset="${srcset(src)}" sizes="${sizes}"`;
  const setPhoto = (img, src) => { img.srcset = srcset(src); img.src = sized(src, 960); };

  /* ------------------------------------------------------------------
     Split text into masked words / characters
     ------------------------------------------------------------------ */
  function split(el) {
    const mode = el.dataset.split;
    const text = el.innerHTML.replace(/<br\s*\/?>/gi, ' ').replace(/<[^>]*>/g, '').trim();
    const sr = `<span class="sr-only">${text}</span>`;
    let i = 0;
    let html;
    if (mode === 'chars') {
      // Letters are grouped per word so lines can only break between words
      html = text.split(/\s+/).map((word) => `<span class="cw">${[...word]
        .map((ch) => `<span class="c"><span class="c__i" style="--i:${i++}">${ch}</span></span>`).join('')}</span>`).join(' ');
    } else {
      // A <br> in the markup marks a forced line break
      html = el.innerHTML.split(/<br\s*\/?>/i)
        .map((line) => line.replace(/<[^>]*>/g, '').trim().split(/\s+/)
          .map((word) => `<span class="w"><span class="w__i" style="--i:${i++}">${word}</span></span>`).join(' '))
        .join('<br>');
    }
    el.innerHTML = `${sr}<span aria-hidden="true">${html}</span>`;
  }
  $$('[data-split]').forEach(split);

  // Stagger index for grouped fade-ups and mobile menu links
  $$('[data-stagger]').forEach((group) => {
    [...group.children].filter((c) => !c.classList.contains('journey__line'))
      .forEach((child, i) => child.style.setProperty('--i', i));
  });
  $$('.m-nav > a').forEach((a, i) => a.style.setProperty('--i', i));

  /* ------------------------------------------------------------------
     Reveal on scroll
     ------------------------------------------------------------------ */
  const revealTargets = [
    ...$$('[data-split]').filter((el) => !el.closest('.slide, .intro')),
    ...$$('[data-stagger], [data-reveal-img]'),
  ];
  if ('IntersectionObserver' in window && !reduced) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.12 });
    revealTargets.forEach((el) => io.observe(el));
  } else {
    revealTargets.forEach((el) => el.classList.add('is-in'));
  }

  /* ------------------------------------------------------------------
     Intro curtain (once per visit)
     ------------------------------------------------------------------ */
  const intro = $('[data-intro]');
  let introSeen = false;
  try { introSeen = sessionStorage.getItem('morucha-intro') === '1'; } catch (e) { /* storage blocked */ }

  function startPage() {
    document.body.classList.add('is-ready');
    hero?.start();
  }

  if (!intro || introSeen || reduced) {
    intro?.classList.add('is-gone');
    setTimeout(startPage, 30);
  } else {
    document.body.classList.add('is-locked');
    setTimeout(() => intro.classList.add('is-in'), 30);
    setTimeout(() => {
      intro.classList.add('is-done');
      document.body.classList.remove('is-locked');
      startPage();
    }, 1500);
    setTimeout(() => intro.classList.add('is-gone'), 2600);
    try { sessionStorage.setItem('morucha-intro', '1'); } catch (e) { /* storage blocked */ }
  }

  /* ------------------------------------------------------------------
     Announcement rotation (slides up)
     ------------------------------------------------------------------ */
  const msgs = $$('.announce__msg');
  if (msgs.length > 1 && !reduced) {
    let a = 0;
    setInterval(() => {
      const prev = msgs[a];
      prev.classList.remove('is-active');
      prev.classList.add('is-leaving');
      setTimeout(() => prev.classList.remove('is-leaving'), 800);
      a = (a + 1) % msgs.length;
      msgs[a].classList.add('is-active');
    }, 4200);
  }

  /* ------------------------------------------------------------------
     Hero slideshow
     ------------------------------------------------------------------ */
  const hero = (() => {
    const root = $('[data-hero]');
    if (!root) return null;
    const slides = $$('.slide', root);
    const bars = $$('.hero__bar', root);
    const num = $('[data-hero-num]', root);
    let index = 0;
    let started = false;

    function activate(i, dir = 1) {
      if (i === index && started) return;
      const prev = slides[index];
      const next = slides[i];
      slides.forEach((s) => s.classList.remove('is-prev'));
      if (prev !== next) {
        prev.classList.remove('is-active', 'is-rev');
        prev.classList.add('is-prev');
        $('[data-split]', prev)?.classList.remove('is-in');
        setTimeout(() => prev.classList.remove('is-prev'), 1300);
      }
      next.classList.remove('is-active', 'is-rev');
      void next.offsetWidth; // restart the wipe animation
      next.classList.add('is-active');
      if (dir < 0) next.classList.add('is-rev');
      requestAnimationFrame(() => $('[data-split]', next)?.classList.add('is-in'));

      bars.forEach((b, n) => {
        b.classList.toggle('is-done', n < i);
        b.classList.remove('is-active');
        b.setAttribute('aria-selected', n === i);
      });
      void bars[i].offsetWidth;
      if (!reduced) bars[i].classList.add('is-active');
      else bars[i].classList.add('is-done');

      slides.forEach((s, n) => s.setAttribute('aria-hidden', n !== i));
      num.textContent = String(i + 1).padStart(2, '0');
      num.classList.remove('is-swap');
      void num.offsetWidth;
      num.classList.add('is-swap');
      index = i;
    }

    const go = (step) => activate((index + step + slides.length) % slides.length, step);

    $('[data-hero-next]', root).addEventListener('click', () => go(1));
    $('[data-hero-prev]', root).addEventListener('click', () => go(-1));
    bars.forEach((b, n) => b.addEventListener('click', () => activate(n, n > index ? 1 : -1)));

    // Advance when the active progress bar finishes filling
    root.addEventListener('animationend', (e) => {
      if (e.animationName === 'bar-fill') go(1);
    });

    // Pause on hover / focus / hidden tab
    const pause = (on) => root.classList.toggle('is-paused', on);
    root.addEventListener('mouseenter', () => pause(true));
    root.addEventListener('mouseleave', () => pause(false));
    root.addEventListener('focusin', () => pause(true));
    root.addEventListener('focusout', () => pause(false));
    document.addEventListener('visibilitychange', () => pause(document.hidden));

    // Swipe
    let startX = null;
    root.addEventListener('pointerdown', (e) => { startX = e.clientX; });
    root.addEventListener('pointerup', (e) => {
      if (startX === null) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
      startX = null;
    });

    root.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    });

    return {
      start() {
        if (started) return;
        activate(0);
        started = true;
      },
    };
  })();

  const header = $('[data-header]');
  let lastY = window.scrollY;

  /* ------------------------------------------------------------------
     Product catalogue (from the live Morucha store)
     ------------------------------------------------------------------ */
  const C = {
    black: '#1d1d1d', tan: '#a8703f', brown: '#4a2c1c', hunter: '#6b4127', green: '#55603a',
    grey: '#8a8a8a', burgundy: '#5e1a22', fuchsia: '#b1123a', red: '#c3271f', navy: '#24324a', blue: '#2a56b8',
  };

  const CATALOGUE = {
    m2028: {
      name: 'MORUCHA Men’s RFID Blocking Leather Wallet – Genuine Soft Leather Bifold with Coin Pocket & ID Windows M-2028', price: 29.99, badge: 'Bestseller',
      variants: [
        { name: 'Black / Green', c1: C.black, c2: C.green, img: '/images/products/morucha-men-s-rfid-blocking-leather-wallet-genuine-soft-leather-bifold-with-coin-pocket-id-windows-m-2028/01.webp' },
        { name: 'Black / Tan', c1: C.black, c2: C.tan, img: '/images/products/morucha-men-s-rfid-blocking-leather-wallet-genuine-soft-leather-bifold-with-coin-pocket-id-windows-m-2028/02.webp' },
        { name: 'Tan / Black', c1: C.tan, c2: C.black, img: '/images/products/morucha-men-s-rfid-blocking-leather-wallet-genuine-soft-leather-bifold-with-coin-pocket-id-windows-m-2028/03.webp' },
        { name: 'Black / Grey', c1: C.black, c2: C.grey, img: '/images/products/morucha-men-s-rfid-blocking-leather-wallet-genuine-soft-leather-bifold-with-coin-pocket-id-windows-m-2028/04.webp' },
      ],
    },
    m2025: {
      name: 'MORUCHA Men’s RFID Blocking Leather Wallet – Vertical Genuine Soft Leather Wallet with Coin Pocket & Zipped Compartment M2025', price: 29.99, badge: 'New',
      variants: [
        { name: 'Tan / Black', c1: C.tan, c2: C.black, img: '/images/products/morucha-men-s-rfid-blocking-leather-wallet-genuine-soft-leather-bifold-with-coin-pocket-id-windows-m-2028-copy/01.webp', alt: '/images/products/morucha-men-s-rfid-blocking-leather-wallet-genuine-soft-leather-bifold-with-coin-pocket-id-windows-m-2028-copy/02.webp' },
        { name: 'Black / Tan', c1: C.black, c2: C.tan, img: '/images/products/morucha-men-s-rfid-blocking-leather-wallet-genuine-soft-leather-bifold-with-coin-pocket-id-windows-m-2028-copy/12.webp' },
      ],
    },
    m80: {
      name: 'Mans RFID Blocking Real Distressed Hunter Leather Wallet M-80 Dark Brown', price: 26.99,
      variants: [{ name: 'Dark Brown', c1: C.brown, img: '/images/products/mens-rfid-blocking-real-distressed-hunter-leather-wallet-dark-brown/01.webp', alt: '/images/products/mens-rfid-blocking-real-distressed-hunter-leather-wallet-dark-brown/02.webp' }],
    },
    m2015: {
      name: 'MORUCHA Men’s RFID Blocking Leather Wallet – Genuine Soft Leather Bifold with Coin Pocket & ID Windows – M2015 Black Tan', price: 29.99,
      variants: [{ name: 'Black / Tan', c1: C.black, c2: C.tan, img: '/images/products/morucha-men-s-rfid-blocking-leather-wallet-genuine-soft-leather-bifold-with-coin-pocket-id-windows-m2015-black-tan/01.webp', alt: '/images/products/morucha-men-s-rfid-blocking-leather-wallet-genuine-soft-leather-bifold-with-coin-pocket-id-windows-m2015-black-tan/02.webp' }],
    },
    m115: {
      name: 'MORUCHA Men’s RFID Blocking Soft Leather Passcase Wallet – Bifold Card Holder with ID Windows & Gift Box – M115 Burgundy', price: 24.99, badge: 'Gift boxed',
      variants: [{ name: 'Burgundy', c1: C.burgundy, img: '/images/products/morucha-men-s-rfid-blocking-soft-leather-passcase-wallet-bifold-card-holder-with-id-windows-gift-box-m115-burgundy/01.webp', alt: '/images/products/morucha-men-s-rfid-blocking-soft-leather-passcase-wallet-bifold-card-holder-with-id-windows-gift-box-m115-burgundy/02.webp' }],
    },
    m100: {
      name: 'Mens Genuine Distressed Leather Biker Wallet with Detachable 31cm Safety Chain M100 Dark Brown', price: 29.99,
      variants: [{ name: 'Dark Brown', c1: C.hunter, img: '/images/products/mens-genuine-distressed-leather-biker-wallet-with-detachable-31cm-safety-chain-m100-dark-brown/01.webp', alt: '/images/products/mens-genuine-distressed-leather-biker-wallet-with-detachable-31cm-safety-chain-m100-dark-brown/02.webp' }],
    },
    hunterBillfold: {
      name: 'Mens RFID Oiled Hunter Leather Billfold Wallet Brown', price: 24.99,
      variants: [{ name: 'Brown', c1: C.hunter, img: '/images/products/mens-rfid-hunter-leather-billfold-wallet/01.webp', alt: '/images/products/mens-rfid-hunter-leather-billfold-wallet/02.webp' }],
    },
    nappa: {
      name: 'Gents RFID Nappa Leather Trifold Passcase Wallet Black', price: 26.99,
      variants: [{ name: 'Black', c1: C.black, img: '/images/products/gents-rfid-nappa-leather-passcase-wallet/01.webp', alt: '/images/products/gents-rfid-nappa-leather-passcase-wallet/02.webp' }],
    },
    m95: {
      name: 'MORUCHA Clutch Wallet for Women Genuine Leather RFID Blocking High Capacity Cardholder M95', price: 34.99, badge: 'Bestseller',
      variants: [
        { name: 'Burgundy', c1: C.burgundy, img: '/images/products/morucha-clutch-wallet-for-women-genuine-leather-rfid-blocking-high-capacity-cardholder-m95/01.webp' },
        { name: 'Black', c1: C.black, img: '/images/products/morucha-clutch-wallet-for-women-genuine-leather-rfid-blocking-high-capacity-cardholder-m95/07.webp' },
        { name: 'Dark Brown', c1: C.brown, img: '/images/products/morucha-clutch-wallet-for-women-genuine-leather-rfid-blocking-high-capacity-cardholder-m95/10.webp' },
        { name: 'Fuchsia', c1: C.fuchsia, img: '/images/products/morucha-clutch-wallet-for-women-genuine-leather-rfid-blocking-high-capacity-cardholder-m95/08.webp' },
        { name: 'Grey', c1: C.grey, img: '/images/products/morucha-clutch-wallet-for-women-genuine-leather-rfid-blocking-high-capacity-cardholder-m95/11.webp' },
        { name: 'Red', c1: C.red, img: '/images/products/morucha-clutch-wallet-for-women-genuine-leather-rfid-blocking-high-capacity-cardholder-m95/09.webp' },
      ],
    },
    m90: {
      name: 'MORUCHA Clutch Wallet for Women Genuine Leather RFID Blocking High Capacity Cardholder M90', price: 34.99,
      variants: [
        { name: 'Burgundy', c1: C.burgundy, img: '/images/products/morucha-clutch-wallet-for-women-genuine-leather-rfid-blocking-high-capacity-cardholder-m90/01.webp' },
        { name: 'Black', c1: C.black, img: '/images/products/morucha-clutch-wallet-for-women-genuine-leather-rfid-blocking-high-capacity-cardholder-m90/21.webp' },
        { name: 'Dark Hunter Brown', c1: C.hunter, img: '/images/products/morucha-clutch-wallet-for-women-genuine-leather-rfid-blocking-high-capacity-cardholder-m90/29.webp' },
        { name: 'Fuchsia', c1: C.fuchsia, img: '/images/products/morucha-clutch-wallet-for-women-genuine-leather-rfid-blocking-high-capacity-cardholder-m90/14.webp' },
        { name: 'Grey', c1: C.grey, img: '/images/products/morucha-clutch-wallet-for-women-genuine-leather-rfid-blocking-high-capacity-cardholder-m90/08.webp' },
      ],
    },
    m85: {
      name: 'MORUCHA Clutch Wallet for Women Genuine Leather RFID Blocking High Capacity Cardholder Purse M85', price: 34.99, badge: 'New',
      variants: [
        { name: 'Brown', c1: C.hunter, img: '/images/products/morucha-clutch-wallet-for-women-genuine-leather-rfid-blocking-high-capacity-cardholder-purse-m85/01.webp' },
        { name: 'Black', c1: C.black, img: '/images/products/morucha-clutch-wallet-for-women-genuine-leather-rfid-blocking-high-capacity-cardholder-purse-m85/14.webp' },
        { name: 'Grey', c1: C.grey, img: '/images/products/morucha-clutch-wallet-for-women-genuine-leather-rfid-blocking-high-capacity-cardholder-purse-m85/08.webp' },
        { name: 'Red', c1: C.red, img: '/images/products/morucha-clutch-wallet-for-women-genuine-leather-rfid-blocking-high-capacity-cardholder-purse-m85/20.webp' },
      ],
    },
    longNavy: {
      name: 'Womens Ladies Girls RFID BLOCKING Real Leather Long Clutch Wallet Purse Dark Blue', price: 34.99,
      variants: [{ name: 'Dark Blue', c1: C.navy, img: '/images/products/womens-ladies-girls-rfid-blocking-real-leather-long-clutch-wallet-purse-dark-blue/01.webp', alt: '/images/products/womens-ladies-girls-rfid-blocking-real-leather-long-clutch-wallet-purse-dark-blue/02.webp' }],
    },
    redBlack: {
      name: 'Women Genuine Leather RFID Clutch Wallet Red Black', price: 34.99,
      variants: [{ name: 'Red / Black', c1: C.red, c2: C.black, img: '/images/products/women-genuine-leather-rfid-clutch-wallet-red-black/01.webp', alt: '/images/products/women-genuine-leather-rfid-clutch-wallet-red-black/02.webp' }],
    },
    blueBlack: {
      name: 'Women Genuine Leather RFID Purse Black Blue', price: 34.99,
      variants: [{ name: 'Black / Blue', c1: C.black, c2: C.blue, img: '/images/products/women-genuine-leather-rfid-purse-blue/01.webp', alt: '/images/products/women-genuine-leather-rfid-purse-blue/02.webp' }],
    },
  };

  const COLLECTIONS = {
    men: ['m2028', 'm2025', 'm80', 'm2015', 'm115', 'm100', 'hunterBillfold', 'nappa'],
    women: ['m95', 'm90', 'm85', 'longNavy', 'redBlack', 'blueBlack'],
  };

  /* ------------------------------------------------------------------
     Best sellers — tabs, cards, arrows
     ------------------------------------------------------------------ */
  const MAX_SWATCHES = 4;
  const swatchStyle = (v) => `--c1:${v.c1};${v.c2 ? `--c2:${v.c2}` : ''}`;
  const CARD_SIZES = '(max-width: 700px) 70vw, (max-width: 1200px) 34vw, 360px'; // .best__track columns (style.css)
  const track = $('[data-best-track]');
  const prevBtn = $('[data-best-prev]');
  const nextBtn = $('[data-best-next]');
  const ink = $('[data-tab-ink]');
  let currentTab = null;

  function cardHTML(id, i) {
    const p = CATALOGUE[id];
    const v = p.variants[0];
    const extra = p.variants.length - MAX_SWATCHES;
    const swatches = p.variants.length > 1
      ? p.variants.slice(0, MAX_SWATCHES).map((s, n) => `<button class="swatch${n === 0 ? ' is-active' : ''}" type="button" style="${swatchStyle(s)}" data-variant="${n}" aria-label="${s.name}" aria-pressed="${n === 0}"></button>`).join('')
        + (extra > 0 ? `<span class="swatch-more">+${extra}</span>` : '')
      : `<span class="swatch" style="${swatchStyle(v)}" title="${v.name}"></span>`;
    const badgeClass = p.badge === 'New' ? ' card__badge--new' : '';

    return `
      <article class="card" data-id="${id}" data-variant-index="0" style="--i:${i}">
        <div class="card__media">
          <a href="#" aria-label="${p.name}">
            <img class="card__img card__img--main${v.alt ? ' has-alt' : ''}" ${photoAttrs(v.img, CARD_SIZES)} alt="${p.name} in ${v.name}" loading="lazy">
            ${v.alt ? `<img class="card__img card__img--alt" ${photoAttrs(v.alt, CARD_SIZES)} alt="" loading="lazy">` : ''}
          </a>
          ${p.badge ? `<span class="card__badge${badgeClass}">${p.badge}</span>` : ''}
          <button class="card__wish" type="button" aria-label="Save ${p.name}" aria-pressed="false"><svg class="icon"><use href="#i-heart"/></svg></button>
          <button class="card__add" type="button" data-add aria-label="Add ${p.name} to bag">Quick add<svg class="icon"><use href="#i-plus"/></svg></button>
        </div>
        <div class="card__info">
          <h3 class="card__name"><a href="#">${p.name}</a></h3>
          <p class="card__price">${money(p.price)}</p>
          <div class="swatches">${swatches}</div>
        </div>
      </article>`;
  }

  function moveInk() {
    const active = $('.tab.is-active');
    if (!active || !ink) return;
    ink.style.left = `${active.offsetLeft}px`;
    ink.style.width = `${active.offsetWidth}px`;
  }

  function setTab(tab) {
    if (tab === currentTab) return;
    currentTab = tab;
    $$('[data-tab]').forEach((b) => {
      const on = b.dataset.tab === tab;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-selected', on);
      if (on) track.setAttribute('aria-labelledby', b.id);
    });
    track.innerHTML = COLLECTIONS[tab].map(cardHTML).join('');
    track.scrollLeft = 0;
    moveInk();
    updateArrows();
  }

  function updateArrows() {
    const max = track.scrollWidth - track.clientWidth - 2;
    prevBtn.disabled = track.scrollLeft <= 2;
    nextBtn.disabled = track.scrollLeft >= max;
  }

  function step() {
    const card = $('.card', track);
    const gap = parseFloat(getComputedStyle(track).columnGap) || 24;
    return card ? (card.offsetWidth + gap) * Math.max(1, Math.round(track.clientWidth / (card.offsetWidth + gap)) - 1) : track.clientWidth;
  }

  $$('[data-tab]').forEach((b) => b.addEventListener('click', () => setTab(b.dataset.tab)));
  $$('[data-tab-link]').forEach((a) => a.addEventListener('click', () => setTab(a.dataset.tabLink)));
  prevBtn.addEventListener('click', () => track.scrollBy({ left: -step(), behavior: 'smooth' }));
  nextBtn.addEventListener('click', () => track.scrollBy({ left: step(), behavior: 'smooth' }));
  track.addEventListener('scroll', () => requestAnimationFrame(updateArrows), { passive: true });
  window.addEventListener('resize', () => { moveInk(); updateArrows(); });
  document.fonts?.ready.then(moveInk);

  track.addEventListener('click', (e) => {
    const card = e.target.closest('.card');
    if (!card) return;
    const product = CATALOGUE[card.dataset.id];

    const swatch = e.target.closest('[data-variant]');
    if (swatch) {
      const n = Number(swatch.dataset.variant);
      const v = product.variants[n];
      card.dataset.variantIndex = n;
      const main = $('.card__img--main', card);
      setPhoto(main, v.img);
      main.alt = `${product.name} in ${v.name}`;
      // The hover photo must belong to the chosen colour, or be hidden when that colour has none
      let altImg = $('.card__img--alt', card);
      if (v.alt && !altImg) {
        altImg = document.createElement('img');
        altImg.className = 'card__img card__img--alt';
        altImg.alt = '';
        altImg.sizes = CARD_SIZES;
        main.after(altImg);
      }
      if (altImg) {
        altImg.style.display = v.alt ? '' : 'none';
        if (v.alt) setPhoto(altImg, v.alt);
      }
      main.classList.toggle('has-alt', Boolean(v.alt));
      $$('[data-variant]', card).forEach((s) => {
        s.classList.toggle('is-active', s === swatch);
        s.setAttribute('aria-pressed', s === swatch);
      });
      return;
    }

    const wish = e.target.closest('.card__wish');
    if (wish) {
      const on = !wish.classList.contains('is-active');
      wish.classList.toggle('is-active', on);
      wish.setAttribute('aria-pressed', on);
      wish.classList.remove('is-pop');
      void wish.offsetWidth;
      wish.classList.add('is-pop');
      wishlist[on ? 'add' : 'delete'](card.dataset.id);
      updateWish();
      toast(on ? 'Saved to wishlist' : 'Removed from wishlist');
      return;
    }

    const add = e.target.closest('[data-add]');
    if (add) {
      addToCart(card.dataset.id, product.variants[Number(card.dataset.variantIndex) || 0]);
      add.classList.add('is-added');
      setTimeout(() => add.classList.remove('is-added'), 1200);
    }
  });

  /* ------------------------------------------------------------------
     Velocity marquee — speeds up with scroll, reverses when scrolling up
     ------------------------------------------------------------------ */
  const marquee = $('[data-marquee]');
  let marqueeAnim = null;
  let marqueeRate = 1;
  let marqueeTarget = 1;
  let marqueeDir = 1;
  if (marquee && !reduced && marquee.animate) {
    marqueeAnim = marquee.animate([{ transform: 'translateX(0)' }, { transform: 'translateX(-50%)' }], { duration: 38000, iterations: Infinity });
  }

  /* ------------------------------------------------------------------
     Statement — split into words for the scroll scrub
     ------------------------------------------------------------------ */
  const scrub = $('[data-scrub]');
  let scrubWords = [];
  if (scrub) {
    const wrap = (node) => {
      [...node.childNodes].forEach((child) => {
        if (child.nodeType === Node.TEXT_NODE) {
          const frag = document.createDocumentFragment();
          child.textContent.split(/(\s+)/).forEach((part) => {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
            const s = document.createElement('span');
            s.className = 'sw';
            s.textContent = part;
            frag.appendChild(s);
          });
          child.replaceWith(frag);
        } else if (child.nodeType === Node.ELEMENT_NODE) {
          wrap(child);
        }
      });
    };
    wrap(scrub);
    scrubWords = $$('.sw', scrub);
  }

  /* ------------------------------------------------------------------
     Explore the range — hover list swaps the image
     ------------------------------------------------------------------ */
  const rangeItems = $$('.range__item');
  const rangeFigs = $$('.range__fig');
  const rangeCta = $('[data-range-cta]');
  const CTA = { men: "Shop men's wallets", women: "Shop women's purses", cards: 'Shop card holders', hunter: 'Shop Hunter leather', gifts: 'Shop gifts under £30' };
  let rangeIndex = 0;

  function setRange(n) {
    if (n === rangeIndex) return;
    const prev = rangeFigs[rangeIndex];
    prev.classList.remove('is-active');
    prev.classList.add('is-leaving');
    setTimeout(() => prev.classList.remove('is-leaving'), 1100);
    rangeFigs[n].classList.add('is-active');
    rangeItems.forEach((it, k) => it.classList.toggle('is-active', k === n));
    if (rangeCta) rangeCta.textContent = CTA[rangeItems[n].dataset.key];
    rangeIndex = n;
  }
  rangeItems.forEach((it, n) => {
    it.addEventListener('mouseenter', () => setRange(n));
    it.addEventListener('focus', () => setRange(n));
  });
  $$('[data-range-link]').forEach((a) => a.addEventListener('click', () => {
    const n = rangeItems.findIndex((it) => it.dataset.key === a.dataset.rangeLink);
    if (n > -1) setRange(n);
  }));

  /* ------------------------------------------------------------------
     Leather guide — vertical carousel with directional texture wipes,
     autoplay ring while on screen, and a pointer-tilted product card
     ------------------------------------------------------------------ */
  const lg = $('[data-lguide]');
  if (lg) {
    const items = $$('.lg-item', lg);
    const heads = items.map((it) => $('.lg-item__head', it));
    const slides = $$('.lg-slide', lg);
    const big = $('[data-lg-big]', lg);
    const ring = $('.lg__ring circle', lg);
    const visual = $('[data-lg-visual]', lg);
    let index = 0;
    let auto = !reduced;

    const restartRing = () => {
      ring.style.animation = 'none';
      void ring.getBoundingClientRect();
      ring.style.animation = '';
    };

    const stopAuto = () => {
      auto = false;
      lg.classList.remove('is-auto');
    };

    const showLeather = (target, focus = false) => {
      const n = (target + items.length) % items.length;
      if (n === index) return;
      const dir = target > index ? 1 : -1;
      const prev = slides[index];
      const next = slides[n];

      slides.forEach((s) => s.classList.remove('is-prev'));
      prev.classList.remove('is-active', 'from-top');
      prev.dataset.dir = dir;
      prev.classList.add('is-prev');
      setTimeout(() => prev.classList.remove('is-prev'), 1200);

      next.classList.remove('is-active', 'from-top');
      void next.offsetWidth; // restart the wipe
      if (dir < 0) next.classList.add('from-top');
      next.classList.add('is-active');

      items.forEach((it, k) => {
        const on = k === n;
        it.classList.toggle('is-active', on);
        heads[k].setAttribute('aria-selected', on);
        heads[k].tabIndex = on ? 0 : -1;
      });
      if (focus) heads[n].focus();

      big.textContent = String(n + 1).padStart(2, '0');
      big.classList.remove('is-swap');
      void big.offsetWidth;
      big.classList.add('is-swap');
      lg.style.setProperty('--step', (n + 1) / items.length);
      restartRing();
      index = n;
    };

    heads.forEach((h, n) => h.addEventListener('click', () => { stopAuto(); showLeather(n); }));
    $('[data-lg-prev]', lg).addEventListener('click', () => { stopAuto(); showLeather(index - 1); });
    $('[data-lg-next]', lg).addEventListener('click', () => { stopAuto(); showLeather(index + 1); });
    $('.lg__items', lg).addEventListener('keydown', (e) => {
      const step = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
      if (!step) return;
      e.preventDefault();
      stopAuto();
      showLeather(index + step, true);
    });

    // Autoplay: the ring around "next" fills, then the guide moves on
    ring.addEventListener('animationend', () => { if (auto) showLeather(index + 1); });
    lg.addEventListener('mouseenter', () => lg.classList.add('is-paused'));
    lg.addEventListener('mouseleave', () => lg.classList.remove('is-paused'));
    if (auto && 'IntersectionObserver' in window) {
      new IntersectionObserver(([entry]) => {
        lg.classList.toggle('is-auto', auto && entry.isIntersecting);
      }, { threshold: 0.4 }).observe(lg);
    }

    // Swipe on the image (touch screens)
    let startX = null;
    visual.addEventListener('pointerdown', (e) => { startX = e.clientX; });
    visual.addEventListener('pointerup', (e) => {
      if (startX === null) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 40) { stopAuto(); showLeather(index + (dx < 0 ? 1 : -1)); }
      startX = null;
    });

    // The product card leans towards the pointer
    if (!reduced && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      visual.addEventListener('pointermove', (e) => {
        const r = visual.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        const tilt = $('.lg-slide.is-active .lg-slide__tilt', lg);
        tilt.style.setProperty('--ry', `${(x * 14).toFixed(2)}deg`);
        tilt.style.setProperty('--rx', `${(-y * 12).toFixed(2)}deg`);
      });
      visual.addEventListener('pointerleave', () => {
        $$('.lg-slide__tilt', lg).forEach((t) => { t.style.removeProperty('--rx'); t.style.removeProperty('--ry'); });
      });
    }
  }

  /* ------------------------------------------------------------------
     Count-up numbers
     ------------------------------------------------------------------ */
  const counters = $$('[data-count]');
  const runCount = (el) => {
    const target = Number(el.dataset.count);
    const fmt = (v) => Math.round(v).toLocaleString('en-GB');
    if (reduced) { el.textContent = fmt(target); return; }
    const t0 = performance.now();
    const dur = 1800;
    const tick = (t) => {
      const p = clamp((t - t0) / dur, 0, 1);
      el.textContent = fmt(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  if ('IntersectionObserver' in window) {
    const cio = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        runCount(entry.target);
        cio.unobserve(entry.target);
      });
    }, { threshold: 0.6 });
    counters.forEach((c) => cio.observe(c));
  } else {
    counters.forEach(runCount);
  }

  /* ------------------------------------------------------------------
     One scroll loop: marquee speed, scrub text, parallax
     ------------------------------------------------------------------ */
  const parallaxImgs = $$('[data-parallax]');
  let lastT = performance.now();
  let ticking = false;

  function onFrame() {
    ticking = false;
    const y = window.scrollY;
    const vh = window.innerHeight;
    const now = performance.now();
    const dy = y - lastY;
    const dt = Math.max(16, now - lastT);

    // Marquee velocity
    if (marqueeAnim && Math.abs(dy) > 0) {
      marqueeDir = dy > 0 ? 1 : -1;
      marqueeTarget = marqueeDir * (1 + Math.min(Math.abs(dy / dt) * 6, 7));
    }

    if (!reduced) {
      // Statement scrub
      if (scrubWords.length) {
        const r = scrub.getBoundingClientRect();
        const p = clamp((vh * 0.85 - r.top) / (r.height + vh * 0.45), 0, 1);
        const lit = p * (scrubWords.length + 6);
        scrubWords.forEach((w, i) => w.style.setProperty('--o', (0.16 + 0.84 * clamp(lit - i, 0, 1)).toFixed(3)));
      }

      // Parallax inside revealed images
      parallaxImgs.forEach((im) => {
        const box = im.parentElement;
        const r = box.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh) return;
        const offset = ((r.top + r.height / 2) - vh / 2) / vh;
        box.style.setProperty('--py', `${(offset * -40).toFixed(1)}px`);
      });
    }

    lastY = y;
    lastT = now;
  }

  // Header: compact once scrolled; hide while scrolling down, reveal on the way back up
  let headerY = window.scrollY;
  function updateHeader() {
    const y = window.scrollY;
    const dy = y - headerY;
    header.classList.toggle('is-scrolled', y > 10);
    if (!document.body.classList.contains('is-locked') && Math.abs(dy) > 4) {
      header.classList.toggle('is-hidden', dy > 0 && y > 600);
      headerY = y;
    }
    if (y < 600) header.classList.remove('is-hidden');
  }

  window.addEventListener('scroll', () => {
    updateHeader();
    if (!ticking) { ticking = true; requestAnimationFrame(onFrame); }
  }, { passive: true });
  updateHeader();
  onFrame();

  // Ease the marquee back to its resting speed
  if (marqueeAnim) {
    const settle = () => {
      marqueeTarget += (marqueeDir - marqueeTarget) * 0.04;
      marqueeRate += (marqueeTarget - marqueeRate) * 0.12;
      marqueeAnim.playbackRate = marqueeRate;
      requestAnimationFrame(settle);
    };
    requestAnimationFrame(settle);
  }

  /* ------------------------------------------------------------------
     Wishlist + cart
     ------------------------------------------------------------------ */
  const wishlist = new Set();
  const wishCount = $('[data-wish-count]');
  function updateWish() {
    wishCount.textContent = wishlist.size;
    wishCount.hidden = wishlist.size === 0;
  }

  const cart = [];
  const cartItemsEl = $('[data-cart-items]');
  const cartCountEl = $('[data-cart-count]');
  const cartSubtotalEl = $('[data-cart-subtotal]');
  const cartFootEl = $('[data-cart-foot]');
  const cartHeadingCount = $('[data-cart-heading-count]');

  function addToCart(id, variant) {
    const product = CATALOGUE[id];
    const key = `${id}::${variant.name}`;
    const existing = cart.find((i) => i.key === key);
    if (existing) existing.qty += 1;
    else cart.push({ key, name: product.name, variant: variant.name, price: product.price, img: variant.img, qty: 1 });
    renderCart();
    cartCountEl.classList.remove('is-bump');
    void cartCountEl.offsetWidth;
    cartCountEl.classList.add('is-bump');
    openDrawer('cart');
  }

  function renderCart() {
    const count = cart.reduce((n, i) => n + i.qty, 0);
    const subtotal = cart.reduce((n, i) => n + i.qty * i.price, 0);
    cartCountEl.textContent = count;
    cartCountEl.hidden = count === 0;
    cartHeadingCount.textContent = count ? `(${count})` : '';
    cartSubtotalEl.textContent = money(subtotal);
    cartFootEl.hidden = count === 0;
    if (!cart.length) {
      cartItemsEl.innerHTML = '<div class="cart__empty"><svg class="icon"><use href="#i-bag"/></svg><p>Your bag is empty.</p></div>';
      return;
    }
    cartItemsEl.innerHTML = cart.map((i, idx) => `
      <div class="cart-item">
        <div class="cart-item__img"><img src="${sized(i.img, 320)}" alt=""></div>
        <div>
          <p class="cart-item__name">${i.name}</p>
          <p class="cart-item__meta">${i.variant}</p>
          <div class="qty">
            <button type="button" data-qty="-1" data-idx="${idx}" aria-label="Decrease quantity"><svg class="icon"><use href="#i-minus"/></svg></button>
            <span>${i.qty}</span>
            <button type="button" data-qty="1" data-idx="${idx}" aria-label="Increase quantity"><svg class="icon"><use href="#i-plus"/></svg></button>
          </div>
        </div>
        <div class="cart-item__side">
          <span class="cart-item__price">${money(i.price * i.qty)}</span>
          <button class="cart-item__remove" type="button" data-remove="${idx}">Remove</button>
        </div>
      </div>`).join('');
  }

  cartItemsEl.addEventListener('click', (e) => {
    const q = e.target.closest('[data-qty]');
    if (q) {
      const idx = Number(q.dataset.idx);
      cart[idx].qty += Number(q.dataset.qty);
      if (cart[idx].qty < 1) cart.splice(idx, 1);
      renderCart();
      return;
    }
    const rm = e.target.closest('[data-remove]');
    if (rm) { cart.splice(Number(rm.dataset.remove), 1); renderCart(); }
  });

  /* ------------------------------------------------------------------
     Drawers (menu, cart, search) + overlay
     ------------------------------------------------------------------ */
  const overlay = $('[data-overlay]');
  let openName = null;
  let lastFocus = null;

  function openDrawer(name) {
    const el = $(`[data-drawer="${name}"]`);
    if (!el) return;
    if (openName && openName !== name) closeDrawer(false);
    lastFocus = document.activeElement;
    openName = name;
    el.classList.add('is-open');
    el.setAttribute('aria-hidden', 'false');
    overlay.hidden = false;
    requestAnimationFrame(() => overlay.classList.add('is-visible'));
    document.body.classList.add('is-locked');
    header.classList.remove('is-hidden');
    const focusTarget = name === 'search' ? $('#search-input') : $('[data-close]', el);
    setTimeout(() => focusTarget?.focus({ preventScroll: true }), 80);
  }

  function closeDrawer(restoreFocus = true) {
    if (!openName) return;
    const el = $(`[data-drawer="${openName}"]`);
    el.classList.remove('is-open');
    el.setAttribute('aria-hidden', 'true');
    overlay.classList.remove('is-visible');
    setTimeout(() => { if (!openName) overlay.hidden = true; }, 400);
    document.body.classList.remove('is-locked');
    openName = null;
    if (restoreFocus) lastFocus?.focus?.({ preventScroll: true });
  }

  $$('[data-open]').forEach((b) => b.addEventListener('click', () => openDrawer(b.dataset.open)));
  document.addEventListener('click', (e) => { if (e.target.closest('[data-close]')) closeDrawer(); });
  overlay.addEventListener('click', () => closeDrawer());
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeDrawer(); });

  /* ------------------------------------------------------------------
     Newsletter + toast
     ------------------------------------------------------------------ */
  const form = $('[data-newsletter]');
  const formMsg = $('[data-newsletter-msg]');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = form.elements.email;
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(input.value.trim());
    input.classList.toggle('is-invalid', !valid);
    formMsg.classList.remove('is-success', 'is-error');
    if (!valid) {
      formMsg.textContent = 'Please enter a valid email address.';
      formMsg.classList.add('is-error');
      input.focus();
      return;
    }
    // TODO: connect to Shopify customer form / Klaviyo list
    form.reset();
    formMsg.textContent = "Thank you — you're on the list.";
    formMsg.classList.add('is-success');
  });

  const toastEl = $('[data-toast]');
  let toastTimer;
  function toast(text) {
    toastEl.textContent = text;
    toastEl.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('is-visible'), 2200);
  }

  /* ------------------------------------------------------------------
     Init
     ------------------------------------------------------------------ */
  $$('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });
  setTab('men');
  renderCart();
})();
