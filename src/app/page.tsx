import { FiCalendar, FiUser } from 'react-icons/fi';
import Link from 'next/link';

import { Header } from '../components/Header'

import styles from './page.module.scss';

export default function Home() {
  return (
    <>
      <Header />
      <main className={styles.content}>
        <div className={styles.list}>
          <Link href="/" legacyBehavior>
            <a className={styles.post}>
              <h1>Como utilizar Hooks</h1>
              <p>Pensando em sincronizar em vez de ciclos de vida</p>
              <div>
                <div className={styles.iconName}>
                  <FiCalendar />
                  <time>13 de maio de 2023</time>
                </div>
                <div className={styles.iconName}>
                  <FiUser />
                  <time>Rogerinho</time>
                </div>
              </div>
            </a>
          </Link>
          <div className={styles.post}>
            <h1>Como utilizar Hooks</h1>
            <p>Pensando em sincronizar em vez de ciclos de vida</p>
            <div>
              <div className={styles.iconName}>
                <FiCalendar />
                <time>13 de maio de 2023</time>
              </div>
              <div className={styles.iconName}>
                <FiUser />
                <time>Rogerinho</time>
              </div>
            </div>
          </div>
          <div className={styles.post}>
            <h1>Como utilizar Hooks</h1>
            <p>Pensando em sincronizar em vez de ciclos de vida</p>
            <div>
              <div className={styles.iconName}>
                <FiCalendar />
                <time>13 de maio de 2023</time>
              </div>
              <div className={styles.iconName}>
                <FiUser />
                <p>Rogerinho</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
