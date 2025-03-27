import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ApplicationProvider } from '@/context/ApplicationContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Job Tracker',
  description: 'Track your job applications and interviews',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ApplicationProvider>
          {children}
        </ApplicationProvider>
      </body>
    </html>
  );
}
