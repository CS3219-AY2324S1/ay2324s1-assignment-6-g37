import styles from "./Button.module.css";

function syncQotd() {

}

const SyncQotdButton = () => {
  return (
    <button
      className={styles.action_button}
      onClick={syncQotd}
    >
      Sync QOTD
    </button>
  );
}

export default SyncQotdButton;
