import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAsyncGet,
  selectUsers,
} from "../../stores/slices/fetch2/fetch2Slice";

export const Fetch = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  useEffect(() => {
    dispatch(fetchAsyncGet());
  }, [dispatch]);
  return (
    <>
      <div>
        {users.map((user) => (
          <div key={user.id}>{user.email}</div>
        ))}
      </div>
    </>
  );
};
