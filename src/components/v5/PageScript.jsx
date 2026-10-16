'use client';

import { useEffect } from 'react';

// Loads a page's original vanilla-JS file once, after React has hydrated the markup,
// so the script's DOM work (split text, sliders, cart) never clashes with hydration.
export default function PageScript({ src }) {
  useEffect(() => {
    if (document.querySelector(`script[data-page-script="${src}"]`)) return; // StrictMode runs effects twice in dev
    const blockSubmit = (e) => { if (e.target.matches('form[role="search"]')) e.preventDefault(); };
    document.addEventListener('submit', blockSubmit);
    const script = document.createElement('script');
    script.src = src;
    script.dataset.pageScript = src;
    document.body.appendChild(script);
    return () => document.removeEventListener('submit', blockSubmit);
  }, [src]);

  return null;
}
