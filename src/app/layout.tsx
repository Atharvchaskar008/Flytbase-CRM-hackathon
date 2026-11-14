import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'FlytBase CSM Command Center | Account Quest',
  description: 'Enterprise Customer Success & Risk Intelligence CRM for Autonomous Drone Docks',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable} font-sans`}>
      <body className="antialiased font-sans transition-colors min-h-screen">
        {children}
      </body>
    </html>
  );
}
