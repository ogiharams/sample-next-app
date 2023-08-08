import { useSelector, useDispatch } from "react-redux";
import {
  editTask,
  fetchAsyncCreate,
  fetchAsyncUpdate,
  selectEditedTask,
} from "../../stores/slices/rtkTaskTask/taskSlice";
import styles from "./TaskInput.module.css";
import Button from "@material-ui/core/Button";
import { AppDispatch } from "../../stores/store";

export const TaskInput = () => {
  const dispatch: AppDispatch = useDispatch();
  const editedTask = useSelector(selectEditedTask);

  const handleChange = (e) => {
    console.log(e);
    editedTask.id === 0
      ? dispatch(editTask({ id: 0, title: e.target.value }))
      : dispatch(editTask({ id: editedTask.id, title: e.target.value }));
  };

  //
  const isDisabled = editedTask.title.length === 0;

  const createClicked = () => {
    dispatch(fetchAsyncCreate(editedTask));
    dispatch(editTask({ id: 0, title: "" }));
  };
  const updateClicked = () => {
    dispatch(fetchAsyncUpdate(editedTask));
    dispatch(editTask({ id: 0, title: "" }));
  };

  return (
    <>
      <input
        type="text"
        className={styles.taskInput}
        onChange={handleChange}
        value={editedTask.title}
        placeholder="Please input task"
      />
      <div className={styles.switch}>
        {editedTask.id === 0 ? (
          <Button
            variant="contained"
            disabled={isDisabled}
            onClick={createClicked}
            color="primary"
          >
            Create
          </Button>
        ) : (
          <Button
            variant="contained"
            disabled={isDisabled}
            onClick={updateClicked}
            color="primary"
          >
            Update
          </Button>
        )}
      </div>
    </>
  );
};
