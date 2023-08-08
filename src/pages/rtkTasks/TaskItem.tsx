import styles from "./TaskItem.module.css";
import { BsTrash } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { useDispatch } from "react-redux";
import {
  editTask,
  fetchAsyncDelete,
  selectTask,
} from "../../stores/slices/rtkTaskTask/taskSlice";
import { AppDispatch } from "../../stores/store";

export const TaskItem = ({ task }) => {
  const dispatch: AppDispatch = useDispatch();
  return (
    <>
      <li className={styles.listItem}>
        <span
          className={styles.cursor}
          onClick={() => dispatch(selectTask(task))}
        >
          {task.title}
        </span>
        <div>
          <button
            onClick={() => dispatch(fetchAsyncDelete(task.id))}
            className={styles.taskIcon}
          >
            <BsTrash />
          </button>
        </div>
        <div>
          <button
            onClick={() => dispatch(editTask(task))}
            className={styles.taskIcon}
          >
            <FaEdit />
          </button>
        </div>
      </li>
    </>
  );
};
