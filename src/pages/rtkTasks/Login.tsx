import Button from "@material-ui/core/Button";
import { useSelector, useDispatch } from "react-redux";
import {
  editPassword,
  editUsername,
  fetchAsyncLogin,
  fetchAsyncRegister,
  selectAuthen,
  selectLoginView,
  toggleMode,
} from "../../stores/slices/rtkTaskLogin/loginSlice";
import styles from "./Login.module.css";

export const Login = () => {
  const dispatch = useDispatch();
  const authen = useSelector(selectAuthen);
  const isLoginView = useSelector(selectLoginView);
  const btnDisabler = authen.username === "" || authen.password === "";

  const login = async () => {
    // isLoginViewがtrueの時はログイン、falseの時はユーザー作成する
    if (isLoginView) {
      // ユーザー名とPWを渡すとjwtトークン取得
      console.log(authen);
      dispatch(fetchAsyncLogin(authen));
    } else {
      // 入力したユーザー名とPWで新規ユーザー作成
      const result = await dispatch(fetchAsyncRegister(authen));
      // 正常終了したらログイン
      if (fetchAsyncRegister.fulfilled.match(result)) {
        await dispatch(fetchAsyncLogin(authen));
      }
    }
  };

  return (
    <>
      <div className={styles.containerLogin}>
        <div className={styles.appLogin}>
          <h1 className={styles.h1}>{isLoginView ? "Login" : "Register"}</h1>
          <span className={styles.span}>Username</span>
          <input
            type="text"
            className={styles.inputLog}
            name="username"
            placeholder=""
            onChange={(e) => dispatch(editUsername(e.target.value))}
            required
          />
          <span className={styles.span}>Password</span>
          <input
            type="password"
            className={styles.inputLog}
            name="password"
            placeholder=""
            onChange={(e) => dispatch(editPassword(e.target.value))}
            required
          />
          <div className={styles.switch}>
            <Button
              variant="contained"
              disabled={btnDisabler}
              color="primary"
              onClick={login}
            >
              {isLoginView ? "Login" : "Create"}
            </Button>
          </div>
          <span
            className={styles.switchText}
            onClick={() => dispatch(toggleMode())}
          >
            {isLoginView ? "Create Accont ?" : "Back to Login"}
          </span>
        </div>
      </div>
    </>
  );
};

// export default Login;
