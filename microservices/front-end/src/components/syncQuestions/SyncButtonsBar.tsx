import SyncQotdButton from "./SyncQotdButton";
import SyncSampleQuestionsButton from "./SyncSampleQuestionsButton";

import styles from "./Button.module.css";
import { useState } from "react";

type SyncButtonsBarProps = {
  onSync: () => void
}

const SyncButtonsBar = ({onSync}: SyncButtonsBarProps) => {
  const [messageToUser, setMessageToUser] = useState('');

  return (
    <div className={styles.button_container}>
      <div>
        <SyncQotdButton
          setMessageToUser={setMessageToUser}
          onSync={onSync}
        />                
        <SyncSampleQuestionsButton
          setMessageToUser={setMessageToUser}
          onSync={onSync}
        />
      </div>
      { messageToUser }
    </div>
  );
}

export default SyncButtonsBar;
