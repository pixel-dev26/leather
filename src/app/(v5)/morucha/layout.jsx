import './style.css';
import JsFlag from '@/components/v5/JsFlag';
import PageScript from '@/components/v5/PageScript';

export const metadata = {
  title: 'Morucha | Genuine Leather RFID Wallets & Purses',
  description: 'Genuine leather wallets, purses and card holders with built-in RFID protection. Gift-boxed, free worldwide delivery and same-day dispatch before 3:30pm.',
};

export const viewport = { themeColor: '#5b1a1e' };

export default function V5Layout({ children }) {
  return (
    <html lang="en-GB" suppressHydrationWarning>
      <head>
        <JsFlag />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..600;1,6..96,400..600&family=Jost:wght@300;400;500;600&family=Old+Standard+TT:ital,wght@0,400;0,700;1,400&family=UnifrakturMaguntia&display=swap" rel="stylesheet" />
        <link rel="preconnect" href="https://cdn.shopify.com" />
        <link rel="preconnect" href="https://images.unsplash.com" />
      </head>
      {/* browser extensions (e.g. Grammarly) add attributes to <body> before React loads */}
      <body suppressHydrationWarning>
        {children}
        <PageScript src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/morucha/main.js`} />
      </body>
    </html>
  );
}
