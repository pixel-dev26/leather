// Homepage V5: Morucha, first called Heritage editorial; moved from morucha-next, where it was /v1/

import ProductPhoto from '@/components/v5/ProductPhoto';

// Root paths get the base path the site is served from (empty in dev), so they work with or without a trailing slash
const base = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export default function Page() {
  return (
    <>
      {/* ============ ICON SPRITE ============ */}
      <svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }} aria-hidden="true">
        <symbol id="i-search" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="1.5" /><path d="m20 20-3.6-3.6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></symbol>
        <symbol id="i-user" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" fill="none" stroke="currentColor" strokeWidth="1.5" /><path d="M4 21c1.2-4 4.3-6 8-6s6.8 2 8 6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></symbol>
        <symbol id="i-heart" viewBox="0 0 24 24"><path d="M12 20.5s-7.5-4.6-9-9.6C2 7.4 4.3 4.5 7.4 4.5c2 0 3.6 1.1 4.6 2.7 1-1.6 2.6-2.7 4.6-2.7 3.1 0 5.4 2.9 4.4 6.4-1.5 5-9 9.6-9 9.6Z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></symbol>
        <symbol id="i-bag" viewBox="0 0 24 24"><path d="M5 8h14l-1 13H6L5 8Z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="M9 8V6a3 3 0 0 1 6 0v2" fill="none" stroke="currentColor" strokeWidth="1.5" /></symbol>
        <symbol id="i-menu" viewBox="0 0 24 24"><path d="M3 7h18M3 12h18M3 17h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></symbol>
        <symbol id="i-close" viewBox="0 0 24 24"><path d="M5 5l14 14M19 5 5 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></symbol>
        <symbol id="i-arrow" viewBox="0 0 24 24"><path d="M4 12h15m-5-6 6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></symbol>
        <symbol id="i-chev-down" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></symbol>
        <symbol id="i-arrow-l" viewBox="0 0 24 24"><path d="M20 12H5m5-6-6 6 6 6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></symbol>
        <symbol id="i-plus" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></symbol>
        <symbol id="i-minus" viewBox="0 0 24 24"><path d="M5 12h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></symbol>
        <symbol id="i-check" viewBox="0 0 24 24"><path d="m5 12.5 4.5 4.5L19 7.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></symbol>
        <symbol id="i-shield" viewBox="0 0 32 32"><path d="M16 3.5 26 7v8.3c0 6.4-4.2 11-10 13.2C10.2 26.3 6 21.7 6 15.3V7l10-3.5Z" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M11.5 13.5c2.6-2.2 6.4-2.2 9 0M13.3 16.3c1.5-1.2 3.9-1.2 5.4 0" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /><circle cx="16" cy="19.5" r="1.3" fill="currentColor" /></symbol>
        <symbol id="i-truck" viewBox="0 0 32 32"><path d="M3 8h16v13H3zM19 12h5.5l4 4.5V21H19z" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><circle cx="9" cy="23" r="2.4" fill="var(--icon-bg,#fff)" stroke="currentColor" strokeWidth="1.4" /><circle cx="23.5" cy="23" r="2.4" fill="var(--icon-bg,#fff)" stroke="currentColor" strokeWidth="1.4" /></symbol>
        <symbol id="i-return" viewBox="0 0 32 32"><path d="M8 12h13a6 6 0 0 1 0 12h-9" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /><path d="m12 7-5 5 5 5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></symbol>
        <symbol id="i-gift" viewBox="0 0 32 32"><path d="M5 12h22v5H5zM7 17h18v11H7zM16 12v16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M16 12c-1.5-4-6.5-6-7.5-3.5S12 12 16 12Zm0 0c1.5-4 6.5-6 7.5-3.5S20 12 16 12Z" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></symbol>
        <symbol id="i-bag32" viewBox="0 0 32 32"><path d="M7 11h18l-1.4 17H8.4L7 11Z" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M12 11V8.5a4 4 0 0 1 8 0V11" fill="none" stroke="currentColor" strokeWidth="1.4" /></symbol>
        <symbol id="i-mail" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" /><path d="m4 7 8 6 8-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></symbol>
        <symbol id="i-instagram" viewBox="0 0 24 24"><rect x="3.5" y="3.5" width="17" height="17" rx="5" fill="none" stroke="currentColor" strokeWidth="1.5" /><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.5" /><circle cx="17.2" cy="6.8" r="1" fill="currentColor" /></symbol>
        <symbol id="i-facebook" viewBox="0 0 24 24"><path d="M13.5 21v-7.5H16l.4-3h-2.9V8.7c0-.9.3-1.5 1.5-1.5h1.6V4.6c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 3.9v2.1H8v3h2.5V21h3Z" fill="currentColor" /></symbol>
        <symbol id="i-pinterest" viewBox="0 0 24 24"><path d="M12 3a9 9 0 0 0-3.3 17.4c-.1-.8-.2-1.9 0-2.8l1.2-5s-.3-.6-.3-1.5c0-1.4.8-2.4 1.8-2.4.9 0 1.3.6 1.3 1.4 0 .9-.5 2.1-.8 3.3-.2 1 .5 1.8 1.5 1.8 1.8 0 3.1-1.9 3.1-4.6 0-2.4-1.7-4.1-4.2-4.1-2.9 0-4.5 2.1-4.5 4.4 0 .9.3 1.8.8 2.3.1.1.1.2.1.3l-.3 1.2c0 .2-.2.2-.4.1-1.3-.6-2.1-2.5-2.1-4 0-3.3 2.4-6.3 6.8-6.3 3.6 0 6.4 2.6 6.4 6 0 3.5-2.2 6.4-5.3 6.4-1 0-2-.5-2.3-1.2l-.6 2.4c-.2.9-.9 2-1.3 2.7A9 9 0 1 0 12 3Z" fill="currentColor" /></symbol>
      </svg>

      {/* ============ INTRO CURTAIN (shown once per visit) ============ */}
      <div className="intro" data-intro aria-hidden="true">
        <p className="intro__word" data-split="chars">MORUCHA</p>
        <span className="intro__line"></span>
      </div>

      <a className="skip-link" href="#main">Skip to content</a>

      {/* ============ ANNOUNCEMENT ============ */}
      <div className="announce" role="region" aria-label="Store announcements">
        <div className="announce__track" data-announce>
          <p className="announce__msg is-active">Free worldwide delivery on every order</p>
          <p className="announce__msg">Order before 3:30pm for same-day dispatch</p>
          <p className="announce__msg">Every wallet arrives gift-boxed</p>
          <p className="announce__msg">30-day returns on unused items</p>
        </div>
      </div>

      {/* ============ HEADER ============ */}
      <header className="header" data-header>
        <div className="header__top">
          <div className="header__side">
            <button className="icon-btn header__burger" type="button" aria-label="Open menu" data-open="menu"><svg className="icon"><use href="#i-menu" /></svg></button>
            <button className="icon-btn hide-sm" type="button" aria-label="Search" data-open="search"><svg className="icon"><use href="#i-search" /></svg></button>
            <a className="header__contact hide-md" href="mailto:sales@morucha.co.uk">sales@morucha.co.uk</a>
          </div>
          {/* two logos: white over the hero while the header is transparent, red once it fills in */}
          <a className="logo" href={`${base}/morucha/`} aria-label="Morucha home">
            <img className="logo__solid" src={`${base}/brand/morucha-logo.webp`} alt="Morucha" width="667" height="256" />
            <img className="logo__light" src={`${base}/brand/morucha-logo-white.webp`} alt="" width="667" height="256" />
          </a>
          <div className="header__side header__side--end">
            <button className="icon-btn show-sm" type="button" aria-label="Search" data-open="search"><svg className="icon"><use href="#i-search" /></svg></button>
            <a className="icon-btn hide-sm" href="#" aria-label="Account"><svg className="icon"><use href="#i-user" /></svg></a>
            <a className="icon-btn hide-sm" href="#" aria-label="Wishlist"><svg className="icon"><use href="#i-heart" /></svg><span className="count" data-wish-count hidden>0</span></a>
            <button className="icon-btn" type="button" aria-label="Open bag" data-open="cart"><svg className="icon"><use href="#i-bag" /></svg><span className="count" data-cart-count hidden>0</span></button>
          </div>
        </div>
        <nav className="nav" aria-label="Main">
          {/* Men and Women open a panel on hover or keyboard focus (CSS only); it covers the hero and dims the page below */}
          <ul className="nav__list">
            <li className="nav__item">
              <a className="nav__link" href="#range" data-range-link="men"><span className="roll"><span>Men</span></span></a>
              <div className="mega">
                <div className="mega__inner">
                  <div className="mega__col">
                    <p className="mega__heading">By style</p>
                    <a href="#bestsellers" data-tab-link="men">Bifold wallets</a>
                    <a href="#bestsellers" data-tab-link="men">Trifold wallets</a>
                    <a href="#bestsellers" data-tab-link="men">Passcase wallets</a>
                    <a href="#bestsellers" data-tab-link="men">Chain wallets</a>
                    <a href="#bestsellers" data-tab-link="men">Coin wallets</a>
                  </div>
                  <div className="mega__col">
                    <p className="mega__heading">By leather</p>
                    <a href="#leathers">Soft genuine leather</a>
                    <a href="#leathers">Nappa leather</a>
                    <a href="#leathers">Hunter leather</a>
                  </div>
                  <div className="mega__col">
                    <p className="mega__heading">Edits</p>
                    <a href="#bestsellers" data-tab-link="men">Best sellers</a>
                    <a href="#range" data-range-link="cards">Slim &amp; card holders</a>
                    <a href="#range" data-range-link="gifts">Gifts under £30</a>
                    <a href="#range" data-range-link="men">Shop all men's</a>
                  </div>
                  <a className="mega__feature" href="#bestsellers" data-tab-link="men">
                    <ProductPhoto src="/images/banners/men-wallet.webp" widths={[640]} alt="Hand holding up a black Morucha leather wallet with a tan edge" loading="lazy" />
                    <span className="mega__feature-copy"><span className="mega__feature-title">The everyday bifold</span><span className="mega__feature-cta">Shop now</span></span>
                  </a>
                </div>
              </div>
            </li>
            <li className="nav__item">
              <a className="nav__link" href="#range" data-range-link="women"><span className="roll"><span>Women</span></span></a>
              <div className="mega">
                <div className="mega__inner">
                  <div className="mega__col">
                    <p className="mega__heading">By style</p>
                    <a href="#bestsellers" data-tab-link="women">Clutch purses</a>
                    <a href="#bestsellers" data-tab-link="women">Long purses</a>
                    <a href="#bestsellers" data-tab-link="women">Colourful purses</a>
                    <a href="#range" data-range-link="cards">Card holders</a>
                  </div>
                  <div className="mega__col">
                    <p className="mega__heading">Why Morucha</p>
                    <a href="#journey">RFID protected</a>
                    <a href="#journey">Gift-boxed</a>
                    <a href="#journey">Free worldwide delivery</a>
                  </div>
                  <div className="mega__col">
                    <p className="mega__heading">Edits</p>
                    <a href="#bestsellers" data-tab-link="women">Best sellers</a>
                    <a href="#range" data-range-link="gifts">Gifts under £30</a>
                    <a href="#range" data-range-link="women">Shop all women's</a>
                  </div>
                  <a className="mega__feature" href="#bestsellers" data-tab-link="women">
                    <ProductPhoto src="/images/banners/women-wallet.webp" widths={[640]} alt="Woman in a white shirt holding a red Morucha leather purse" loading="lazy" />
                    <span className="mega__feature-copy"><span className="mega__feature-title">Room for everything</span><span className="mega__feature-cta">Shop now</span></span>
                  </a>
                </div>
              </div>
            </li>
            <li className="nav__item"><a className="nav__link" href="#range" data-range-link="cards"><span className="roll"><span>Card Holders</span></span></a></li>
            <li className="nav__item"><a className="nav__link" href="#leathers"><span className="roll"><span>Hunter Leather</span></span></a></li>
            <li className="nav__item"><a className="nav__link" href="#range" data-range-link="gifts"><span className="roll"><span>Gifts</span></span></a></li>
            <li className="nav__item"><a className="nav__link" href="#journey"><span className="roll"><span>Our Promise</span></span></a></li>
            <li className="nav__item"><a className="nav__link" href="#chronicle"><span className="roll"><span>Journal</span></span></a></li>
          </ul>
        </nav>
      </header>

      <main id="main">

        {/* ============ HERO SLIDESHOW ============ */}
        <section className="hero" aria-roledescription="carousel" aria-label="Featured collections" data-hero>
          <div className="hero__slides">
            <article className="slide is-active" aria-roledescription="slide" aria-label="1 of 3">
              <div className="slide__media"><ProductPhoto src="/images/banners/v1-banner-1.webp" widths={[640, 960, 1600]} sizes="100vw" alt="Black and tan Morucha leather bifold wallet resting on black leather" fetchPriority="high" /></div>
              <div className="slide__content">
                <p className="slide__label">Men's wallets</p>
                <h1 className="slide__title" data-split="words">Built to be carried<br />every day.</h1>
                <p className="slide__text">Soft genuine, Nappa and Hunter leather &mdash; RFID lined and gift-boxed as standard.</p>
                <a className="btn btn--red" href="#bestsellers" data-tab-link="men"><span className="roll"><span>Shop men's wallets</span></span><span className="arw" aria-hidden="true"><svg><use href="#i-arrow" /></svg><svg><use href="#i-arrow" /></svg></span></a>
              </div>
            </article>
            <article className="slide" aria-roledescription="slide" aria-label="2 of 3">
              <div className="slide__media"><ProductPhoto src="/images/banners/banner-image-1.webp" widths={[640, 960, 1600]} sizes="100vw" alt="Woman in red linen trousers holding a Morucha patchwork leather purse in blue, pink, black and red" loading="lazy" /></div>
              <div className="slide__content">
                <p className="slide__label">Women's purses</p>
                <h2 className="slide__title" data-split="words">Room for everything<br />you carry.</h2>
                <p className="slide__text">High-capacity clutches and long purses in classic and statement colours.</p>
                <a className="btn btn--red" href="#bestsellers" data-tab-link="women"><span className="roll"><span>Shop women's purses</span></span><span className="arw" aria-hidden="true"><svg><use href="#i-arrow" /></svg><svg><use href="#i-arrow" /></svg></span></a>
              </div>
            </article>
            <article className="slide" aria-roledescription="slide" aria-label="3 of 3">
              <div className="slide__media"><ProductPhoto src="/images/banners/banner-3.webp" widths={[640, 960, 1600]} sizes="100vw" alt="Man in a grey suit jacket sliding a black and tan Morucha leather wallet into his inside pocket" loading="lazy" style={{ objectPosition: '50% 30%' }} /></div>
              <div className="slide__content">
                <p className="slide__label">RFID protection</p>
                <h2 className="slide__title" data-split="words">Your cards, kept<br />to yourself.</h2>
                <p className="slide__text">A slim shielding layer in every wallet blocks contactless skimming at 13.56 MHz.</p>
                <a className="btn btn--red" href="#leathers"><span className="roll"><span>Discover RFID</span></span><span className="arw" aria-hidden="true"><svg><use href="#i-arrow" /></svg><svg><use href="#i-arrow" /></svg></span></a>
              </div>
            </article>
          </div>

          <div className="hero__ui">
            <p className="hero__count" aria-hidden="true"><span className="hero__num" data-hero-num>01</span><span className="hero__sep"></span><span>03</span></p>
            <div className="hero__bars" role="tablist" aria-label="Choose slide">
              <button className="hero__bar is-active" type="button" role="tab" aria-selected="true" aria-label="Slide 1"><span></span></button>
              <button className="hero__bar" type="button" role="tab" aria-selected="false" aria-label="Slide 2"><span></span></button>
              <button className="hero__bar" type="button" role="tab" aria-selected="false" aria-label="Slide 3"><span></span></button>
            </div>
            <div className="hero__arrows">
              <button className="circle-btn circle-btn--light" type="button" aria-label="Previous slide" data-hero-prev><span className="arw arw--left" aria-hidden="true"><svg><use href="#i-arrow-l" /></svg><svg><use href="#i-arrow-l" /></svg></span></button>
              <button className="circle-btn circle-btn--light" type="button" aria-label="Next slide" data-hero-next><span className="arw" aria-hidden="true"><svg><use href="#i-arrow" /></svg><svg><use href="#i-arrow" /></svg></span></button>
            </div>
          </div>
        </section>

        {/* ============ CATEGORY CIRCLES ============ */}
        <section className="circles" aria-label="Shop by category">
          <ul className="circles__list" data-stagger>
            <li><a className="circle" href="#range" data-range-link="men">
              <span className="circle__ring" aria-hidden="true"><svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="48" /></svg></span>
              <span className="circle__img"><ProductPhoto src="/images/products/morucha-men-s-rfid-blocking-leather-wallet-genuine-soft-leather-bifold-with-coin-pocket-id-windows-m2015-black-tan/01.webp" widths={[320]} alt="" loading="lazy" /></span>
              <span className="circle__name">Bifold</span></a></li>
            <li><a className="circle" href="#range" data-range-link="men">
              <span className="circle__ring" aria-hidden="true"><svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="48" /></svg></span>
              <span className="circle__img"><ProductPhoto src="/images/products/mens-rfid-blocking-compact-genuine-distressed-hunter-leather-trifold-wallet-m45-brown/01.webp" widths={[320]} alt="" loading="lazy" /></span>
              <span className="circle__name">Trifold</span></a></li>
            <li><a className="circle" href="#range" data-range-link="cards">
              <span className="circle__ring" aria-hidden="true"><svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="48" /></svg></span>
              <span className="circle__img"><ProductPhoto src="/images/products/minimalist-genuine-leather-rfid-wallet-black-orange/01.webp" widths={[320]} alt="" loading="lazy" /></span>
              <span className="circle__name">Card Holders</span></a></li>
            <li><a className="circle" href="#range" data-range-link="women">
              <span className="circle__ring" aria-hidden="true"><svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="48" /></svg></span>
              <span className="circle__img"><ProductPhoto src="/images/products/morucha-clutch-wallet-for-women-genuine-leather-rfid-blocking-high-capacity-cardholder-m95/01.webp" widths={[320]} alt="" loading="lazy" /></span>
              <span className="circle__name">Purses</span></a></li>
            <li><a className="circle" href="#leathers">
              <span className="circle__ring" aria-hidden="true"><svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="48" /></svg></span>
              <span className="circle__img"><ProductPhoto src="/images/products/mens-rfid-blocking-real-distressed-hunter-leather-wallet-dark-brown/01.webp" widths={[320]} alt="" loading="lazy" /></span>
              <span className="circle__name">Hunter Leather</span></a></li>
            <li><a className="circle" href="#range" data-range-link="men">
              <span className="circle__ring" aria-hidden="true"><svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="48" /></svg></span>
              <span className="circle__img"><ProductPhoto src="/images/products/mens-genuine-distressed-leather-biker-wallet-with-detachable-31cm-safety-chain-m100-dark-brown/01.webp" widths={[320]} alt="" loading="lazy" /></span>
              <span className="circle__name">Chain Wallets</span></a></li>
            <li><a className="circle" href="#range" data-range-link="gifts">
              <span className="circle__ring" aria-hidden="true"><svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="48" /></svg></span>
              <span className="circle__img"><ProductPhoto src="/images/products/morucha-men-s-rfid-blocking-genuine-leather-wallet-slim-bifold-card-holder-with-id-window-8-card-slots-m110-tan/01.webp" widths={[320]} alt="" loading="lazy" /></span>
              <span className="circle__name">Gift Boxed</span></a></li>
          </ul>
        </section>

        {/* ============ BEST SELLERS ============ */}
        <section className="best" id="bestsellers" aria-labelledby="best-title">
          <div className="container">
            <div className="best__head">
              <div className="best__titles">
                <p className="eyebrow">Best sellers</p>
                <h2 className="best__title" id="best-title" data-split="words">The pieces people <em>come back for.</em></h2>
              </div>
              <div className="best__side">
                <p className="best__intro">Our most-ordered wallets and purses, each RFID lined and sent out in a Morucha gift box.</p>
                <div className="best__controls">
                  <div className="tabs" role="tablist" aria-label="Best sellers">
                    <span className="tabs__ink" aria-hidden="true" data-tab-ink></span>
                    <button className="tab is-active" role="tab" aria-selected="true" id="tab-men" aria-controls="best-track" data-tab="men">Men</button>
                    <button className="tab" role="tab" aria-selected="false" id="tab-women" aria-controls="best-track" data-tab="women">Women</button>
                  </div>
                  <div className="best__arrows">
                    <button className="circle-btn" type="button" aria-label="Previous products" data-best-prev><span className="arw arw--left" aria-hidden="true"><svg><use href="#i-arrow-l" /></svg><svg><use href="#i-arrow-l" /></svg></span></button>
                    <button className="circle-btn circle-btn--dark" type="button" aria-label="Next products" data-best-next><span className="arw" aria-hidden="true"><svg><use href="#i-arrow" /></svg><svg><use href="#i-arrow" /></svg></span></button>
                  </div>
                </div>
              </div>
            </div>
            <div className="best__track" id="best-track" role="tabpanel" aria-labelledby="tab-men" tabIndex="0" data-best-track></div>
            <div className="best__foot">
              <p className="best__note">RFID lined · Gift-boxed · Free worldwide delivery</p>
              <a className="link" href="#"><span className="roll"><span>View all best sellers</span></span><span className="arw" aria-hidden="true"><svg><use href="#i-arrow" /></svg><svg><use href="#i-arrow" /></svg></span></a>
            </div>
          </div>
        </section>

        {/* ============ VELOCITY MARQUEE ============ */}
        <section className="marquee" aria-label="Morucha promises">
          <div className="marquee__track" data-marquee>
            <div className="marquee__group">
              <span>Genuine leather</span><i aria-hidden="true">✦</i>
              <em>RFID protected</em><i aria-hidden="true">✦</i>
              <span>Gift-boxed</span><i aria-hidden="true">✦</i>
              <em>Free worldwide delivery</em><i aria-hidden="true">✦</i>
            </div>
            <div className="marquee__group" aria-hidden="true">
              <span>Genuine leather</span><i>✦</i>
              <em>RFID protected</em><i>✦</i>
              <span>Gift-boxed</span><i>✦</i>
              <em>Free worldwide delivery</em><i>✦</i>
            </div>
          </div>
        </section>

        {/* ============ SCROLL-REVEAL STATEMENT ============ */}
        <section className="statement" aria-label="About Morucha">
          <div className="container">
            <p className="statement__text" data-scrub>For more than <em>five years</em>, Morucha has made dependable leather for everyday life &mdash; wallets, purses and card holders lined with <em>RFID protection</em>, dispatched within a day and <em>gift-boxed</em> for whoever's lucky enough to receive one.</p>
            <a className="link statement__link" href="#journey"><span className="roll"><span>Our promise</span></span><span className="arw" aria-hidden="true"><svg><use href="#i-arrow" /></svg><svg><use href="#i-arrow" /></svg></span></a>
          </div>
        </section>

        {/* ============ EXPLORE THE RANGE (full-bleed photo half + text half, same frame as the leather guide) ============ */}
        <section className="range" id="range" aria-labelledby="range-title">
          <div className="range__inner">
            <div className="range__stage">
              <div className="range__media" data-range-media>
                <figure className="range__fig is-active"><ProductPhoto src="/images/banners/men-wallet.webp" widths={[640, 960, 1600]} sizes="(max-width: 1023px) 100vw, 580px" alt="Hand holding up a black Morucha leather wallet with a tan edge" loading="lazy" /></figure>
                <figure className="range__fig"><ProductPhoto src="/images/banners/women-wallet.webp" widths={[640, 960, 1600]} sizes="(max-width: 1023px) 100vw, 580px" alt="Woman in a white shirt holding a red Morucha leather purse" loading="lazy" /></figure>
                <figure className="range__fig"><ProductPhoto src="/images/banners/card-holder.webp" widths={[640, 960, 1600]} sizes="(max-width: 1023px) 100vw, 580px" alt="Hands opening a black and tan leather wallet to show its card slots" loading="lazy" /></figure>
                <figure className="range__fig"><ProductPhoto src="/images/banners/hunter-leather.webp" widths={[640, 960, 1600]} sizes="(max-width: 1023px) 100vw, 580px" alt="Black Morucha leather wallet on a workbench with leatherworking tools" loading="lazy" /></figure>
                <figure className="range__fig"><ProductPhoto src="/images/banners/gifts-under.webp" widths={[640, 960, 1600]} sizes="(max-width: 1023px) 100vw, 580px" alt="Grey Morucha leather wallet beside its Morucha gift box" loading="lazy" style={{ objectPosition: '60% 50%' }} /></figure>
              </div>
              <p className="range__big" aria-hidden="true" data-range-num>01</p>
              <div className="range__card">
                <p className="range__count"><span data-range-label>Men's wallets</span></p>
                <p className="range__desc" data-range-desc>Bifold, trifold, passcase and chain, in soft, Nappa and Hunter leather.</p>
                <a className="btn btn--red range__cta" href="#bestsellers"><span className="roll"><span data-range-cta>Shop men's wallets</span></span><span className="arw" aria-hidden="true"><svg><use href="#i-arrow" /></svg><svg><use href="#i-arrow" /></svg></span></a>
              </div>
            </div>
            <div className="range__copy">
              <div className="range__body">
                <p className="eyebrow">Explore the range</p>
                <h2 className="range__title" id="range-title" data-split="words">Find the one you'll carry for years.</h2>
                <p className="range__intro">Five ways into the collection. Hover a range to see it, then shop the edit.</p>
                {/* data-label and data-desc fill the caption card over the photo when the row is hovered (main.js) */}
                <ol className="range__list" data-range>
                  <li><a className="range__item is-active" href="#" data-key="men" data-img="0" data-label="Men's wallets" data-desc="Bifold, trifold, passcase and chain, in soft, Nappa and Hunter leather."><span className="range__num">01</span><span className="range__text"><span className="range__name">Men's Wallets</span><span className="range__note">Bifold, trifold, passcase and chain</span></span><span className="range__go" aria-hidden="true"><svg className="icon icon--sm"><use href="#i-arrow" /></svg></span><span className="range__thumb"><ProductPhoto src="/images/banners/men-wallet.webp" widths={[320]} alt="" loading="lazy" /></span></a></li>
                  <li><a className="range__item" href="#" data-key="women" data-img="1" data-label="Women's purses" data-desc="Clutch and long purses with room for every card, note and coin."><span className="range__num">02</span><span className="range__text"><span className="range__name">Women's Purses</span><span className="range__note">Clutch and long purses with room for everything</span></span><span className="range__go" aria-hidden="true"><svg className="icon icon--sm"><use href="#i-arrow" /></svg></span><span className="range__thumb"><ProductPhoto src="/images/banners/women-wallet.webp" widths={[320]} alt="" loading="lazy" /></span></a></li>
                  <li><a className="range__item" href="#" data-key="cards" data-img="2" data-label="Card holders" data-desc="Slim, tap-and-go holders made for a front pocket."><span className="range__num">03</span><span className="range__text"><span className="range__name">Card Holders</span><span className="range__note">Slim, tap-and-go, built for a front pocket</span></span><span className="range__go" aria-hidden="true"><svg className="icon icon--sm"><use href="#i-arrow" /></svg></span><span className="range__thumb"><ProductPhoto src="/images/banners/card-holder.webp" widths={[320]} alt="" loading="lazy" /></span></a></li>
                  <li><a className="range__item" href="#" data-key="hunter" data-img="3" data-label="Hunter leather" data-desc="Oiled and distressed leather that darkens and softens with use."><span className="range__num">04</span><span className="range__text"><span className="range__name">Hunter Leather</span><span className="range__note">Oiled and distressed, darkens with use</span></span><span className="range__go" aria-hidden="true"><svg className="icon icon--sm"><use href="#i-arrow" /></svg></span><span className="range__thumb"><ProductPhoto src="/images/banners/hunter-leather.webp" widths={[320]} alt="" loading="lazy" /></span></a></li>
                  <li><a className="range__item" href="#" data-key="gifts" data-img="4" data-label="Gifts under £30" data-desc="Gift-boxed wallets and card holders, ready to give."><span className="range__num">05</span><span className="range__text"><span className="range__name">Gifts Under £30</span><span className="range__note">Gift-boxed and ready to give</span></span><span className="range__go" aria-hidden="true"><svg className="icon icon--sm"><use href="#i-arrow" /></svg></span><span className="range__thumb"><ProductPhoto src="/images/banners/gifts-under.webp" widths={[320]} alt="" loading="lazy" /></span></a></li>
                </ol>
                <a className="link range__all" href="#bestsellers"><span className="roll"><span>View the full collection</span></span><span className="arw" aria-hidden="true"><svg><use href="#i-arrow" /></svg><svg><use href="#i-arrow" /></svg></span></a>
              </div>
            </div>
          </div>
        </section>

        {/* ============ LEATHER GUIDE (vertical carousel, after Soletrader's guide; copy from morucha.co.uk/pages/about) ============ */}
        <section className="lg" id="leathers" aria-labelledby="lg-title" data-lguide>
          <div className="lg__content">
            <div className="lg__inner">
              <header className="lg__head">
                <p className="eyebrow eyebrow--bright">The leather guide</p>
                <h2 className="lg__title" id="lg-title" data-split="words">A UK leather specialist, for every day.</h2>
              </header>

              <ol className="lg__items" role="tablist" aria-orientation="vertical" aria-label="About Morucha">
                <li className="lg-item is-active">
                  <button className="lg-item__head" type="button" role="tab" id="lg-tab-0" aria-selected="true" aria-controls="lg-panel-0">
                    <span className="lg-item__num">01</span><span className="lg-item__name">What we make</span>
                  </button>
                  <div className="lg-item__body" id="lg-panel-0" role="tabpanel" aria-labelledby="lg-tab-0">
                    <div className="lg-item__clip">
                      <p className="lg-item__kicker">Wallets &middot; Purses &middot; Card holders &middot; Travel bags</p>
                      <p className="lg-item__text">Quality leather wallets for men, purses for women, card holders and travel bags, in a huge variety of colours, shapes and sizes, for everyday use or a special moment.</p>
                      <dl className="lg-item__facts">
                        <div><dt>For</dt><dd>Men &amp; women</dd></div>
                        <div><dt>Leathers</dt><dd>Soft, Nappa, Hunter</dd></div>
                        <div><dt>Range</dt><dd>Always growing</dd></div>
                      </dl>
                      <a className="link link--light" href="#range"><span className="roll"><span>Explore the range</span></span><span className="arw" aria-hidden="true"><svg><use href="#i-arrow" /></svg><svg><use href="#i-arrow" /></svg></span></a>
                    </div>
                  </div>
                </li>
                <li className="lg-item">
                  <button className="lg-item__head" type="button" role="tab" id="lg-tab-1" aria-selected="false" aria-controls="lg-panel-1" tabIndex="-1">
                    <span className="lg-item__num">02</span><span className="lg-item__name">How we work</span>
                  </button>
                  <div className="lg-item__body" id="lg-panel-1" role="tabpanel" aria-labelledby="lg-tab-1">
                    <div className="lg-item__clip">
                      <p className="lg-item__kicker">Fair prices &middot; Fast dispatch &middot; Real help</p>
                      <p className="lg-item__text">It isn't just about quality at a fair price. Everything leaves us the same or next working day after you order, and we aim to answer every question within 24 hours.</p>
                      <dl className="lg-item__facts">
                        <div><dt>Dispatch</dt><dd>Same or next day</dd></div>
                        <div><dt>Replies</dt><dd>Within 24 hours</dd></div>
                        <div><dt>Delivery</dt><dd>Free worldwide</dd></div>
                      </dl>
                      <a className="link link--light" href="https://www.morucha.co.uk/policies/shipping-policy"><span className="roll"><span>Delivery &amp; returns</span></span><span className="arw" aria-hidden="true"><svg><use href="#i-arrow" /></svg><svg><use href="#i-arrow" /></svg></span></a>
                    </div>
                  </div>
                </li>
                <li className="lg-item">
                  <button className="lg-item__head" type="button" role="tab" id="lg-tab-2" aria-selected="false" aria-controls="lg-panel-2" tabIndex="-1">
                    <span className="lg-item__num">03</span><span className="lg-item__name">Who we make it for</span>
                  </button>
                  <div className="lg-item__body" id="lg-panel-2" role="tabpanel" aria-labelledby="lg-tab-2">
                    <div className="lg-item__clip">
                      <p className="lg-item__kicker">Customers worldwide &middot; Retailers welcome</p>
                      <p className="lg-item__text">For over five years we have sold tens of thousands of wallets to happy customers around the world. Can't find what you're after, or want to stock Morucha in your shop? Tell us.</p>
                      <dl className="lg-item__facts">
                        <div><dt>In business</dt><dd>5+ years</dd></div>
                        <div><dt>Wallets sold</dt><dd>Tens of thousands</dd></div>
                        <div><dt>Trade</dt><dd>Welcome</dd></div>
                      </dl>
                      <a className="link link--light" href="mailto:sales@morucha.co.uk"><span className="roll"><span>sales@morucha.co.uk</span></span><span className="arw" aria-hidden="true"><svg><use href="#i-arrow" /></svg><svg><use href="#i-arrow" /></svg></span></a>
                    </div>
                  </div>
                </li>
              </ol>

              <div className="lg__nav">
                <button className="lg__btn lg__btn--up" type="button" aria-label="Previous" data-lg-prev><svg className="icon"><use href="#i-chev-down" /></svg></button>
                <span className="lg__track" aria-hidden="true"><span></span></span>
                <button className="lg__btn" type="button" aria-label="Next" data-lg-next>
                  <svg className="lg__ring" viewBox="0 0 50 50" aria-hidden="true"><circle cx="25" cy="25" r="23" /></svg>
                  <svg className="icon"><use href="#i-chev-down" /></svg>
                </button>
              </div>
            </div>
          </div>

          <div className="lg__visual" aria-hidden="true" data-lg-visual>
            <figure className="lg-slide is-active">
              <img className="lg-slide__bg" src={"https://images.unsplash.com/photo-1716295177956-420a647c83ac?auto=format&fit=crop&w=1400&h=1600&q=75"} alt="" loading="lazy" />
              <span className="lg-slide__label">Wallets, purses &amp; card holders</span>
              <div className="lg-slide__card"><div className="lg-slide__tilt">
                <span className="lg-slide__img"><ProductPhoto src="/images/products/morucha-men-s-rfid-blocking-leather-wallet-genuine-soft-leather-bifold-with-coin-pocket-id-windows-m-2028/03.webp" sizes="(max-width: 700px) 60vw, 360px" alt="" loading="lazy" /></span>
                <span className="lg-slide__meta"><span>{"MORUCHA Men’s RFID Blocking Leather Wallet – Genuine Soft Leather Bifold with Coin Pocket & ID Windows M-2028"}</span><span>£29.99</span></span>
              </div></div>
            </figure>
            <figure className="lg-slide">
              <img className="lg-slide__bg" src={"https://images.unsplash.com/photo-1787243293233-92f3188cde4b?auto=format&fit=crop&w=1400&h=1600&q=75"} alt="" loading="lazy" />
              <span className="lg-slide__label">Same or next-day dispatch</span>
              <div className="lg-slide__card"><div className="lg-slide__tilt">
                <span className="lg-slide__img"><ProductPhoto src="/images/products/mens-rfid-nappa-leather-billfold-wallet/01.webp" sizes="(max-width: 700px) 60vw, 360px" alt="" loading="lazy" /></span>
                <span className="lg-slide__meta"><span>Mens RFID Nappa Leather Billfold Wallet Black</span><span>£24.99</span></span>
              </div></div>
            </figure>
            <figure className="lg-slide">
              <img className="lg-slide__bg" src={"https://images.unsplash.com/photo-1571829604981-ea159f94e5ad?auto=format&fit=crop&w=1400&h=1600&q=75"} alt="" loading="lazy" />
              <span className="lg-slide__label">Loved worldwide</span>
              <div className="lg-slide__card"><div className="lg-slide__tilt">
                <span className="lg-slide__img"><ProductPhoto src="/images/products/mens-rfid-hunter-leather-billfold-wallet/01.webp" sizes="(max-width: 700px) 60vw, 360px" alt="" loading="lazy" /></span>
                <span className="lg-slide__meta"><span>Mens RFID Oiled Hunter Leather Billfold Wallet Brown</span><span>£24.99</span></span>
              </div></div>
            </figure>
            <p className="lg__bignum"><span data-lg-big>01</span><small>/ 03</small></p>
          </div>
        </section>

        {/* ============ EDITORIAL PAIR ============ */}
        <section className="pair" aria-label="Featured edits">
          <div className="container pair__grid">
            <a className="pair__item" href="#bestsellers" data-tab-link="men">
              <span className="pair__media" data-reveal-img><img src={"https://images.unsplash.com/photo-1473917991582-70a1006023f1?auto=format&fit=crop&w=1100&h=1300&q=75"} alt="Man standing on a platform as a train rushes past" data-parallax /></span>
              <span className="pair__caption">Made for the daily commute.</span>
              <span className="btn btn--dark"><span className="roll"><span>Shop men's wallets</span></span><span className="arw" aria-hidden="true"><svg><use href="#i-arrow" /></svg><svg><use href="#i-arrow" /></svg></span></span>
            </a>
            <a className="pair__item" href="#bestsellers" data-tab-link="women">
              <span className="pair__media" data-reveal-img><img src={"https://images.unsplash.com/photo-1483181957632-8bda974cbc91?auto=format&fit=crop&w=1100&h=1300&q=75"} alt="Woman in sunglasses carrying shopping bags on a weekend afternoon" data-parallax /></span>
              <span className="pair__caption">Made for weekends out.</span>
              <span className="btn btn--dark"><span className="roll"><span>Shop women's purses</span></span><span className="arw" aria-hidden="true"><svg><use href="#i-arrow" /></svg><svg><use href="#i-arrow" /></svg></span></span>
            </a>
          </div>
        </section>

        {/* ============ OUR PROMISE (four debossed seals on oxblood) ============ */}
        <section className="promise" id="journey" aria-labelledby="journey-title">
          <div className="container promise__grid">
            <div className="promise__head">
              <p className="eyebrow eyebrow--bright">Our promise</p>
              <h2 className="promise__title" id="journey-title" data-split="words">Four things, <em>stamped into every order.</em></h2>
              <a className="link link--light" href="https://www.morucha.co.uk/policies/shipping-policy"><span className="roll"><span>Delivery &amp; returns</span></span><span className="arw" aria-hidden="true"><svg><use href="#i-arrow" /></svg><svg><use href="#i-arrow" /></svg></span></a>
            </div>
            <ul className="seals" data-stagger>
              <li className="seal">
                <span className="seal__stamp" aria-hidden="true"><span className="seal__ring"><small>Every wallet</small><strong>Boxed</strong><small>Gift ready</small></span></span>
                <h3 className="seal__title">Gift-boxed</h3>
                <p>Every wallet arrives in a Morucha gift box, ready to give.</p>
              </li>
              <li className="seal">
                <span className="seal__stamp" aria-hidden="true"><span className="seal__ring"><small>Order by</small><strong>3:30</strong><small>Same day</small></span></span>
                <h3 className="seal__title">Same-day dispatch</h3>
                <p>Weekday orders placed before 3:30pm leave us the same day.</p>
              </li>
              <li className="seal">
                <span className="seal__stamp" aria-hidden="true"><span className="seal__ring"><small>Delivery</small><strong>Free</strong><small>Worldwide</small></span></span>
                <h3 className="seal__title">Free worldwide delivery</h3>
                <p>Free delivery on every order, wherever you are.</p>
              </li>
              <li className="seal">
                <span className="seal__stamp" aria-hidden="true"><span className="seal__ring"><small>Returns</small><strong>30</strong><small>Days</small></span></span>
                <h3 className="seal__title">Easy returns</h3>
                <p>Return unused items in their original packaging within 30 days.</p>
              </li>
            </ul>
          </div>
        </section>

        {/* ============ THE MORUCHA CHRONICLE (broadsheet front page) ============ */}
        <section className="chronicle" id="chronicle" aria-labelledby="chronicle-title">
          <div className="container">
            <div className="paper">
              <div className="paper__top">
                <p className="paper__ear"><small>Today's forecast</small>Fair, with a slow patina developing by evening.</p>
                <h2 className="paper__title" id="chronicle-title">The Morucha Chronicle</h2>
                <p className="paper__ear"><small>Price: free</small>Delivered worldwide, gift-boxed.</p>
              </div>
              <div className="paper__rule">
                <span>Vol. I &middot; No. 01</span><span>Notes on leather, gifting &amp; everyday carry</span><span data-today>Autumn 2026</span>
              </div>
              <div className="paper__cols">
                <article className="story story--lead">
                  <p className="story__kicker">The big read</p>
                  <h3 className="story__title"><a href="#">Why your next wallet should block RFID</a></h3>
                  <p className="story__deck">Contactless is quick. So is skimming. A thin shielding layer keeps your card details to yourself, without adding bulk.</p>
                  <figure className="story__fig">
                    <a className="story__media" href="#"><ProductPhoto src="/images/banners/crafted-with.webp" widths={[1600]} alt="A Morucha wallet being made by hand" loading="lazy" /></a>
                    <figcaption>Every Morucha wallet carries a shielding layer between its leather and lining.</figcaption>
                  </figure>
                  <div className="story__body">
                    <p><span className="story__drop">T</span>ap a card and the payment is done before the receipt prints. The same chip that makes that possible answers to any reader held close enough, which is why so many people now look for RFID protection in a wallet.</p>
                    <p>The fix is simple: a fine shielding layer stitched in behind the leather. It blocks the 13.56&nbsp;MHz signal that contactless cards use, so your cards only work when you take them out. It adds no noticeable thickness, and it is in every wallet we make.</p>
                  </div>
                </article>
                <div className="paper__side">
                  <article className="story story--brief">
                    <a className="story__media" href="#"><ProductPhoto src="/images/banners/leather-pieces.webp" widths={[1600]} alt="Pieces of cut leather on a table" loading="lazy" /></a>
                    <div>
                      <p className="story__kicker">Care guide</p>
                      <h3 className="story__title story__title--sm"><a href="#">Five ways to keep leather looking its best</a></h3>
                      <p className="story__text">Wipe, rest, condition, keep it dry and don't overfill. Small habits that add years.</p>
                    </div>
                  </article>
                  <article className="story story--brief">
                    <a className="story__media" href="#"><ProductPhoto src="/images/banners/gifts-under.webp" widths={[640, 960]} sizes="200px" alt="Grey Morucha wallet beside its gift box" loading="lazy" /></a>
                    <div>
                      <p className="story__kicker">Gift guide</p>
                      <h3 className="story__title story__title--sm"><a href="#">Thoughtful presents under £30</a></h3>
                      <p className="story__text">Card holders, slim wallets and purses that arrive boxed and ready to give.</p>
                    </div>
                  </article>
                  <div className="classified">
                    <p className="classified__label">Classified</p>
                    <p className="classified__title">Wanted: a wallet that lasts</p>
                    <p className="classified__text">Genuine leather, RFID lined, gift-boxed. Apply within.</p>
                    <a className="link" href="#"><span className="roll"><span>Read all stories</span></span><span className="arw" aria-hidden="true"><svg><use href="#i-arrow" /></svg><svg><use href="#i-arrow" /></svg></span></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ NEWSLETTER (the Morucha letter) ============ */}
        <section className="news" aria-labelledby="news-title">
          <div className="news__media">
            <ProductPhoto src="/images/banners/new-season.webp" widths={[1600]} alt="New-season Morucha leather wallets in fresh colours" loading="lazy" />
            <span className="news__tag">New this season</span>
          </div>
          <div className="news__body">
            <p className="eyebrow">The Morucha letter</p>
            <h2 className="news__title" id="news-title" data-split="words">See every new colour <em>before the shop does.</em></h2>
            <p className="news__lede">Join the list for first access to new styles, our seasonal gift guides and the occasional offer kept for members.</p>
            <ol className="news__perks">
              <li><span>01</span>Early access</li>
              <li><span>02</span>Gift guides</li>
              <li><span>03</span>Members' offers</li>
            </ol>
            <form className="news__form" data-newsletter noValidate>
              <label className="news__field" htmlFor="news-email">
                <span>Email address</span>
                <input id="news-email" type="email" name="email" placeholder="you@example.com" autoComplete="email" required />
              </label>
              <button className="btn btn--red" type="submit"><span className="roll"><span>Join the list</span></span><span className="arw" aria-hidden="true"><svg><use href="#i-arrow" /></svg><svg><use href="#i-arrow" /></svg></span></button>
            </form>
            <p className="news__msg" data-newsletter-msg>No spam. Unsubscribe whenever you like.</p>
          </div>
        </section>

      </main>

      {/* ============ FOOTER ============ */}
      <footer className="footer">
        <div className="container">
          <div className="footer__top">
            <div className="footer__about">
              <p className="footer__heading">About Morucha</p>
              <p>A British brand specialising in genuine leather wallets, purses and card holders &mdash; every one RFID protected, gift-boxed and dispatched fast.</p>
              <a className="footer__mail" href="mailto:sales@morucha.co.uk"><svg className="icon icon--sm"><use href="#i-mail" /></svg>sales@morucha.co.uk</a>
            </div>
            <nav className="footer__col" aria-label="Shop">
              <p className="footer__heading">Shop</p>
              <ul>
                <li><a className="roll" href="#"><span>Men's Wallets</span></a></li>
                <li><a className="roll" href="#"><span>Women's Purses</span></a></li>
                <li><a className="roll" href="#"><span>Card Holders</span></a></li>
                <li><a className="roll" href="#leathers"><span>Hunter Leather</span></a></li>
                <li><a className="roll" href="#"><span>Gifts Under £30</span></a></li>
              </ul>
            </nav>
            <nav className="footer__col" aria-label="Help">
              <p className="footer__heading">Help</p>
              <ul>
                <li><a className="roll" href="https://www.morucha.co.uk/policies/shipping-policy"><span>Delivery &amp; Shipping</span></a></li>
                <li><a className="roll" href="https://www.morucha.co.uk/policies/refund-policy"><span>Returns &amp; Refunds</span></a></li>
                <li><a className="roll" href="#"><span>FAQs</span></a></li>
                <li><a className="roll" href="https://www.morucha.co.uk/pages/contact-us"><span>Contact Us</span></a></li>
              </ul>
            </nav>
            <nav className="footer__col" aria-label="Company">
              <p className="footer__heading">Company</p>
              <ul>
                <li><a className="roll" href="https://www.morucha.co.uk/pages/about"><span>About</span></a></li>
                <li><a className="roll" href="#"><span>Wholesale</span></a></li>
                <li><a className="roll" href="https://www.morucha.co.uk/policies/terms-of-service"><span>Terms</span></a></li>
                <li><a className="roll" href="https://www.morucha.co.uk/policies/privacy-policy"><span>Privacy</span></a></li>
              </ul>
            </nav>
          </div>
          <p className="footer__word" data-split="chars" aria-hidden="true">MORUCHA</p>
          <div className="footer__bottom">
            <p>&copy; <span data-year>2026</span> Morucha, a division of RAS Trading Europe Limited.</p>
            <div className="socials">
              <a href="#" aria-label="Instagram"><svg className="icon"><use href="#i-instagram" /></svg></a>
              <a href="#" aria-label="Facebook"><svg className="icon"><use href="#i-facebook" /></svg></a>
              <a href="#" aria-label="Pinterest"><svg className="icon"><use href="#i-pinterest" /></svg></a>
            </div>
            <ul className="payments" aria-label="Accepted payment methods">
              <li><img src={`${base}/morucha/img/payments/visa.svg`} alt="Visa" width="40" height="25" loading="lazy" /></li>
              <li><img src={`${base}/morucha/img/payments/mastercard.svg`} alt="Mastercard" width="40" height="25" loading="lazy" /></li>
              <li><img src={`${base}/morucha/img/payments/amex.svg`} alt="American Express" width="40" height="25" loading="lazy" /></li>
              <li><img src={`${base}/morucha/img/payments/paypal.svg`} alt="PayPal" width="40" height="25" loading="lazy" /></li>
              <li><img src={`${base}/morucha/img/payments/applepay.svg`} alt="Apple Pay" width="40" height="25" loading="lazy" /></li>
              <li><img src={`${base}/morucha/img/payments/googlepay.svg`} alt="Google Pay" width="40" height="25" loading="lazy" /></li>
            </ul>
          </div>
        </div>
      </footer>

      {/* ============ MOBILE MENU ============ */}
      <aside className="drawer drawer--left" id="menu" aria-label="Menu" aria-hidden="true" data-drawer="menu">
        <div className="drawer__head">
          <img className="drawer__logo" src="https://www.morucha.co.uk/cdn/shop/files/MORUCHA_250x.jpg?v=1614291159" alt="Morucha" width="94" height="60" />
          <button className="icon-btn" type="button" aria-label="Close menu" data-close><svg className="icon"><use href="#i-close" /></svg></button>
        </div>
        <nav className="drawer__body m-nav" aria-label="Mobile">
          <a href="#range" data-close data-range-link="men"><span>Men</span><sup>01</sup></a>
          <a href="#range" data-close data-range-link="women"><span>Women</span><sup>02</sup></a>
          <a href="#range" data-close data-range-link="cards"><span>Card Holders</span><sup>03</sup></a>
          <a href="#leathers" data-close><span>Hunter Leather</span><sup>04</sup></a>
          <a href="#range" data-close data-range-link="gifts"><span>Gifts</span><sup>05</sup></a>
          <a href="#journey" data-close><span>Our Promise</span><sup>06</sup></a>
          <a href="#chronicle" data-close><span>Journal</span><sup>07</sup></a>
          <div className="m-nav__extra">
            <a href="#"><svg className="icon icon--sm"><use href="#i-user" /></svg>My account</a>
            <a href="mailto:sales@morucha.co.uk"><svg className="icon icon--sm"><use href="#i-mail" /></svg>sales@morucha.co.uk</a>
          </div>
        </nav>
      </aside>

      {/* ============ CART DRAWER ============ */}
      <aside className="drawer drawer--right" id="cart" aria-label="Shopping bag" aria-hidden="true" data-drawer="cart">
        <div className="drawer__head">
          <p className="drawer__title">Your bag <span data-cart-heading-count></span></p>
          <button className="icon-btn" type="button" aria-label="Close bag" data-close><svg className="icon"><use href="#i-close" /></svg></button>
        </div>
        <div className="cart__ship"><svg className="icon icon--sm"><use href="#i-truck" /></svg><span>You qualify for <strong>free worldwide delivery</strong></span></div>
        <div className="drawer__body cart__items" data-cart-items></div>
        <div className="cart__foot" data-cart-foot>
          <div className="cart__row"><span>Subtotal</span><strong data-cart-subtotal>£0.00</strong></div>
          <p className="cart__note">Taxes included. Delivery calculated at checkout.</p>
          <a className="btn btn--dark btn--block" href="#"><span className="roll"><span>Checkout</span></span><span className="arw" aria-hidden="true"><svg><use href="#i-arrow" /></svg><svg><use href="#i-arrow" /></svg></span></a>
          <button className="cart__continue" type="button" data-close>Continue shopping</button>
        </div>
      </aside>

      {/* ============ SEARCH ============ */}
      <div className="search" id="search" aria-hidden="true" data-drawer="search" role="dialog" aria-label="Search">
        <div className="container search__inner">
          <form className="search__form" role="search">
            <svg className="icon"><use href="#i-search" /></svg>
            <label className="sr-only" htmlFor="search-input">Search products</label>
            <input id="search-input" type="search" placeholder="What are you looking for?" autoComplete="off" />
            <button className="icon-btn" type="button" aria-label="Close search" data-close><svg className="icon"><use href="#i-close" /></svg></button>
          </form>
          <div className="search__popular">
            <span className="eyebrow">Popular</span>
            <a href="#">Bifold wallet</a><a href="#">Hunter leather</a><a href="#">Card holder</a><a href="#">Clutch purse</a>
          </div>
        </div>
      </div>

      <div className="overlay" data-overlay hidden></div>
      <div className="toast" role="status" aria-live="polite" data-toast></div>
    </>
  );
}
