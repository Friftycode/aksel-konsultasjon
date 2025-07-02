import Logo from './Logo.tsx';
import styles from './Header.module.less';

const Header = () => {
  return (
    <header className={styles.headerContainer}>
      <Logo />
    </header>
  );
};

export default Header;
