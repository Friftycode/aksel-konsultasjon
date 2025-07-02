import styles from './MainPage.module.less';

const MainPage = () => {
  return (
    <main className={styles.pageContainer}>
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>Få en samtale med rådgiver</h1>
        <p className={styles.titleDescription}>
          Du kan få en samtale med en rådgiver for veiledning om arbeid,
          utdanning eller andre valg knyttet til din situasjon. Tilbudet er
          gratis og tilpasses dine behov.
        </p>
      </div>
      <form className={styles.form}>
        <h2>Avtal tid med en rådgiver</h2>
        <p>
          Fyll ut skjemaet under for å avtale en tid med en rådgiver. Du vil
          motta en bekreftelse på e-post etter at du har sendt inn skjemaet.
        </p>
      </form>
    </main>
  );
};

export default MainPage;
