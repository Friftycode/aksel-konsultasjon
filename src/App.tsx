import Header from './components/Header';
import MainPage from './page/MainPage';
import { Theme } from '@navikt/ds-react/Theme';
import '@navikt/ds-css/darkside';
import { useState } from 'react';

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  return (
    <>
      <Theme theme={theme}>
        <Header theme={theme} setTheme={setTheme} />
        <MainPage />
      </Theme>
    </>
  );
}

export default App;
