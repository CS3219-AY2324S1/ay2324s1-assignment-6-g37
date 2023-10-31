import axios from "axios";
import styles from "./Button.module.css";
import { SyncButtonProps } from "./types";

const MSG_QUESTIONS_SYNCED = "Question of the Day synced successfully!";
const MSG_SYNC_ERROR =
  "An unknown error occurred while syncing, please try again later!";

const SyncQotdButton = ({ setMessageToUser, onSync }: SyncButtonProps) => {
  const syncQotd = async () => {
    setMessageToUser("Syncing QOTD...");
    try {
      const response = await axios.post(
        "/peerprep-1c8b3/us-central1/syncQotd",
        {}
      );

      if (response.status === 200) {
        setMessageToUser(MSG_QUESTIONS_SYNCED);
        onSync();
      }
    } catch (error: unknown) {
      setMessageToUser(MSG_SYNC_ERROR);
      console.error("sync QOTD error:", error);
    }
  };

  return (
    <button className={styles.action_button} onClick={syncQotd}>
      Sync QOTD
    </button>
  );
};

export default SyncQotdButton;
