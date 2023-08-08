import { useDispatch } from "react-redux";
import { completeTask, deleteTask } from "../../stores/slices/task/taskSlice";

export const TaskItem = ({ task }) => {
  const dispatch = useDispatch();
  return (
    <div>
      <input
        type="checkbox"
        onClick={() => dispatch(completeTask(task))}
        defaultChecked={task.compteted}
      />
      <span>{task.title}</span>
      <button onClick={() => dispatch(deleteTask(task))}>DELETE</button>
    </div>
  );
};
