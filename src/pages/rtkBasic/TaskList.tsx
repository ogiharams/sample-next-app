import { useSelector } from "react-redux";
import { selectTasks } from "../../stores/slices/task/taskSlice";
import { TaskItem } from "./TaskItem";

export const TaskList = () => {
  const tasks = useSelector(selectTasks);
  console.log(tasks);
  return (
    <>
      <div>
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </div>
    </>
  );
};
