import Form from '../components/Form';
import Conversation from '../assets/conversation.png';
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
        <img
          className={styles.conversationImage}
          src={Conversation}
          alt="Samtale med rådgiver"
        />
        <Form />
      </div>
    </main>
  );
};

export default MainPage;
