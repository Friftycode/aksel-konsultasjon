import Logo from './Logo.tsx';
import DarksideButton from './DarksideButton.tsx';
import styles from './Header.module.less';

const Header = ({
  theme,
  setTheme,
}: {
  theme: 'dark' | 'light';
  setTheme: (value: 'dark' | 'light') => void;
}) => {
  return (
    <header className={styles.headerContainer}>
      <Logo />
      <DarksideButton theme={theme} setTheme={setTheme} />
    </header>
  );
};

export default Header;
