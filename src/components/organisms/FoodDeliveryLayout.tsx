import React, { useContext } from "react";
import App from "next/app";
import Head from "next/head";
import { Container, Nav, NavItem } from "reactstrap";
import Link from "next/link";
import AppContext from "../../context/foodDelivery/AppContext";

const FoodDeliveryLayout = (props) => {
  const { userState, setUserState } = useContext(AppContext);
  // console.log("userState", userState);
  return (
    <>
      <Head>
        <title>フードデリバリーサービス</title>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css"
        />
      </Head>
      <header>
        <style jsx>
          {`
            a,
            h5 {
              color: white;
            }
          `}
        </style>
        <Nav className="navbar navbar-dark bg-dark">
          <NavItem>
            <Link href="/foodDelivery">
              <a className="bavbar-brand">ホーム</a>
            </Link>
          </NavItem>
          <NavItem className="ml-auto">
            {/* {Object.values(userState).every((value) => value !== null) ? ( */}
            {userState.username && userState.email !== null ? (
              <Link href="/foodDelivery">
                <a
                  className="nav-link"
                  onClick={() => {
                    setUserState({
                      username: null,
                      email: null,
                      password: null,
                    });
                  }}
                >
                  ログアウト
                </a>
              </Link>
            ) : (
              <Link href="/foodDelivery/Login">
                <a className="nav-link">ログイン</a>
              </Link>
            )}
          </NavItem>
          <NavItem>
            {/* {Object.values(userState).every((value) => value !== null) ? ( */}
            {userState.username && userState.email !== null ? (
              <h5>{userState.username}</h5>
            ) : (
              <Link href="/foodDelivery/Register">
                <a className="nav-link">新規登録</a>
              </Link>
            )}
          </NavItem>
        </Nav>
      </header>
      <Container>{props.children}</Container>
    </>
  );
};

export default FoodDeliveryLayout;
