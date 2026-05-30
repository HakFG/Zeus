import type { Metadata, Viewport } from 'next';
import { Cinzel, Cinzel_Decorative, Outfit } from 'next/font/google';
import ZeusSky from '@/components/ZeusSky';
import './globals.css';

const cinzelDecorative = Cinzel_Decorative({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--loaded-display',
  display: 'swap',
});

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '600', '700', '900'],
  variable: '--loaded-heading',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--loaded-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Zeus — Finanças Pessoais',
  description: 'Seu assistente financeiro divino',
  icons: { icon: '/favicon.ico' },
};

export const viewport: Viewport = {
  themeColor: '#080d1a',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${cinzelDecorative.variable} ${cinzel.variable} ${outfit.variable}`}
    >
      <body>
        <ZeusSky />
        <div className="app-container">
          {children}
        </div>
      </body>
    </html>
  );
}