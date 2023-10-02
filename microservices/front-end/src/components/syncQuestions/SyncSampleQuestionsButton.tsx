import axios from "axios";
import styles from "./Button.module.css";
import { SyncButtonProps } from "./types";

const MSG_QUESTIONS_SYNCED = "Sample questions synced successfully!";
const MSG_SYNC_ERROR = "An unknown error occured while syncing, please try again later!";

const cloudFunctionUrl = "http://127.0.0.1:5001/peerprep-1c8b3/us-central1/syncSampleQuestions";
const questionsServiceUrl = "127.0.0.1";

const SyncSampleQuestionsButton = ({
  setMessageToUser,
  onSync
}: SyncButtonProps) => {
  const syncQotd = async () => {
    setMessageToUser('');
    try {
      const response = await axios.post(
        cloudFunctionUrl,
        {
            questionsServiceUrl
        }
      );

      if (response.status === 200) {
        setMessageToUser(MSG_QUESTIONS_SYNCED);
        onSync();
      }
    } catch (error: unknown) {
        setMessageToUser(MSG_SYNC_ERROR);
        console.error("sync sample questions error:", error);
    }
  }

  return (
    <button
      className={styles.action_button}
      onClick={syncQotd}
    >
      Sync Sample Questions
    </button>        
  );
}

export default SyncSampleQuestionsButton;
