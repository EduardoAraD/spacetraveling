import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'

import { Header } from '../components/Header';
import '../styles/global.scss';

const inter = Inter({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-inter'
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={inter.className}>
      <Header />
      <Component {...pageProps} />
    </main>
  )
}
