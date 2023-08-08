import { useSelector } from "react-redux";
import styles from "./TaskDetails.module.css";
import {
  selectSelectedTask,
  selectTask,
} from "../../stores/slices/rtkTaskTask/taskSlice";

export const TaskDetails = () => {
  const selectedTask = useSelector(selectSelectedTask);

  return (
    <>
      <div className={styles.details}>
        {selectedTask.title && (
          <>
            <h2>{selectedTask.title}</h2>
            <p>Created at</p>
            <h3>{selectedTask.created_at}</h3>
            <p>Updated at</p>
            <h3>{selectedTask.updated_at}</h3>
          </>
        )}
      </div>
    </>
  );
};
