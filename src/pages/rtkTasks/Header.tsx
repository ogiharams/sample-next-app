import { useSelector } from "react-redux";
import { selectProfile } from "../../stores/slices/rtkTaskLogin/loginSlice";
import styles from "./Header.module.css";

export const Header = () => {
  const profile = useSelector(selectProfile);
  console.log(profile);
  return (
    <>
      <div>
        <h3 className={styles.h3}>{profile.username}</h3>
        <h1 className={styles.h1}>Today's task</h1>
      </div>
    </>
  );
};
