import type { Metadata } from 'next';
import { Inter_Tight } from 'next/font/google';
import './globals.css';
import { ContactModalProvider } from '@/components/providers/contact-modal-provider';
import { SmoothScroll } from '@/components/providers/smooth-scroll';
import { ThemeProvider, themeScript } from '@/components/providers/theme-provider';

// Neo-grotesque with a Helvetica-like skeleton — holds up at 240px display sizes.
const grotesk = Inter_Tight({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-grotesk',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Sudhersun — Portfolio',
  description: 'Strategy, design and performance for brands that intend to be remembered.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={grotesk.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <ThemeProvider>
          <SmoothScroll>
            <ContactModalProvider>{children}</ContactModalProvider>
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
