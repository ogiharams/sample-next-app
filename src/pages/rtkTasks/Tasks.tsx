import { TaskList } from "../rtkTasks/TaskList";
import styles from "./Task.module.css";
import { FaSignInAlt } from "react-icons/fa";
import { TaskDetails } from "./TaskDetails";
import { TaskInput } from "./TaskInput";
import { Header } from "./Header";

const Task = () => {
  const Logout = () => {
    localStorage.removeItem("localJWT");
    window.location.href = "/rtkTasks";
  };
  return (
    <>
      <div className={styles.containerTasks}>
        <div className={styles.appTasks}>
          <button onClick={Logout} className={styles.signBtn}>
            <FaSignInAlt />
          </button>
          <Header />
          <TaskInput />
          <TaskList />
        </div>
        <div className={styles.appDetails}>
          <TaskDetails />
        </div>
      </div>
    </>
  );
};

export default Task;
