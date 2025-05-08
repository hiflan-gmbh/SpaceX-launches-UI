import '@/styles/globals.css';
import styles from '@/styles/Home.module.css';
import { Roboto } from 'next/font/google';

const roboto = Roboto({ subsets: ['latin'], weight: ['300', '400'] });

export const metadata = {
  title: 'SpaceX Launch Tracker',
  description: 'Track SpaceX launches with detailed information.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={roboto.className}>
      <body>
        <header className={styles.header}>
          <h1 className={styles.header__title}>Space X Launch Tracker</h1>
        </header>
        <main className={styles.main}>{children}</main>
      </body>
    </html>
  );
}
