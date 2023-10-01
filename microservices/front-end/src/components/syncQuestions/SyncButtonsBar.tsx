import SyncQotdButton from "./SyncQotdButton";
import SyncSampleQuestionsButton from "./SyncSampleQuestionsButton";

import styles from "./Button.module.css";

const SyncButtonsBar = () => {

  return (
    <div className={styles.button_container}>
      <SyncQotdButton />                
      <SyncSampleQuestionsButton />
    </div>
  );
}

export default SyncButtonsBar;
