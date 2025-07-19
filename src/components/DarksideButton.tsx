import { Button } from '@navikt/ds-react';
import { MoonIcon, SunIcon } from '@navikt/aksel-icons';

const DarksideButton = ({
  theme,
  setTheme,
}: {
  theme: 'dark' | 'light';
  setTheme: (value: 'dark' | 'light') => void;
}) =>
  theme === 'dark' ? (
    <Button
      variant="tertiary-neutral"
      icon={<SunIcon title="Switch to light theme" />}
      onClick={() => {
        setTheme('light');
      }}
    />
  ) : (
    <Button
      variant="tertiary-neutral"
      icon={<MoonIcon title="Switch to dark theme" />}
      onClick={() => {
        setTheme('dark');
      }}
    />
  );

export default DarksideButton;
