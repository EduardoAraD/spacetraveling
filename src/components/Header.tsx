import Image from 'next/image';

import styles from './Header.module.scss';
import logo from '../assets/logo.svg';

export function Header() {
  return (
    <header className={styles.header}>
      <div>
        <Image src={logo} alt='SpaceTraveling' width={238} height={25} />
      </div>
    </header>
  )
}