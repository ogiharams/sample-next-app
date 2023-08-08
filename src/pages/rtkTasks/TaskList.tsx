import { useEffect } from "react";
import styles from "./TaskItem.module.css";
import { TaskItem } from "./TaskItem";
import { useSelector, useDispatch } from "react-redux";
import { selectTasks } from "../../stores/slices/rtkTaskTask/taskSlice";
import { fetchAsyncGet } from "../../stores/slices/rtkTaskTask/taskSlice";
import { fetchAsyncProf } from "../../stores/slices/rtkTaskLogin/loginSlice";
import { AppDispatch } from "../../stores/store";

interface task {
  id: number;
  title: string;
  create_at: string;
  update_at: string;
}

export const TaskList = () => {
  const tasks = useSelector(selectTasks);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const fetchTaskProf = async () => {
      await dispatch(fetchAsyncGet());
      await dispatch(fetchAsyncProf());
    };
    fetchTaskProf();
  }, [dispatch]);

  return (
    <>
      <div>
        <ul className={styles.taskList}>
          {tasks.map((task: task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </ul>
      </div>
    </>
  );
};
