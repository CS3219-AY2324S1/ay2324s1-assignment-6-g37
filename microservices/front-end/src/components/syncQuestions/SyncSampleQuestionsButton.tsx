import styles from "./Button.module.css";

function SyncSampleQuestions() {

}

const SyncSampleQuestionsButton = () => {
  return (
    <button
      className={styles.action_button}
      onClick={SyncSampleQuestions}
    >
      Sync Sample Questions
    </button>
  );
}

export default SyncSampleQuestionsButton;
