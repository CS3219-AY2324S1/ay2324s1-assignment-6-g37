import axios from "axios";
import styles from "./Button.module.css";
import { SyncButtonProps } from "./types";

const MSG_QUESTIONS_SYNCED = "Sample questions synced successfully!";
const MSG_SYNC_ERROR =
  "An unknown error occurred while syncing, please try again later!";

const SyncSampleQuestionsButton = ({
  setMessageToUser,
  onSync,
}: SyncButtonProps) => {
  const syncSampleQuestions = async () => {
    setMessageToUser("Syncing sample questions...");
    try {
      const response = await axios.post(
        "/peerprep-1c8b3/us-central1/syncSampleQuestions",
        {}
      );

      if (response.status === 200) {
        setMessageToUser(MSG_QUESTIONS_SYNCED);
        onSync();
      }
    } catch (error: unknown) {
      setMessageToUser(MSG_SYNC_ERROR);
      console.error("sync sample questions error:", error);
    }
  };

  return (
    <button className={styles.action_button} onClick={syncSampleQuestions}>
      Sync Sample Questions
    </button>
  );
};

export default SyncSampleQuestionsButton;
