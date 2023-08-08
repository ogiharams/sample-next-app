import { useState } from "react";
import { useDispatch } from "react-redux";
import { newTask } from "../../stores/slices/task/taskSlice";

export const TaskIput = () => {
  const dispatch = useDispatch();
  const [editTitle, setEditTitle] = useState("");

  const handleTitleChange = (e) => {
    console.log(e.target.value);
    setEditTitle(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(newTask(editTitle));
    setEditTitle("");
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={handleTitleChange}
          value={editTitle}
          placeholder="Please type in"
        />
      </form>
      <button onClick={handleSubmit}>NEW</button>
    </>
  );
};
